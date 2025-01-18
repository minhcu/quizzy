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
  reward?: {
    id: string
    label: string
  }
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
