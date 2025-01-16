export const useLacXiStore = defineStore('lac-xi', () => {
  const rewardList = ref([])

  async function fetchRewards() {
    return await $api('client/lac-xi')
  }

  async function drawReward(): Promise<{ data: {
    id: string
    label: string
  } }> {
    return await $api('client/lac-xi/draw')
  }

  async function fetchHistory() {
    return await $api('client/lac-xi/history')
  }

  return {
    rewardList,
    fetchRewards,
    drawReward,
    fetchHistory,
  }
})
