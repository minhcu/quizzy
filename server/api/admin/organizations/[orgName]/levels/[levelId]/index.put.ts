import { defineWrappedResponseHandler } from '~/server/utils/handler'

export default defineWrappedResponseHandler(async (event) => {
  const orgName = getRouterParam(event, 'orgName')
  const levelId = getRouterParam(event, 'levelId')
  const { level } = await readBody(event)
  if (!orgName || !levelId || !level) {
    throw createError({
      statusCode: 400,
      message: 'Invalid parameters',
    })
  }

  const { db } = event.context
  const levelRef = db.collection('organizations').doc(orgName).collection('levels').doc(levelId)
  await levelRef.update(level)

  return {
    statusCode: 200,
    message: 'Level updated',
  }
})
