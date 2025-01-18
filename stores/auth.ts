import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const currentUser = useCurrentUser()

  const accessToken = useState<string | null>('accessToken', () => null)

  const auth = getAuth()

  auth.onIdTokenChanged(async (user) => {
    accessToken.value = user ? await user.getIdToken() : null
  })

  async function getUser() {
    if (currentUser.value)
      return currentUser

    currentUser.value = await getCurrentUser()
    return currentUser
  }

  async function login() {
    try {
      if (!auth)
        throw new Error('Firebase Auth is not initialized')

      auth.languageCode = 'vi'
      const googleProvider = new GoogleAuthProvider()
      const { user } = await signInWithPopup(auth, googleProvider)

      accessToken.value = await user.getIdToken(true)
    }
    catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request' || error.code === 'auth/popup-blocked')
        return
      notifyError(error.message || error)
    }
  }

  async function logout() {
    try {
      await signOut(auth)
      accessToken.value = null
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
