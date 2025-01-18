<script lang="ts" setup>
withDefaults(defineProps<{
  error: Error | null
}>(), {
  error: null,
})

const authStore = useAuthStore()
async function logout() {
  await authStore.logout()
  navigateTo('/login')
}
</script>

<template>
  <Card class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <CardHeader>
      <CardTitle>
        Oops! Không ổn rồi
      </CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription v-if="(error as any)?.statusCode === 403" class="text-base">
        Email của bạn chưa được xác thực.
        <br>
        Vui lòng liên hệ với Ban Nội Bộ để được hỗ trợ.
      </CardDescription>
      <CardDescription v-else class="text-base">
        Đã xảy ra lỗi không mong muốn.
        <br>
        Vui lòng thử lại sau.
      </CardDescription>

      <div class="mt-4">
        <Button class="w-full" @click="logout">
          Đăng xuất
        </Button>
      </div>
    </CardContent>
  </Card>
</template>
