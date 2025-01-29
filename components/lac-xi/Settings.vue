<script lang="ts" setup>
const emit = defineEmits(['music:toggle', 'auth:logout'])

const authStore = useAuthStore()

async function logout() {
  await authStore.logout()
  emit('auth:logout')
  return navigateTo('/login')
}
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button class="h-full w-full" variant="ghost">
        <Icon
          name="tabler-settings"
          class="min-w-[32px]"
          mode="css"
          size="32"
        />
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogTitle>
        Cài đặt
      </DialogTitle>
      <div class="flex flex-col space-y-4">
        <Button @click="$emit('music:toggle')">
          Tắt/Bật nhạc
        </Button>
        <Separator />
        <Button @click="logout">
          Đăng xuất
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
