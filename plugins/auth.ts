export default defineNuxtPlugin({
  async setup() {
    const authStore = useAuthStore()
    const currentUser = await authStore.getUser()

    if (currentUser.value) {
      try {
        authStore.accessToken = await currentUser.value.getIdToken()
      }
      catch (error: any) {
        notifyError(error.message || error)
      }
    }
  },
})
