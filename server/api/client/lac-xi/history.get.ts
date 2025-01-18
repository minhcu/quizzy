import { defineWrappedResponseHandler } from '~/server/utils/handler'

export default defineWrappedResponseHandler(async (event) => {
  const { db, user } = event.context

  const userRef = db.collection('organizations').doc('sgroup-lac-xi').collection('users').doc(user.email)
  const userHistoryRef = db.collection('organizations').doc('sgroup-lac-xi').collection('users').doc(user.email).collection('history')
  const userData = (await userRef.get()).data()

  if (!userData) {
    throw createError({
      statusCode: 403,
      message: 'User not found',
    })
  }
  const historyData = (await userHistoryRef.orderBy('timestamp', 'desc').get()).docs.map(doc => doc.data())

  return {
    statusCode: 200,
    data: {
      user: userData,
      history: historyData,
    },
  }
})
