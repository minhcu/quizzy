import type { QUESTION_TYPES } from '~/constants/question'

interface Question {
  question: string
  type: typeof QUESTION_TYPES[keyof typeof QUESTION_TYPES]
}

export const useQuestionsStore = defineStore('question', () => {
  const orgStore = useOrgStore()
  async function getQuestions(levelId: string) {
    const response = await $api<{
      data: Question[]
    }>(`/admin/organizations/${orgStore.currentOrg?.id}/levels/${levelId}/questions`)
    return response.data
  }

  return {
    getQuestions,
  }
})
