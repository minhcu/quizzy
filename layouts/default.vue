<script lang="ts" setup>
import BackgroundImage from '~/assets/image/background.webp'
import CloudImage from '~/assets/image/cloud.webp'

useHead({
  link: [
    {
      rel: 'preload',
      as: 'image',
      href: BackgroundImage,
    },
    {
      rel: 'preload',
      as: 'image',
      href: CloudImage,
    },
  ],
})
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-cover bg-center" :style="{ backgroundImage: `url(${BackgroundImage})` }">
    <slot />
  </div>
</template>
