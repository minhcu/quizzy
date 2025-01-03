import { FieldValue } from 'firebase-admin/firestore'
import { defineWrappedResponseHandler } from '~/server/utils/handler'

export default defineWrappedResponseHandler(async (event) => {
  const { db } = event.context
  const orgName = getRouterParam(event, 'orgName')
  const { emailList } = await readBody<{ emailList: string[] }>(event)
  if (!orgName) {
    throw createError({
      statusCode: 400,
      message: 'Invalid parameters',
    })
  }

  const userCollectionRef = db.collection('users')
  const orgUserCollectionRef = db.collection(`organizations/${orgName}/users`)

  const batch = db.batch()

  emailList.forEach((email) => {
    const userRef = userCollectionRef.doc(email)
    const userOrgRef = orgUserCollectionRef.doc(email)

    batch.set(userRef, {
      email,
      orgs_ref: FieldValue.arrayUnion(orgName),
    }, { merge: true })

    batch.set(userOrgRef, {
      email,
      deleted_at: null,
    }, { merge: true })
  })

  await batch.commit()

  return {
    statusCode: 200,
    message: 'Users added',
  }
})
