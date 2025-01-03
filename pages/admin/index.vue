<script lang="ts" setup>
const authStore = useAuthStore()
</script>

<template>
  <div>
    <div>
      {{ authStore.currentUser?.email }}
    </div>
    <div>
      <Button @click="authStore.logout">
        LogOut
      </Button>

      <Button @click="authStore.login">
        LogIn
      </Button>
    </div>
  </div>
</template>
