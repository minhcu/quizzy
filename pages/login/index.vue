<script lang="ts" setup>
definePageMeta({
  unauthenticatedOnly: true,
})

const isLoading = ref(false)

const authStore = useAuthStore()

function isInWebView() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera
  return (
    /FBAN|FBAV|Instagram|Messenger/i.test(userAgent) // Facebook, IG, Messenger
    || /WebView/i.test(userAgent) // Generic WebView
    || /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(userAgent) // iOS WebView
  )
}

async function login() {
  if (isInWebView()) {
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.location.href = `x-safari-${window.location.href}`
    }
    else {
      window.location.href = `intent://${window.location.href.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end;`
    }
    return
  }
  try {
    isLoading.value = true
    await authStore.login()
    return navigateTo('/lac-xi')
  }
  catch {
    isLoading.value = false
  }
}
</script>

<template>
  <Card class="w-full max-w-sm">
    <CardHeader>
      <CardTitle class="text-2xl lg:text-3xl font-semibold">
        Đăng nhập
      </CardTitle>

      <CardDescription v-if="isInWebView()" class="lg:text-lg">
        <div>Ứng dụng hiện không hỗ trợ đăng nhập trên WebView.</div>
        <div>Vui lòng mở trình duyệt để tiếp tục.</div>
      </CardDescription>

      <CardDescription v-else class="lg:text-lg">
        Vui lòng đăng nhập để tiếp tục
      </CardDescription>
    </CardHeader>

    <CardContent>
      <Button class="w-full lg:text-xl" :disabled="isLoading" @click="login">
        <Icon
          v-if="isLoading"
          name="tabler-loader-2"
          class="animate-spin"
          size="20"
        />
        {{ isInWebView() ? 'Mở trình duyệt' : 'Đăng nhập bằng Google' }}
      </Button>
    </CardContent>
  </Card>
</template>
