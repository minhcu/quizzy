<script lang="ts" setup>
definePageMeta({
  layout: 'blank',
  unauthenticatedOnly: true,
})

const authStore = useAuthStore()

async function login() {
  const router = useRouter()
  await authStore.login(
    () => {
      router.push('/admin')
    },
  )
}
</script>

<template>
  <Card class="w-full max-w-sm">
    <CardHeader>
      <CardTitle class="text-2xl font-semibold">
        Login
      </CardTitle>

      <CardDescription>
        Please login to continue
      </CardDescription>
    </CardHeader>

    <CardContent>
      <Button class="w-full" @click="login">
        Login with Google
      </Button>
    </CardContent>
  </Card>
</template>

<style lang="scss" scoped></style>
