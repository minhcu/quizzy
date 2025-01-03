import { defineWrappedResponseHandler } from '~/server/utils/handler'

export default defineWrappedResponseHandler(async (event) => {
  const { db } = event.context
  const collectionRef = db.collection('organizations').where('created_by', '==', event.context.user.email)
  const data = (await collectionRef.get()).docs.map(doc => ({
    ...doc.data(),
    id: doc.id,
  }))

  return {
    statusCode: 200,
    data,
  }
})
