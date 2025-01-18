<script lang="ts" setup>
import type { ResponseSuccess } from '~/constants/lac-xi.const'
import BoxImage from '~/assets/image/box.webp'
import CardImage from '~/assets/image/card.webp'

withDefaults(defineProps<{
  drawNumber?: number
}>(), {
  drawNumber: 1,
})
const emit = defineEmits(['update:draw'])
useHead({
  link: [
    {
      rel: 'preload',
      as: 'image',
      href: BoxImage,
    },
    {
      rel: 'preload',
      as: 'image',
      href: CardImage,
    },
  ],
})

const lacXiStore = useLacXiStore()

const reward = ref<{
  id: string
  label: string
} | null>(null)
const isDrawing = ref(false)
const pending = ref(false)
const isOpenEnvelop = ref(false)
const canCloseOverlay = ref(false)
let drawData: ResponseSuccess | null = null
async function drawReward() {
  if (isDrawing.value)
    return
  isDrawing.value = true
  pending.value = true

  // TODO: handle draw number to prevent spam
  drawData = await lacXiStore.drawReward()
  reward.value = drawData.data?.selectedReward || null

  setTimeout(() => {
    pending.value = false
  }, 2000)
  setTimeout(() => {
    isOpenEnvelop.value = true
  }, 4000)
  setTimeout(() => {
    canCloseOverlay.value = true
  }, 6000)
}

function updateClose(e: boolean) {
  if (!canCloseOverlay.value)
    return
  isDrawing.value = e
  isOpenEnvelop.value = false
  if (drawData?.data)
    emit('update:draw', drawData)
}
</script>

<template>
  <div class="w-full h-full flex flex-col items-center justify-center pt-5 gap-6">
    <div class="lac-xi-text text-6xl max-w-[250px] md:max-w-full md:text-7xl text-center leading-normal md:leading-normal lac-xi-shadow relative">
      gieo quẻ đầu năm
    </div>
    <div class="relative pl-5 mb-8">
      <img class="max-w-[220px] sm:max-w-[270px] lg:max-w-[310px] 2xl:max-w-[350px]" :src="BoxImage">
      <div class="max-w-[140px] sm:max-w-[200px] xl:max-w-[270px] w-full absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:hover:scale-110 transition-transform mb-10 cursor-pointer" @click="drawReward">
        <img class="m-auto relative" :src="CardImage">
        <span class="absolute inset-0 text-2xl sm:text-4xl xl:text-6xl lg text-center flex items-center justify-center lac-xi-text">
          Gieo quẻ
        </span>
      </div>
    </div>

    <Dialog :open="isDrawing" @update:open="updateClose($event)">
      <DialogContent class="bg-transparent border-none shadow-none select-none data-[state=open]:zoom-in-75" disable-close>
        <DialogTitle class="sr-only">
          Reward Popup
        </DialogTitle>

        <div class="max-h-[90dvh] absolute top-0 left-1/2 lac-xi-bounce transition-opacity duration-500" :class="{ 'opacity-0': !pending }">
          <SvgStick />

          // TODO: number of draw
          // TODO: rate is a little to high
          <span class="text-[#BE1E2D] text-4xl leading-normal text-center absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Quẻ<br>săm<br>số<br>{{ drawNumber }}
          </span>
        </div>

        <div class="envelop relative max-h-[80dvh] -translate-y-[200%] transition-transform" :class="{ 'translate-y-0': !pending, 'open-envelop': isOpenEnvelop }">
          <SvgEnvelopOpen class="m-auto envelop-open relative" />
          <div class="relative">
            <SvgEnvelopBack class="z-[1] m-auto relative" />
            <div class="paper absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[2]">
              <DialogClose class="absolute top-2 right-1 p-0 w-9 h-9 bg-transparent" as-child>
                <Button variant="ghost" class="focus-visible:ring-0 bg-transparent focus-visible:ring-offset-0 focus-visible:ring-offset-transparent focus-visible:outline-none">
                  <Icon name="tabler-x" size="24" />
                </Button>
              </DialogClose>

              <SvgPaper />
              <span class="text-[#BE1E2D] text-4xl leading-normal text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {{ reward?.label ?? 'Có cái nịt' }}
              </span>
            </div>
            <SvgEnvelopFront class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[3]" />
            <SvgEnvelopClose class="absolute z-[3] top-0 left-1/2 -translate-x-1/2 envelop-close" />
            <span class="lac-xi-text text-4xl z-[4] leading-normal text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              Quẻ<br>săm<br>số<br>{{ drawNumber }}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>

<style>
.lac-xi-text {
  background: linear-gradient(90deg, #FBE088 0%, #FFF8C7 32.4%, #FFDA8F 58.4%, #FEF8C6 93.9%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  text-transform: uppercase;
}
.lac-xi-shadow::before {
  content: 'Gieo quẻ đầu năm';
  text-shadow: 7px 7px 4px rgba(165, 7, 7, 1);
  background: none;
  color: transparent;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
.lac-xi-shadow::after {
  background: linear-gradient(90deg, #FBE088 0%, #FFF8C7 32.4%, #FFDA8F 58.4%, #FEF8C6 93.9%);
  content: 'Gieo quẻ đầu năm';
  background-clip: text;
  -webkit-background-clip: text;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}

@keyframes lac-xi-bounce {
  0%, 100% {
    transform: translate(-50%, -3%);
    animation-timing-function: cubic-bezier(0.8,0,1,1);
  }
  50% {
    transform: translate(-50%);
    animation-timing-function: cubic-bezier(0,0,0.2,1);
  }
}
.lac-xi-bounce {
    animation: lac-xi-bounce 1s infinite;
}

.envelop {
  transition-duration: 2s;
}

.envelop-open {
  transform-origin: bottom center;
  transform: rotateX(180deg);
  transition: transform 1.2s linear;
  backface-visibility: hidden;
}
.envelop-close {
  transform-origin: top center;
  transition: transform 1.2s linear;
  backface-visibility: hidden;
}

.open-envelop .envelop-close {
  transform: rotateX(180deg) translateX(-50%);
}
.open-envelop .envelop-open {
  transform: rotateX(0deg);
}
.open-envelop .paper {
  transform: translate(-50%, -130%);
  transition: transform 1.2s linear 1s;
}
.open-envelop {
  transition: transform 1.2s linear 1s;
  transform: translateY(35%);
}
</style>
