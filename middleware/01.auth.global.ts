export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()
  const isAuthenticated = await authStore.getUser()

  if (!isAuthenticated && !to.meta.unauthenticatedOnly) {
    return navigateTo('/login')
  }
})
