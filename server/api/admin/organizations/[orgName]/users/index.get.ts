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
  const collectionRef = db.collection('organizations').doc(orgName).collection('users').where('deleted_at', '==', null)
  const data = (await collectionRef.get()).docs.map(doc => ({
    ...doc.data(),
    id: doc.id,
  }))

  return {
    data,
  }
})
