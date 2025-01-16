import { LAC_XI_ORG_REWARDS_PATH, LAC_XI_ORG_USERS_PATH } from '~/server/constants/lac-xi.const'
import { defineWrappedResponseHandler } from '~/server/utils/handler'

export default defineWrappedResponseHandler(async (event) => {
  const { db, user } = event.context

  const dbUser = await db.doc(`${LAC_XI_ORG_USERS_PATH}/${user.email}`).get()

  if (!dbUser.exists) {
    throw createError({
      statusCode: 403,
      message: 'Forbidden',
    })
  }

  const rewards = await db.collection(LAC_XI_ORG_REWARDS_PATH).get()
  const data = rewards.docs.map((doc) => {
    const data = doc.data()
    return {
      ...data,
      id: doc.id,
    }
  })

  return {
    statusCode: 200,
    success: true,
    data,
  }
})
