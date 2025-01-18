<script lang="ts" setup>
definePageMeta({
  unauthenticatedOnly: true,
})

const authStore = useAuthStore()

async function login() {
  await authStore.login()
  return navigateTo('/lac-xi')
}
</script>

<template>
  <Card class="w-full max-w-sm">
    <CardHeader>
      <CardTitle class="text-2xl lg:text-3xl font-semibold">
        Đăng nhập
      </CardTitle>

      <CardDescription class="lg:text-lg">
        Vui lòng đăng nhập để tiếp tục
      </CardDescription>
    </CardHeader>

    <CardContent>
      <Button class="w-full lg:text-xl" @click="login">
        Đăng nhập bằng Google
      </Button>
    </CardContent>
  </Card>
</template>

<style lang="scss" scoped></style>
