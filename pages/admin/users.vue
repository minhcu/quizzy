<script lang="ts" setup>
import {
  type ColumnDef,
  FlexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type RowSelectionState,
  useVueTable,
} from '@tanstack/vue-table'
import ActionMenu from '~/components/admin/users/ActionMenu.vue'
import { Button } from '~/components/ui/button'
import { Checkbox } from '~/components/ui/checkbox'
import Textarea from '~/components/ui/textarea/Textarea.vue'

const orgStore = useOrgStore()
const usersStore = useUsersStore()

// TODO: what if users length is over 1000?
const { data: users, pending, error: getUsersError } = usersStore.getUsers(orgStore.currentOrg?.id)

watchError(getUsersError)

const columns: ColumnDef<any>[] = [
  {
    id: 'select',
    header: ({ table }) =>
      h(Checkbox, {
        'checked':
          table.getIsAllPageRowsSelected()
          || (table.getIsSomePageRowsSelected() && 'indeterminate'),
        'onUpdate:checked': value => table.toggleAllPageRowsSelected(!!value),
        'ariaLabel': 'Select all',
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        'checked': row.getIsSelected(),
        'onUpdate:checked': value => row.toggleSelected(!!value),
        'ariaLabel': 'Select row',
      }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) =>
      h('div', { class: 'capitalize' }, row.getValue('isActive') ? 'Activated' : 'Inactivated'),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        },
        () => ['Email', h('div', { class: 'ml-2 h-4 w-4' })],
      )
    },
    cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('email')),
    enableHiding: false,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original
      return h('div', { class: 'relative' }, h(ActionMenu, {
        user,
        onLoading: value => pending.value = value,
      }))
    },
  },
]

const rowSelection = ref({})

const table = useVueTable({
  data: users,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  onRowSelectionChange: handleRowSelectionChange,
  state: {
    get rowSelection() { return rowSelection.value },
  },
})

function handleRowSelectionChange(updaterOrValue: RowSelectionState | ((old: RowSelectionState) => RowSelectionState)) {
  if (typeof updaterOrValue === 'function')
    rowSelection.value = updaterOrValue(rowSelection.value)
}

const emails = ref('')

async function addUsers() {
  if (!emails.value)
    return

  const gmailRegex = /^[\w.%+-]+@gmail\.com$/
  const emailsList = [...new Set(emails.value
    .split('\n')
    .map(email => email.trim())
    .filter(email => gmailRegex.test(email) && users.value.findIndex(user => user.email === email) === -1))]

  if (!emailsList.length)
    return

  try {
    pending.value = true
    await usersStore.addUsers(emailsList, orgStore.currentOrg?.id)
    usersStore.refresh(orgStore.currentOrg?.id)
    console.log(users)
  }
  catch (error) {
    console.error(error)
    notifyError('Failed to add users')
  }
  finally {
    pending.value = false
  }
}

async function handleDelete() {
  if (!Object.keys(rowSelection.value).length)
    return

  const userIds = Object.keys(rowSelection.value)
    .map(index => users.value[Number(index)].id)
  try {
    pending.value = true
    await usersStore.removeUsers(userIds)
    table.toggleAllPageRowsSelected(false)
    usersStore.refresh(orgStore.currentOrg?.id)
  }
  catch {
    notifyError('Failed to delete users')
  }
  finally {
    pending.value = false
  }
}
</script>

<template>
  <Card class="relative">
    <div v-if="pending" class="absolute top-0 left-0 right-0 bottom-0 bg-white bg-opacity-90 flex justify-center items-center z-10 rounded-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        class="animate-spin w-10 h-10"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    </div>
    <CardHeader>
      <div class="flex justify-between items-center">
        <CardTitle class="text-2xl font-semibold">
          Users
        </CardTitle>
      </div>
    </CardHeader>

    <CardContent>
      <div class="flex justify-between items-center mb-4">
        <Input
          class="max-w-sm"
          placeholder="Search by email..."
          :model-value="table.getColumn('email')?.getFilterValue() as string"
          @update:model-value=" table.getColumn('email')?.setFilterValue($event)"
        />

        <div class="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="outline" :disabled="Object.keys(rowSelection).length === 0">
                <Icon
                  name="tabler-caret-down"
                  class="min-w-[16px]"
                  mode="css"
                  size="16"
                />
                Actions
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem @click="handleDelete">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog @update:open="emails = ''">
            <DialogTrigger>
              <Button>
                <Icon name="tabler-plus" />
                Add users
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle class="capitalize">
                  Add New Users
                </DialogTitle>
                <DialogDescription>
                  Adding new users to the organization. Only added users will be able to access the organization.
                </DialogDescription>
              </DialogHeader>
              <div>
                <Textarea v-model="emails" placeholder="Enter your list of user emails here. Each email should be on a new line." rows="15" />
              </div>
              <DialogFooter>
                <DialogClose as-child>
                  <Button type="cancel" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <DialogClose as-child>
                  <Button type="submit" @click="addUsers">
                    Save changes
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div class="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
              <TableHead v-for="header in headerGroup.headers" :key="header.id">
                <FlexRender
                  v-if="!header.isPlaceholder"
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
                />
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <template v-if="table.getRowModel().rows?.length">
              <template v-for="row in table.getRowModel().rows" :key="row.id">
                <TableRow :data-state="row.getIsSelected() && 'selected'">
                  <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                    <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                  </TableCell>
                </TableRow>
                <TableRow v-if="row.getIsExpanded()">
                  <TableCell :colspan="row.getAllCells().length">
                    {{ JSON.stringify(row.original) }}
                  </TableCell>
                </TableRow>
              </template>
            </template>

            <TableRow v-else class="h-[300px]">
              <TableCell :colspan="columns.length" align="center">
                No result.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </CardContent>

    <CardFooter class="justify-end">
      <Pagination
        v-slot="{ page }"
        :items-per-page="table.getState().pagination.pageSize"
        :total="users.length"
        show-edges
        :sibling-count="1"
      >
        <PaginationList v-slot="{ items }" class="flex justify-end items-center gap-1">
          <PaginationFirst @click="table.firstPage()" />
          <PaginationPrev @click="table.previousPage()" />

          <template v-for="(item, index) in items">
            <PaginationListItem
              v-if="item.type === 'page'"
              :key="index"
              :value="item.value"
              as-child
              @click="table.setPageIndex(item.value)"
            >
              <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'">
                {{ item.value }}
              </Button>
            </PaginationListItem>
            <PaginationEllipsis v-else :key="item.type" :index="index" />
          </template>

          <PaginationNext @click="table.nextPage()" />
          <PaginationLast @click="table.lastPage()" />
        </PaginationList>
      </Pagination>
    </CardFooter>
  </Card>
</template>
