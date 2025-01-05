import { defineWrappedResponseHandler } from '~/server/utils/handler'

export default defineWrappedResponseHandler(async (event) => {
  const orgName = getRouterParam(event, 'orgName')
  const { level } = await readBody(event)
  if (!orgName || !level) {
    throw createError({
      statusCode: 400,
      message: 'Invalid parameters',
    })
  }

  const { db } = event.context
  const collectionRef = db.collection(`organizations/${orgName}/levels`)
  await collectionRef.add(level)

  return {
    statusCode: 200,
  }
})
