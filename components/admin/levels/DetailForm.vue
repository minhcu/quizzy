<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'

const route = useRoute()
const levelsStore = useLevelsStore()

const { data: level, pending, error } = levelsStore.getLevel(route.params.levelId as string)
watchError(error)

const levelFormSchema = toTypedSchema(
  z.object({
    title: z.string().nonempty('Title is required'),
    description: z.string().optional(),
    tickets: z.number().int().nonnegative('Ticket must be a positive number').default(0),
  }),
)
const levelForm = useForm({ validationSchema: levelFormSchema })
watch(level, () => {
  levelForm.resetForm()
  const _level = unref(level)
  for (const key in _level) {
    levelForm.setValues({ [key]: _level[key] })
  }
})

async function handleSubmit() {
  const { valid } = await levelForm.validate()
  if (!valid)
    return
  try {
    pending.value = true
    await levelsStore.updateLevel(levelForm.values)
    levelsStore.refresh()
    notifySuccess('Level updated successfully')
  }
  catch {
    notifyError('Failed to update level')
  }
  finally {
    pending.value = false
  }
}
</script>

<template>
  <Card>
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
      <CardTitle>
        Level
      </CardTitle>
    </CardHeader>

    <form @submit.prevent="handleSubmit">
      <CardContent>
        <div class="mb-4">
          <FormField v-slot="{ field }" name="title">
            <FormItem>
              <FormLabel class="flex items-center gap-1">
                Title
              </FormLabel>
              <FormControl>
                <Input type="text" placeholder="Level title" v-bind="field" />
              </FormControl>
            </FormItem>
          </FormField>
        </div>

        <div class="mb-4">
          <FormField v-slot="{ field }" class="mb-2" name="description">
            <FormItem>
              <FormLabel class="flex items-center gap-1">
                Description
              </FormLabel>
              <FormControl>
                <Input type="text" placeholder="Level description" v-bind="field" />
              </FormControl>
            </FormItem>
          </FormField>
        </div>

        <div>
          <FormField v-slot="{ field }" class="mb-2" name="tickets">
            <FormItem>
              <FormLabel class="flex items-center gap-1">
                Tickets
                <AppIconTooltip icon="tabler-info-circle" size="20">
                  Number of tickets reward for this level
                </AppIconTooltip>
              </FormLabel>
              <FormControl>
                <Input type="number" placeholder="Number of tickets" v-bind="field" />
              </FormControl>
            </FormItem>
          </FormField>
        </div>
      </CardContent>

      <CardFooter>
        <Button type="submit">
          Save
        </Button>
      </CardFooter>
    </form>
  </Card>
</template>
