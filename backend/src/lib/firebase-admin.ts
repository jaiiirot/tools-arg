import admin from 'firebase-admin'

let initialized = false

export function getFirebaseAdmin(): admin.app.App {
  if (!initialized) {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId:   process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey:  process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
      })
    }
    initialized = true
    console.log('[Firebase Admin] Initialized')
  }
  return admin.app()
}

export function getFirestore() {
  return getFirebaseAdmin().firestore()
}

export function getAuth() {
  return getFirebaseAdmin().auth()
}

export default { getFirebaseAdmin, getFirestore, getAuth }
