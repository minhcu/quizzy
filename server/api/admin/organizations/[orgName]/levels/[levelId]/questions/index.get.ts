import { defineWrappedResponseHandler } from '~/server/utils/handler'

export default defineWrappedResponseHandler(async (event) => {
  const orgName = getRouterParam(event, 'orgName')
  const levelId = getRouterParam(event, 'levelId')
  if (!orgName || !levelId) {
    throw createError({
      statusCode: 400,
      message: 'Invalid parameters',
    })
  }

  const { db } = event.context
  const questionsRef = db.collection(`organizations/${orgName}/levels/${levelId}/questions`)
  const data = (await questionsRef.get()).docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }))

  return {
    statusCode: 200,
    data,
  }
})
