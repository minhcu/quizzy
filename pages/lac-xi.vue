<script lang="ts" setup>
useHead({
  title: 'Lac Xi',
  meta: [
    {
      name: 'description',
      content: 'Lac Xi game',
    },
  ],
  link: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
  ],
})
</script>

<template>
  <div class="h-screen w-full snake-background flex items-center justify-center relative">
    <div class="w-full flex flex-col h-screen before:absolute before:inset-0 before:bg-gradient-to-b before:bg-black/30">
      <div class="flex-1 relative">
        <LacXiGame />
      </div>
      <div class="bg-white/80 flex items-center justify-around h-16 relative">
        <Button class="h-full w-full" variant="ghost">
          <Icon
            name="tabler-home-filled"
            class="min-w-[32px]"
            mode="css"
            size="32"
          />
        </Button>

        <Button class="h-full w-full" variant="ghost">
          <Icon
            name="tabler-trophy-filled"
            class="min-w-[32px]"
            mode="css"
            size="32"
          />
        </Button>

        <Button class="h-full w-full" variant="ghost">
          <Icon
            name="tabler-timeline"
            class="min-w-[32px]"
            mode="css"
            size="32"
          />
        </Button>

        <Button class="h-full w-full" variant="ghost">
          <Icon
            name="tabler-settings"
            class="min-w-[32px]"
            mode="css"
            size="32"
          />
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.snake-background {
  background-image: url('https://assets.architecturaldigest.in/photos/676e8a267bdaa86303d2782c/16:9/w_2240,c_limit/Untitled%20design%20-%202024-12-27T163559.868.png');
  background-size: cover;
  background-position: center left;
}
</style>
