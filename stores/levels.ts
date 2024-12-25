import { addDoc, collection, deleteDoc, doc, orderBy, query, updateDoc } from 'firebase/firestore'
import { useCollection, useFirestore } from 'vuefire'

interface Level {
  id?: string
  title: string
  description?: string
  order: number
}

export const useLevelsStore = defineStore('levels', () => {
  const db = useFirestore()
  const orgStore = useOrgStore()
  const collectionRef = collection(db, `organizations/${orgStore.currentOrg?.id}/levels`)
  const queryRef = ref(query(collectionRef, orderBy('order')))

  function refresh() {
    queryRef.value = query(collection(db, `organizations/${orgStore.currentOrg?.id}/levels`), orderBy('order'))
  }

  function getLevels() {
    return useCollection(queryRef, {
      once: true,
    })
  }

  function getLevel(levelId: string) {
    return useDocument(doc(collectionRef, levelId))
  }

  async function addLevel(level: Level) {
    return await addDoc(collectionRef, level)
  }

  async function deleteLevel(levelId: string) {
    return await deleteDoc(doc(collectionRef, levelId))
  }

  async function updateLevel(level: Partial<Level>) {
    return await updateDoc(doc(collectionRef, level.id as string), { ...level })
  }

  return {
    refresh,
    getLevel,
    getLevels,
    addLevel,
    deleteLevel,
    updateLevel,
  }
})
