<script lang="ts" setup>
import { getAuth, signOut } from 'firebase/auth'

const auth = getAuth()
async function logout() {
  try {
    await signOut(auth)
    console.log(useCurrentUser())
  }
  catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div>
    <h1>Home Page</h1>
    <Button @click="logout">
      Logout
    </Button>
  </div>
</template>

<style lang="scss" scoped>

</style>
