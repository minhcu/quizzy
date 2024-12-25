<script lang="ts" setup>
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

definePageMeta({
  layout: 'blank',
  unauthenticatedOnly: true,
})

const auth = useFirebaseAuth()

async function login() {
  try {
    if (!auth)
      throw new Error('Firebase Auth is not initialized')

    auth.languageCode = 'vi'
    const googleAuthProvider = new GoogleAuthProvider()
    await signInWithPopup(auth, googleAuthProvider)

    navigateTo('/')
  }
  catch (error: any) {
    notifyError(error)
  }
}
</script>

<template>
  <Card class="w-full max-w-sm">
    <CardHeader>
      <CardTitle class="text-2xl font-semibold">
        Login
      </CardTitle>

      <CardDescription>
        Please login to continue
      </CardDescription>
    </CardHeader>

    <CardContent>
      <Button class="w-full" @click="login">
        Login with Google
      </Button>
    </CardContent>
  </Card>
</template>

<style lang="scss" scoped></style>
