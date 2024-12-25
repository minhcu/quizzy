import type { DocumentData, FirestoreError } from 'firebase/firestore'
import { collection, query, where } from 'firebase/firestore'

export const useOrgStore = defineStore('org', () => {
  const orgList = ref<DocumentData[]>([])
  const currentOrg = ref<DocumentData | undefined>()

  function getOrgs() {
    const db = useFirestore()
    const user = useCurrentUser()

    if (orgList.value.length > 0) {
      return {
        data: orgList,
        pending: ref(false),
        error: ref<FirestoreError | undefined>(),
      }
    }

    const collectionRef = query(collection(db, 'organizations'), where('created_by', '==', user.value?.email as string))
    const { data, pending, error } = useCollection(collectionRef, {
      once: true,
    })

    watch(data, (value) => {
      orgList.value = value
      currentOrg.value = value[0]
    }, {
      once: true,
    })

    return {
      data,
      pending,
      error,
    }
  }

  return {
    orgList,
    currentOrg,
    getOrgs,
  }
})
