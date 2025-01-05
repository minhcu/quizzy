import { defineWrappedResponseHandler } from '~/server/utils/handler'

export default defineWrappedResponseHandler(async (event) => {
  const orgName = getRouterParam(event, 'orgName')
  if (!orgName) {
    throw createError({
      statusCode: 400,
      message: 'Invalid parameters',
    })
  }

  const { db } = event.context
  const collectionRef = db.collection(`organizations/${orgName}/levels`)
  const data = (await collectionRef.get()).docs.map(doc => ({
    ...doc.data(),
    id: doc.id,
  }))

  return {
    statusCode: 200,
    data,
  }
})
