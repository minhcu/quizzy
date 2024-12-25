import { arrayUnion, collection, deleteDoc, doc, query, where, writeBatch } from 'firebase/firestore'
import { useCollection, useFirestore } from 'vuefire'

export const useUsersStore = defineStore('users', () => {
  const db = useFirestore()
  const collectionRef = collection(db, 'users')
  const queryRef = ref(query(collectionRef))
  // TODO: WHY AND HOW DOES THIS WORK?
  function refresh(orgId: string) {
    queryRef.value = query(collectionRef, where('orgs_ref', 'array-contains', orgId))
  }

  function getUsers(orgId: string) {
    queryRef.value = query(collectionRef, where('orgs_ref', 'array-contains', orgId))
    return useCollection(queryRef, {
      once: true,
    })
  }

  async function addUsers(emailList: string[], orgId: string) {
    const batch = writeBatch(db)

    emailList.forEach((email) => {
      const userRef = doc(db, 'users', email)
      batch.set(userRef, {
        email,
        orgs_ref: arrayUnion(orgId),
      }, {
        merge: true,
      })
    })

    return await batch.commit()
  }

  async function removeUsers(emailList: string[]) {
    const batch = writeBatch(db)

    emailList.forEach((email) => {
      const userRef = doc(db, 'users', email)
      batch.delete(userRef)
    })

    return await batch.commit()
  }

  async function removeUser(id: string) {
    const userRef = doc(db, 'users', id)
    return await deleteDoc(userRef)
  }

  return {
    refresh,
    getUsers,
    addUsers,
    removeUser,
    removeUsers,
  }
})
