import { getApps, initializeApp } from 'firebase-admin/app'

export default function firebaseApp() {
  const apps = getApps()
  if (apps.length === 0) {
    initializeApp()
  }
  return getApps()[0]
}
