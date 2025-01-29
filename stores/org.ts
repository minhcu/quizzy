interface Organization {
  id: string
  title: string
  created_by: string
  members: string[]
}

export const useOrgStore = defineStore('org', () => {
  const orgList = ref<Organization[]>([])
  const currentOrg = ref<Organization | undefined>()

  async function fetchOrgs() {
    const response = await $api<{
      data: Organization[]
    }>('/admin/organizations')
    orgList.value = response.data

    if (!currentOrg.value) {
      currentOrg.value = orgList.value[1]
    }

    return orgList.value
  }

  return {
    orgList,
    currentOrg,
    fetchOrgs,
  }
})
