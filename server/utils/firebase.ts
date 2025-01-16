import type { ServiceAccount } from 'firebase-admin/app'
import { cert, getApps, initializeApp } from 'firebase-admin/app'

const firebaseConfig = {
  type: process.env.firebase_type,
  project_id: process.env.firebase_project_id,
  private_key_id: process.env.firebase_private_key_id,
  private_key: process.env.firebase_private_key,
  client_email: process.env.firebase_client_email,
  client_id: process.env.firebase_client_id,
  auth_uri: process.env.firebase_auth_uri,
  token_uri: process.env.firebase_token_uri,
  auth_provider_x509_cert_url: process.env.firebase_auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.firebase_client_x509_cert_url,
  universe_domain: process.env.firebase_universe_domain,
}

export default function firebaseApp() {
  const apps = getApps()
  if (apps.length === 0) {
    initializeApp({
      credential: cert(firebaseConfig as ServiceAccount),
    })
  }
  return getApps()[0]
}
