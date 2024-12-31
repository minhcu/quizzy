<script lang="ts" setup>
withDefaults(defineProps<{
  icon: string
}>(), {
  icon: '',
})

const attrs = useAttrs()
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <Icon :name="icon" v-bind="attrs" />
      </TooltipTrigger>
      <TooltipContent>
        <slot />
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
