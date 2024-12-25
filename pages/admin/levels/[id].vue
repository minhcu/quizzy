<script lang="ts" setup>
import { useForm } from 'vee-validate'
import * as z from 'zod'

const route = useRoute()
const levelsStore = useLevelsStore()

const { data: level, pending, error } = levelsStore.getLevel(route.params.id as string)
watchError(error)

console.log(level)

// const formSchema = z.object({
//   title: z.string().nonempty('Title is required'),
//   description: z.string().optional(),
//   ticket: z.number().int().positive().optional().default(0),
//   questions: z.object({}).optional(),
// })

function handleSubmit() {
  console.log('submit')
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
        {{ level?.title }}
      </CardTitle>
      <CardDescription v-if="level?.description">
        {{ level?.description }}
      </CardDescription>
    </CardHeader>

    <CardContent>
      <Form @submit="handleSubmit">
        <Collapsible>
          <div>
            test
            <CollapsibleTrigger as-child>
              <Button variant="ghost" size="sm" class="w-9 p-0">
                <span>Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent class="space-y-2">
            <div class="rounded-md border px-4 py-3 font-mono text-sm">
              @radix-ui/colors
            </div>
            <div class="rounded-md border px-4 py-3 font-mono text-sm">
              @stitches/react
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Form>
    </CardContent>
  </Card>
</template>
