import { useRuntimeConfig } from '#app'
import { initializeApp, getApps } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'

export class FirebaseService {
  protected configuration: Object = {}
  protected config = useRuntimeConfig()
  constructor() {
    this.configuration = {
      apiKey: this.config.firebase.apiKey,
      authDomain: this.config.firebase.authDomain,
      databaseURL: this.config.firebase.databaseURL,
      projectId: this.config.firebase.projectId,
      storageBucket: this.config.firebase.storageBucket,
      messagingSenderId: this.config.firebase.messageSenderId,
      appId: this.config.firebase.appId,
      measurementId: this.config.firebase.measurementId,
    }
  }

  public firebaseInstance() {
    if(process) process.env = this.config
    return !getApps().length ? initializeApp(this.configuration) : getApps()[0]
  }

  public database() {
    return getDatabase(this.firebaseInstance())
  }

  public auth() {
    return getAuth(this.firebaseInstance())
  }
}
