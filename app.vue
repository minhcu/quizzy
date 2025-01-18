<script setup>
import font from '~/assets/font/SVN-Rebahan.otf'

useHead({
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.png',
    },
    {
      rel: 'preload',
      type: 'font/otf',
      href: font,
      as: 'font',
      crossorigin: '',
    },
  ],
})
const route = useRoute()
const isAdmin = computed(() => route.path.startsWith('/admin'))
</script>

<template>
  <Toaster />
  <NuxtLoadingIndicator />
  <NuxtLayout :name="isAdmin ? 'admin' : 'default'">
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.page-fade-enter-active, .page-fade-leave-active {
  transition: transform 0.4s ease, opacity 0.4s ease;
}
.page-fade-enter-from {
  opacity: 0;
  transform: scale(1.2);
}
.page-fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
