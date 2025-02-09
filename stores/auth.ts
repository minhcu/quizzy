import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const currentUser = useCurrentUser()

  const accessToken = useState<string | null>('accessToken', () => null)

  async function getUser() {
    if (currentUser.value)
      return currentUser

    currentUser.value = await getCurrentUser()
    return currentUser
  }

  async function login(callback: () => void) {
    const auth = getAuth()
    try {
      if (!auth)
        throw new Error('Firebase Auth is not initialized')

      auth.languageCode = 'vi'
      const googleProvider = new GoogleAuthProvider()
      const { user } = await signInWithPopup(auth, googleProvider)

      accessToken.value = await user.getIdToken()

      callback && callback()
    }
    catch (error: any) {
      notifyError(error.message || error)
    }
  }

  async function logout(callback: () => void) {
    const auth = getAuth()
    try {
      await signOut(auth)
      callback && callback()
    }
    catch (error: any) {
      notifyError(error.message || error)
    }
  }

  return {
    currentUser,
    accessToken,
    getUser,
    login,
    logout,
  }
})
