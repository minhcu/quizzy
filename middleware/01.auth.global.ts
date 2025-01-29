export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === '/' || to.path.startsWith('/admin'))
    return navigateTo('/lac-xi')

  const isAuthenticated = useAuthStore().currentUser || await getCurrentUser()

  if (!isAuthenticated && !to.meta.unauthenticatedOnly) {
    return navigateTo('/login')
  }
  if (isAuthenticated && to.meta.unauthenticatedOnly) {
    return navigateTo('/lac-xi')
  }
})
