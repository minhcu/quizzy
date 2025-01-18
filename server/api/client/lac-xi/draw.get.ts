import { defineWrappedResponseHandler } from '~/server/utils/handler'

interface Reward {
  id: string
  probability: number
  quantity: number
  label: string
}

function gacha(rewards: Reward[]): Reward | null {
  const random = Math.random()
  let cumulativeProbability = 0
  for (const reward of rewards) {
    cumulativeProbability += reward.probability
    if (random < cumulativeProbability) {
      return reward
    }
  }
  return null
}

export default defineWrappedResponseHandler(async (event) => {
  const { db, user } = event.context

  const dbUserRef = db.collection('organizations').doc('sgroup-lac-xi').collection('users').doc(user.email)
  const dbRewardsRef = db.collection('organizations').doc('sgroup-lac-xi').collection('rewards')
  const dbUserHistoryRef = db.collection('organizations').doc('sgroup-lac-xi').collection('users').doc(user.email).collection('history')

  const response = await db.runTransaction(async (transaction) => {
    const dbUser = (await transaction.get(dbUserRef)).data()
    if (!dbUser) {
      throw createError({
        statusCode: 403,
        message: 'User not found',
      })
    }

    if (dbUser.ticket <= 0) {
      return {
        statusCode: 200,
      }
    }

    const history = (await transaction.get(dbUserHistoryRef.orderBy('timestamp', 'desc'))).docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      }
    })

    const newHistory = {
      timestamp: new Date(),
    }

    if (dbUser.reward) {
      transaction.update(dbUserRef, {
        ticket: dbUser.ticket - 1,
      })

      transaction.set(dbUserHistoryRef.doc(), newHistory)

      return {
        statusCode: 200,
        data: {
          user: {
            ...dbUser,
            ticket: dbUser.ticket - 1,
          },
          history: [newHistory, ...history],
        },
      }
    }

    const rewards: Reward[] = (await dbRewardsRef.where('quantity', '>', 0).get()).docs.map((doc) => {
      const data = doc.data() as Reward
      return {
        ...data,
        id: doc.id,
      }
    })

    if (rewards.length === 0) {
      return {
        statusCode: 200,
      }
    }

    let selectedReward: Reward | null = null
    if (dbUser.ticket > 1) {
      selectedReward = gacha(rewards)
    }
    else {
      let count = 0
      while (!selectedReward || count < 10) {
        count++
        selectedReward = gacha(rewards)
      }
      if (!selectedReward) {
        selectedReward = rewards[rewards.length - 1]
      }
    }

    if (selectedReward) {
      transaction.update(dbRewardsRef.doc(selectedReward.id), {
        quantity: selectedReward.quantity - 1,
      })

      transaction.update(dbUserRef, {
        reward: selectedReward.id,
        ticket: dbUser.ticket - 1,
      })

      newHistory.reward = {
        id: selectedReward.id,
        label: selectedReward.label,
      }

      transaction.set(dbUserHistoryRef.doc(), {
        ...newHistory,
        reward: {
          id: selectedReward.id,
          label: selectedReward.label,
        },
      })
    }
    else {
      transaction.update(dbUserRef, {
        ticket: dbUser.ticket - 1,
      })

      transaction.set(dbUserHistoryRef.doc(), newHistory)
    }

    return {
      statusCode: 200,
      data: {
        selectedReward,
        user: {
          ...dbUser,
          reward: selectedReward ? selectedReward.id : undefined,
          ticket: dbUser.ticket - 1,
        },
        history: [newHistory, ...history],
      },
    }
  })

  return response
})
