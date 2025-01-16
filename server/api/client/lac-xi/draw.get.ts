import { defineWrappedResponseHandler } from '~/server/utils/handler'

interface Reward {
  id: string
  probability: number
  quantity: number
  label: string
}

function forceDraw(rewards: Reward[]): Reward {
  const random = Math.random()
  let returnReward: Reward | null = null

  while (!returnReward) {
    let current = 0
    for (const reward of rewards) {
      current += reward.probability
      if (random < current && reward.quantity > 0) {
        returnReward = reward
        break
      }
    }
  }

  return returnReward
}

function normalDraw(rewards: Reward[]): Reward | null {
  const random = Math.random()

  let current = 0
  for (const reward of rewards) {
    current += reward.probability
    if (random < current) {
      return reward
    }
  }

  return null
}

export default defineWrappedResponseHandler(async (event) => {
  const { db, user } = event.context

  const dbUserRef = db.collection('organizations').doc('sgroup-lac-xi').collection('users').doc(user.email)

  const dbUser = (await dbUserRef.get()).data()

  if (!dbUser) {
    throw createError({
      statusCode: 403,
      message: 'Forbidden',
    })
  }

  if (dbUser.reward) {
    db.runTransaction(async (transaction) => {
      transaction.set(dbUserRef, {
        ticket: dbUser.ticket - 1,
      }, { merge: true })
    })

    return {
      statusCode: 200,
    }
  }

  if (dbUser.ticket <= 0) {
    return {
      statusCode: 200,
    }
  }

  const dbRewardsRef = db.collection('organizations').doc('sgroup-lac-xi').collection('rewards')

  const rewards: Reward[] = (await dbRewardsRef.get()).docs.map((doc) => {
    const data = doc.data() as Reward
    return {
      ...data,
      id: doc.id,
    }
  })

  let selectedReward: Reward | null = null

  if (dbUser.ticket >= 2) {
    selectedReward = normalDraw(rewards)
  }
  else {
    selectedReward = forceDraw(rewards)
  }

  if (!selectedReward) {
    // db.runTransaction(async (transaction) => {
    //   transaction.set(dbUserRef, {
    //     tickets: dbUser.ticket - 1,
    //   }, { merge: true })
    // })

    return {
      statusCode: 200,
    }
  }

  // if (selectedReward) {
  //   db.runTransaction(async (transaction) => {
  //     transaction.set(dbUserRef, {
  //       reward: selectedReward.id,
  //       tickets: dbUser.ticket - 1,
  //     }, { merge: true })

  //     transaction.set(db.collection(LAC_XI_ORG_REWARDS_PATH).doc(selectedReward.id), {
  //       quantity: selectedReward.quantity - 1,
  //     }, { merge: true })
  //   })
  // }

  return {
    statusCode: 200,
    data: {
      id: selectedReward.id,
      label: selectedReward.label,
    },
  }
})
