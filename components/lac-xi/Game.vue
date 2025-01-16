<script lang="ts" setup>
const lacXiStore = useLacXiStore()

const open = ref(false)
const pending = ref(false)
const reward = ref<{
  id: string
  label: string
} | null>(null)
const isDrawing = ref(false)

async function drawReward() {
  try {
    if (isDrawing.value)
      return
    pending.value = true
    isDrawing.value = true
    const { data } = await lacXiStore.drawReward()
    reward.value = data || null
    open.value = true
    isDrawing.value = false
  }
  catch {
    notifyError('Something went wrong')
  }
}

function updateClose(e: boolean) {
  open.value = e
  pending.value = e
}
</script>

<template>
  <div class="w-full h-full flex flex-col items-center justify-center">
    <div class="cursor-pointer relative group md:hover:scale-110" :class="{ 'animate-pulse': pending }" @click="drawReward">
      <img class="md:animate-none animate-bounce" :class="{ 'animate-none': pending }" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhYFO4e8G_qGIN9lzrx1nbKpW2S8p4Xs6A0l8slIQ-cP9D2bzEjcGEEzcrUhvU7WbfPVtGBJQe_AvJWYsOWqPHMFcZkRZByzvILzMVzYJl78Bem2Y9aQ7oDv1FOFyi42F1m0Dsx4M2tNA3ezrdfr63MDQIEf_W8jkmIHnHgehXs5bqB8eeBex9YURu0HCc/s16000-rw/(anhpng.com)-%20ti%E1%BB%81n%20v%C3%A0ng%20v%C3%A0%20t%C3%BAi%20th%E1%BA%A7n%20t%C3%A0i%20(10).PNG">
      <img class="absolute inset-0 md:animate-ping hidden md:block group-hover:animate-none" :class="{ '!animate-none': pending }" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhYFO4e8G_qGIN9lzrx1nbKpW2S8p4Xs6A0l8slIQ-cP9D2bzEjcGEEzcrUhvU7WbfPVtGBJQe_AvJWYsOWqPHMFcZkRZByzvILzMVzYJl78Bem2Y9aQ7oDv1FOFyi42F1m0Dsx4M2tNA3ezrdfr63MDQIEf_W8jkmIHnHgehXs5bqB8eeBex9YURu0HCc/s16000-rw/(anhpng.com)-%20ti%E1%BB%81n%20v%C3%A0ng%20v%C3%A0%20t%C3%BAi%20th%E1%BA%A7n%20t%C3%A0i%20(10).PNG">
    </div>
    <div class="md:hidden text-white text-xl uppercase">
      NHẤN ĐỂ NHẬN LÌ XÌ
    </div>

    <Dialog :open="open" @update:open="updateClose($event)">
      <DialogContent class="max-w-80 md:max-w-lg">
        {{ reward?.label ?? 'Chúc may mắn lần sau' }}
      </DialogContent>
    </Dialog>
  </div>
</template>
