import { useRuntimeConfig } from '#app'
import { initializeApp, getApps } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

export class FirebaseService {
  protected configuration: Object = {}
  protected config = useRuntimeConfig()
  constructor() {
    this.configuration = {
      apiKey: this.config.public.firebase.apiKey,
      authDomain: this.config.public.firebase.authDomain,
      databaseURL: this.config.public.firebase.databaseURL,
      projectId: this.config.public.firebase.projectId,
      storageBucket: this.config.public.firebase.storageBucket,
      messagingSenderId: this.config.public.firebase.messageSenderId,
      appId: this.config.public.firebase.appId,
      measurementId: this.config.public.firebase.measurementId,
    }
  }

  public firebaseInstance() {
    // process.env = this.config
    return !getApps().length ? initializeApp(this.configuration) : getApps()[0]
  }

  public database() {
    return getDatabase(this.firebaseInstance())
  }

  public auth() {
    return getAuth(this.firebaseInstance())
  }

  public firestore() {
    return getFirestore(this.firebaseInstance())
  }
}
