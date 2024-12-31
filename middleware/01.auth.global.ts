export default defineNuxtRouteMiddleware(async (to) => {
  const isAuthenticated = await useAuthStore().getUser()

  if (!isAuthenticated && !to.meta.unauthenticatedOnly) {
    return navigateTo('/login')
  }
})
