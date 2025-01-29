export interface Reward {
  id: string
  label: string
  probability: number
  quantity: number
}

export interface User {
  email: string
  reward?: string
  ticket: number
}

export interface History {
  timestamp: {
    _nanoseconds: number
    _seconds: number
  } | string
  reward?: Pick<Reward, 'id' | 'label'>
}

export interface ResponseSuccess {
  statusCode: number
  data: {
    selectedReward?: {
      id: string
      label: string
    }
    history: History[]
    user: User
  }
}

export interface ResponseRanking {
  statusCode: number
  data: {
    users: User[]
    rewards: Pick<Reward, 'id' | 'label'>[]
  }
}
