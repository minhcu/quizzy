<script lang="ts" setup>
interface User {
  id: string
  email: string
  isActive?: boolean
}

const props = defineProps<{
  user: User
}>()

const emit = defineEmits<{
  (event: 'loading', value: boolean): void
}>()

const usersStore = useUsersStore()
async function handleDelete() {
  emit('loading', true)
  await usersStore.removeUser(props.user.id)
  usersStore.refresh()
  emit('loading', false)
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost">
        <Icon
          name="tabler-dots"
          class="min-w-[16px]"
          mode="css"
          size="16"
        />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent>
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem @click="handleDelete">
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
