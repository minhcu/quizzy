import { getAuth, signOut } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  async function getUser() {
    return await getCurrentUser()
  }

  async function logout() {
    const auth = getAuth()
    const router = useRouter()
    try {
      await signOut(auth)
      router.push('/login')
    }
    catch (error: any) {
      notifyError(error.message || error)
    }
  }

  return {
    getUser,
    logout,
  }
})
