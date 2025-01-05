import { addDoc, collection, deleteDoc, doc, or, orderBy, query, updateDoc } from 'firebase/firestore'

interface Level {
  id?: string
  title: string
  description?: string
  order: number
  tickets?: number
}

export const useLevelsStore = defineStore('levels', () => {
  const orgStore = useOrgStore()

  async function getLevels() {
    const response = await $api<{
      data: Level[]
    }>(`/admin/organizations/${orgStore.currentOrg?.id}/levels`)

    return response.data
  }

  async function getLevel(levelId: string) {
    const response = await $api<{
      data: Level
    }>(`/admin/organizations/${orgStore.currentOrg?.id}/levels/${levelId}`)

    return response.data
  }

  async function addLevel(level: Level) {
    await $api(`/admin/organizations/${orgStore.currentOrg?.id}/levels`, {
      method: 'POST',
      body: {
        level,
      },
    })
  }

  async function deleteLevel(levelId: string) {
    await $api(`/admin/organizations/${orgStore.currentOrg?.id}/levels/${levelId}`, {
      method: 'DELETE',
    })
  }

  async function updateLevel(level: Partial<Level>) {
    await $api(`/admin/organizations/${orgStore.currentOrg?.id}/levels/${level.id}`, {
      method: 'PUT',
      body: {
        level: {
          order: level.order,
        },
      },
    })
  }

  return {
    getLevel,
    getLevels,
    addLevel,
    deleteLevel,
    updateLevel,
  }
})
