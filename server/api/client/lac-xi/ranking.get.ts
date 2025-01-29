import { defineWrappedResponseHandler } from '~/server/utils/handler'

export default defineWrappedResponseHandler(async (event) => {
  const { db } = event.context

  const usersRef = db.collection('organizations').doc('sgroup-lac-xi').collection('users').orderBy('reward', 'asc')
  const rewardsRef = db.collection('organizations').doc('sgroup-lac-xi').collection('rewards')
  const rewardData = (await rewardsRef.get()).docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      label: data.label,
    }
  })
  const userData = (await usersRef.get()).docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    }
  })

  return {
    statusCode: 200,
    data: {
      users: userData,
      rewards: rewardData,
    },
  }
})
