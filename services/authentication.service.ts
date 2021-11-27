import { FirebaseService } from './firebase.service'
import { AuthenticationInterface } from '../interfaces/authentication/Authentication.Interface'
import { UpdateProfileInterface } from '../interfaces/authentication/UpdateProfile.Interface'

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  User,
} from 'firebase/auth'

export class AuthenticationService extends FirebaseService {
  public login({
    email,
    password,
  }: AuthenticationInterface): Promise<void | User> {
    return signInWithEmailAndPassword(this.auth(), email, password)
      .then((userCredential) => userCredential.user)
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.error({ errorCode, errorMessage })
      })
  }

  public register({
    email,
    password,
  }: AuthenticationInterface): Promise<void | User> {
    return createUserWithEmailAndPassword(this.auth(), email, password)
      .then((userCredential) => userCredential.user)
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.error({ errorCode, errorMessage })
      })
  }

  public async isLoggedIn() {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth(), (user) => {
        resolve(!!user)
      })
    })
  }

  public user(): User | null {
    // @ts-ignore
    return this.isLoggedIn() ? this.auth().currentUser : null
  }

  public updateProfile({ displayName, photoURL }: UpdateProfileInterface) {
    return updateProfile(<User>(<unknown>this.user()), {
      displayName,
      photoURL,
    })
      .then(() => {
        return this.user()
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.error({ errorCode, errorMessage })
      })
  }
}
