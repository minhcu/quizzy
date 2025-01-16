export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === '/')
    return

  const isAuthenticated = await useAuthStore().getUser()

  if (isAuthenticated.value && to.meta.unauthenticatedOnly) {
    return navigateTo('/lac-xi')
  }
  else if (!isAuthenticated.value && !to.meta.unauthenticatedOnly) {
    return navigateTo('/login')
  }
})
