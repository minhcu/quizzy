<script lang="ts" setup>
const lacXiStore = useLacXiStore()

const { data: rankingData, status, error, refresh } = useLazyAsyncData(lacXiStore.fetchRanking)
watchError(error)

const ranking = computed(() => rankingData.value?.data.users.map((user: any) => {
  const reward = rankingData.value?.data.rewards.find((reward: any) => reward.id === user.reward)
  return {
    email: user.email,
    reward: reward?.label,
  }
}))
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button class="h-full w-full" variant="ghost">
        <Icon
          name="tabler-chart-bar-popular"
          class="min-w-[32px]"
          mode="css"
          size="32"
        />
      </Button>
    </DialogTrigger>

    <DialogScrollContent>
      <DialogHeader class="sr-only">
        Reward Popup
      </DialogHeader>
      <Table>
        <TableCaption>Trao niềm tin, nhận tài lộc</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Quà</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow v-if="status === 'pending'">
            <TableCell colspan="3" class="text-center">
              Không có dữ liệu.
            </TableCell>
          </TableRow>
          <template v-else>
            <TableRow v-for="(user, index) in ranking" :key="user.email">
              <TableCell>{{ index + 1 }}</TableCell>
              <TableCell>{{ user.email }}</TableCell>
              <TableCell>{{ user.reward }}</TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>

      <Button class="fixed bottom-5 right-5" variant="secondary" @click="refresh">
        <Icon
          name="tabler-reload"
          class="min-w-[32px]"
          :class="{ 'animate-spin': status === 'pending' }"
          mode="css"
          size="24"
        />
        Làm mới
      </Button>
    </DialogScrollContent>
  </Dialog>
</template>
