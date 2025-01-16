export const $api = $fetch.create({
  async onRequest({ options }) {
    const authStore = useAuthStore()

    options.baseURL = String(useRuntimeConfig().public.apiBaseUrl || '/api')

    options.headers = new Headers({
      ...Object.fromEntries(options.headers as Headers),
      Authorization: `Bearer ${authStore.accessToken}`,
    })
  },
  async onResponseError(error) {
    switch (error.response.status) {
      case 401:
        try {
          await useAuthStore().logout()
          navigateTo('/login')
        }
        catch {
          notifyError('An error occurred. Please try again later.')
        }
        break
      default:
        notifyError('An error occurred. Please try again later.')
        break
    }
  },
})
