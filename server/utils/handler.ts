import type { EventHandler, EventHandlerRequest, H3Event, H3EventContext } from 'h3'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import firebaseApp from './firebase'

interface CustomEventContext {
  user: any
  firebase: ReturnType<typeof firebaseApp>
  db: ReturnType<typeof getFirestore>
}
declare module 'h3' {
  interface H3EventContext extends CustomEventContext {}
}

export function defineWrappedResponseHandler<T extends EventHandlerRequest, D>(handler: EventHandler<T, D>): EventHandler<T, D> {
  return defineEventHandler<T>(async (event) => {
    try {
      const authorization = getHeader(event, 'authorization')
      if (!authorization) {
        throw createError({
          statusCode: 401,
          message: 'Unauthorized',
        })
      }

      if (!authorization.startsWith('Bearer ')) {
        throw createError({
          statusCode: 401,
          message: 'Unauthorized',
        })
      }
      const token = authorization.slice(7)

      const firebase = firebaseApp()
      const decoded = await getAuth().verifyIdToken(token)
      const db = getFirestore(firebase)
      event.context.user = decoded
      event.context.firebase = firebase
      event.context.db = db

      const response = await handler(event)
      return response
    }
    catch (err) {
      return err
    }
  })
}
