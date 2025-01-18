<script lang="ts" setup>
import type { History } from '~/constants/lac-xi.const'

const props = withDefaults(defineProps<{
  history: History[] | null
  pending: boolean
}>(), {
  pending: true,
})

function getDate(date: Date | number) {
  const formattedDate = new Intl.DateTimeFormat('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hourCycle: 'h23', // Ensures 24-hour format
  }).format(date)

  return formattedDate
}

const history = computed(() => props.history?.map((item) => {
  const date = typeof item.timestamp === 'string' ? new Date(item.timestamp) : new Date(item.timestamp._seconds * 1000)

  return {
    date: getDate(date),
    reward: item.reward,
  }
}))
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button class="h-full w-full" variant="ghost">
        <Icon
          name="tabler-history"
          class="min-w-[32px]"
          mode="css"
          size="32"
        />
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogTitle class="sr-only">
        Lịch sử
      </DialogTitle>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Thời gian</TableHead>
            <TableHead>Quà</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <template v-if="history.length || pending">
            <TableRow v-for="item in history" :key="item.date">
              <TableCell>{{ item.date }}</TableCell>
              <TableCell>{{ item.reward?.label ?? 'No reward' }}</TableCell>
            </TableRow>
          </template>
          <TableRow v-else>
            <TableCell colspan="2" class="text-center">
              Không có dữ liệu.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </DialogContent>
  </Dialog>
</template>
