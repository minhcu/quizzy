<script lang="ts" setup>
import draggable from 'vuedraggable'

const levelsStore = useLevelsStore()
const { data, status, error, refresh } = useLazyAsyncData(levelsStore.getLevels)
const levels = computed(() => data.value || [])
watchError(error)

const newLevelForm = ref({
  title: '',
  description: '',
})

async function addLevel() {
  try {
    status.value = 'pending'
    await levelsStore.addLevel({
      ...newLevelForm.value,
      order: levels.value.length ? levels.value[levels.value.length - 1].order + 1 : 0,
    })
    newLevelForm.value = {
      title: '',
      description: '',
    }
    refresh()
  }
  catch {}
}

async function deleteLevel(levelId: string) {
  try {
    status.value = 'pending'
    await levelsStore.deleteLevel(levelId)
    refresh()
  }
  catch {}
}
interface OrderChange {
  moved: {
    element: any
    newIndex: number
    oldIndex: number
  }
}
async function handleOrderChange({ moved: data }: OrderChange) {
  const oldIndex = data.oldIndex
  const newLevel = data.element
  const oldLevel = levels.value[oldIndex]

  try {
    status.value = 'pending'
    await Promise.all([
      levelsStore.updateLevel({
        id: newLevel.id,
        order: oldLevel.order,
      }),
      levelsStore.updateLevel({
        id: oldLevel.id,
        order: newLevel.order,
      }),
    ])
    refresh()
  }
  catch {}
}
</script>

<template>
  <Card class="relative">
    <div v-if="status === 'pending'" class="absolute top-0 left-0 right-0 bottom-0 bg-white bg-opacity-90 flex justify-center items-center z-10 rounded-lg">
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
          Levels
        </CardTitle>

        <Dialog>
          <DialogTrigger>
            <Button :disabled="levels.length >= 10">
              <Icon
                name="tabler-plus"
                class="min-w-[16px]"
                mode="css"
                size="16"
              />
              Add Level
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle class="capitalize">
                Add New Level
              </DialogTitle>
              <DialogDescription>
                Adding new level will allow you to create new questions for the level.
              </DialogDescription>
            </DialogHeader>

            <div>
              <div class="mb-4 flex flex-col">
                <Label id="name" class="pb-2" for="name">Level Name</Label>
                <Input
                  id="name"
                  v-model="newLevelForm.title"
                  label="Name"
                  placeholder="Enter level name"
                />
              </div>

              <div class="mb-4 flex flex-col">
                <Label id="description" class="pb-2" for="description">Description</Label>
                <Textarea
                  id="description"
                  v-model="newLevelForm.description"
                  label="Description"
                  placeholder="Enter level description"
                />
              </div>
            </div>

            <DialogFooter>
              <DialogClose as-child>
                <Button type="cancel" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose as-child>
                <Button type="submit" @click="addLevel">
                  Save changes
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </CardHeader>

    <CardContent>
      <div v-if="levels.length">
        <draggable v-model="levels" item-key="id" @change="handleOrderChange">
          <template #item="{ element, index }">
            <Card class="mb-4 hover:shadow-lg hover:cursor-pointer transition-all duration-200" @click="navigateTo(`/admin/levels/${element.id}`)">
              <CardHeader>
                <div class="flex items-center gap-3">
                  <Icon
                    name="tabler-dots-vertical"
                    class="min-w-[18px] hover:cursor-move"
                    mode="css"
                    size="18"
                    @click.stop=""
                  />

                  <CardTitle class="text-lg font-semibold">
                    {{ `${index + 1}. ${element.title}` }}
                  </CardTitle>

                  <div class="ml-auto">
                    <Button class="mr-2" variant="outline" size="sm">
                      <Icon
                        name="tabler-edit"
                        class="min-w-[16px]"
                        mode="css"
                        size="16"
                      />
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger as-child>
                        <Button variant="outline" size="sm" @click.stop="">
                          <Icon
                            name="tabler-trash"
                            class="min-w-[16px]"
                            mode="css"
                            size="16"
                          />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the level and all of it's data from the servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction @click="deleteLevel(element.id)">
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </template>
        </draggable>
      </div>

      <div v-else class="min-h-[200px] flex justify-center items-center text-secondary-foreground">
        No levels found
      </div>
    </CardContent>
  </Card>
</template>
