import { defineWrappedResponseHandler } from '~/server/utils/handler'

export default defineWrappedResponseHandler(async (event) => {
  const orgName = getRouterParam(event, 'orgName')
  if (!orgName) {
    throw createError({
      statusCode: 400,
      message: 'Invalid parameters',
    })
  }

  const levelId = getRouterParam(event, 'levelId')
  if (!levelId) {
    throw createError({
      statusCode: 400,
      message: 'Invalid parameters',
    })
  }

  const { db } = event.context
  const docRef = db.doc(`organizations/${orgName}/levels/${levelId}`)
  await docRef.delete()

  return {
    statusCode: 200,
    message: 'Level deleted',
  }
})
