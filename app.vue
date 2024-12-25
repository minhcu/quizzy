<script setup>
const route = useRoute()
const isAdmin = computed(() => route.path.startsWith('/admin'))
</script>

<template>
  <Toaster />
  <NuxtLoadingIndicator />
  <NuxtLayout :name="isAdmin ? 'admin' : null">
    <NuxtPage />
  </NuxtLayout>
</template>
