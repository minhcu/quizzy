<script lang="ts" setup>
import type { ResponseSuccess } from '~/constants/lac-xi.const'
import CloudImage from '~/assets/image/cloud.webp'

const pending = ref(true)
const audioLoaded = ref(false)
const audio = new Audio()

onMounted(() => {
  audio.src = 'https://firebasestorage.googleapis.com/v0/b/journey-through-sgroup.firebasestorage.app/o/background-music.mp3?alt=media'
  audio.load()
  audio.addEventListener('loadeddata', () => {
    audioLoaded.value = true

    setTimeout(() => {
      pending.value = false
    }, 4500)
  })
  audio.addEventListener('error', () => {
    audioLoaded.value = true

    setTimeout(() => {
      pending.value = false
    }, 4500)
  })
})

const lacXiStore = useLacXiStore()
const { data, status, error } = useLazyAsyncData('history', lacXiStore.fetchHistory)
watchError(error)

function handleDraw(drawData: ResponseSuccess) {
  data.value = drawData
}

const audioPlaying = ref(false)
function handleAudio() {
  if (!audioLoaded.value)
    return

  if (audioPlaying.value) {
    audio.pause()
  }
  else {
    audio.play()
  }
  audioPlaying.value = !audioPlaying.value
}
</script>

<template>
  <div class="min-h-screen w-full flex items-center justify-between flex-col relative overflow-hidden">
    <LacXiError v-if="error" :error="error" />
    <template v-else>
      <Transition name="fade">
        <div
          v-if="pending"
          class="fixed z-[1003] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-5xl lg:text-7xl leading-normal"
          :class="{ 'animate-pulse': !audioLoaded }"
          @click="handleAudio"
        >
          <Transition name="fade" mode="out-in">
            <div v-if="!audioLoaded" class="flex justify-center items-center">
              <span class="relative w-12 h-12 lg:w-24 lg:h-24 flex items-center justify-center cursor-pointer">
                <Icon name="tabler-loader-2" class="animate-spin lg:w-24 lg:h-24" size="48" />
              </span>
              <span class="ml-2 uppercase">ĐANG TẢI...</span>
            </div>
            <div v-else class="flex justify-center items-center">
              <span class="relative w-12 h-12 lg:w-24 lg:h-24 flex items-center justify-center cursor-pointer">
                <Icon name="tabler-circle" class="lg:w-24 lg:h-24" size="48" />
                <span
                  class="group overflow-hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 lg:w-20 lg:h-20 rounded-full"
                  :class="{ 'audio-playing': audioPlaying }"
                >
                  <Icon
                    name="tabler-player-play-filled"
                    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden lg:block group-[.audio-playing]:translate-x-[110%] duration-1000"
                    size="48"
                  />
                  <Icon
                    name="tabler-player-pause-filled"
                    class="absolute top-1/2 left-1/2 transform -translate-x-[160%] -translate-y-1/2 hidden lg:block group-[.audio-playing]:-translate-x-1/2 duration-1000"
                    size="48"
                  />
                  <Icon
                    name="tabler-player-play-filled"
                    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:hidden group-[.audio-playing]:translate-x-[110%] duration-1000"
                    size="24"
                  />
                  <Icon
                    name="tabler-player-pause-filled"
                    class="absolute top-1/2 left-1/2 -translate-x-[160%] -translate-y-1/2 lg:hidden group-[.audio-playing]:-translate-x-1/2 duration-1000"
                    size="24"
                  />
                </span>
              </span>
              <span class="ml-2 uppercase">click để mở nhạc</span>
            </div>
          </Transition>
        </div>
      </Transition>
      <div
        class="absolute z-[200] -bottom-[10%] -translate-x-[10%] lac-xi-animation"
        :class="{ '-translate-x-full': !pending && status !== 'pending' }"
      >
        <img
          class="h-[135dvh] lg:h-[145dvh] max-w-none"
          :src="CloudImage"
          alt="cloud"
          loading="eager"
        >
      </div>
      <div
        class="absolute z-[199] -bottom-[10%] translate-x-[10%] lac-xi-animation"
        :class="{ 'translate-x-full': !pending && status !== 'pending' }"
      >
        <img
          class="h-[140dvh] lg:h-[145dvh] max-w-none"
          :src="CloudImage"
          alt="cloud"
          loading="eager"
        >
      </div>
      <div class="w-full flex flex-1 relative z-50 pb-15">
        <div class="flex-1 relative">
          <LacXiGame :draw-number="data?.data.user.ticket" @update:draw="handleDraw" />
        </div>
      </div>
      <div class="bg-white/80 flex items-center justify-around h-16 relative w-full text-xl z-40">
        <div class="absolute left-0 bottom-full">
          <SvgCloudLeft />
        </div>
        <div class="absolute right-0 bottom-full">
          <SvgCloudRight />
        </div>
        <LacXiRewardInfo />
        <LacXiHistory :history="data?.data.history ?? null" :pending="status === 'pending'" />
        <LacXiSettings @music:toggle="handleAudio" />
      </div>
    </template>
  </div>
</template>

<style>
.lac-xi-animation {
  transition: all 5s ease-out;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
