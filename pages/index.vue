<script lang="ts" setup>
const authStore = useAuthStore()
async function logout() {
  try {
    await authStore.logout()
    navigateTo('/login')
  }
  catch (error) {
    console.error(error)
  }
}

async function login() {
  try {
    if (authStore.accessToken) {
      navigateTo('/lac-xi')
      return
    }
    await authStore.login()
    navigateTo('/lac-xi')
  }
  catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div>
    <h1>Home Page</h1>
    <Button @click="login" />
    <Button @click="logout">
      Logout
    </Button>
  </div>
</template>

<style lang="scss" scoped>

</style>
