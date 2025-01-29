import type { ResponseRanking, ResponseSuccess } from '~/constants/lac-xi.const'

export const useLacXiStore = defineStore('lac-xi', () => {
  async function drawReward() {
    return await $api<Promise<ResponseSuccess>>('client/lac-xi/draw')
  }

  async function fetchHistory() {
    return await $api<Promise<ResponseSuccess>>('client/lac-xi/history')
  }

  async function fetchRanking() {
    return await $api<Promise<ResponseRanking>>('client/lac-xi/ranking')
  }

  return {
    drawReward,
    fetchHistory,
    fetchRanking,
  }
})
