interface User {
  id: string
  email: string
}

export const useUsersStore = defineStore('users', () => {
  const orgStore = useOrgStore()

  async function getUsers() {
    const response = await $api<{
      data: User[]
    }>(`/admin/organizations/${orgStore.currentOrg?.id}/users`)

    return response.data
  }

  async function addUsers(emailList: string[]) {
    await $api(`/admin/organizations/${orgStore.currentOrg?.id}/users`, {
      method: 'POST',
      body: {
        emailList,
      },
    })
  }

  async function removeUsers(emailList: string[]) {
    await $api(`/admin/organizations/${orgStore.currentOrg?.id}/users`, {
      method: 'DELETE',
      body: {
        emailList,
      },
    })
  }

  return {
    getUsers,
    addUsers,
    removeUsers,
  }
})
