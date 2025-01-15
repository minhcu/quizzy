<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { QUESTION_TYPES } from '~/constants/question'

interface Question {
  id: string
  question: string
  type: typeof QUESTION_TYPES
}

const questionsStore = useQuestionsStore()
const route = useRoute()
const { data, status, error } = useLazyAsyncData(() => questionsStore.getQuestions(route.params.levelId as string))
const questions = computed(() => data.value || [] as Question[])
watchError(error)

const questionsFormSchema = toTypedSchema(
  z.object({
    questions: z.array(
      z.object({
        id: z.string().optional(),
        question: z.string().nonempty('Question is required'),
        type: z.enum(QUESTION_TYPES),
      }),
    ).min(1, 'At least one question is required'),
  }),
)
const questionsForm = useForm({ validationSchema: questionsFormSchema, initialValues: { questions: [] } })

watch(questions, () => {
  questionsForm.resetForm()
  const _questions = unref(questions)
  questionsForm.setValues({
    questions: _questions.map(q => ({
      id: q.id,
      question: q.question || '',
      type: q.type || 'single',
    })),
  })
})

async function handleSubmit() {
  console.log(questionsForm.values.questions)
}
</script>

<template>
  <Card>
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
      <div class="flex items-center justify-between">
        <CardTitle>Questions</CardTitle>
        <Button
          @click="() => questionsForm.setValues({ questions: [...(questionsForm.values.questions || []), { question: '', type: 'single' }] })"
        >
          Add question
        </Button>
      </div>
    </CardHeader>

    <CardContent v-if="!questionsForm.values.questions?.length" class="min-h-[200px] flex items-center justify-center">
      <p>This level has no questions yet. Maybe add some?</p>
    </CardContent>

    <form @submit.prevent="handleSubmit">
      <CardContent>
        <template v-for="(question, index) in questionsForm.values.questions" :key="question.id || index">
          <div class="mb-4 relative">
            <FormField v-slot="{ field, errorMessage }" :name="`questions[${index}].question`">
              <FormItem>
                <FormLabel>Question {{ index + 1 }}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your question"
                    v-bind="field"
                    :model-value="question.question"
                  />
                </FormControl>
                <FormMessage>{{ errorMessage }}</FormMessage>
              </FormItem>
            </FormField>

            <FormField v-slot="{ field, errorMessage }" :name="`questions[${index}].type`">
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Select v-bind="field" :model-value="question.type">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        <SelectItem v-for="type in QUESTION_TYPES" :key="type" :value="type">
                          {{ type }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage>{{ errorMessage }}</FormMessage>
              </FormItem>
            </FormField>

            <FormField v-if="question.type === 'single'" v-slot="{ field, errorMessage }" :name="`questions[${index}].type`">
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Select v-bind="field" :model-value="question.type">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        <SelectItem v-for="type in QUESTION_TYPES" :key="type" :value="type">
                          {{ type }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage>{{ errorMessage }}</FormMessage>
              </FormItem>
            </FormField>
          </div>
        </template>
      </CardContent>
      <CardFooter>
        <Button type="submit">
          {{ questionsForm.isSubmitting ? 'Saving...' : 'Save' }}
        </Button>
      </CardFooter>
    </form>
  </Card>
</template>
