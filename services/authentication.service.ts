import { FirebaseService } from './firebase.service'
import { AuthenticationInterface } from '../interfaces/authentication/Authentication.Interface'
import { UpdateProfileInterface } from '../interfaces/authentication/UpdateProfile.Interface'

// store
import { auth_store } from '@/stores/auth'

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
  User,
} from 'firebase/auth'

export class AuthenticationService extends FirebaseService {
  public login(
    { email, password }: AuthenticationInterface,
    redirect: boolean,
    redirectUrl: string
  ): Promise<void | User> {
    return signInWithEmailAndPassword(this.auth(), email, password)
      .then((userCredential) => {
        return userCredential.user
      })
      .finally(() => {
        if (redirect) document.location.href = redirectUrl ? redirectUrl : '/'
      })
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

  public logOut(redirect: boolean, redirectUrl?: string) {
    auth_store().set_user(null)
    auth_store().set_isLogged_in_status(false)
    return signOut(this.auth()).then(() => {
      if (redirect) document.location.href = redirectUrl ? redirectUrl : '/'
    })
  }

  public async isLoggedIn() {
    await new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth(), (user) => {
        resolve(!!user)
      })
    }).then((user) => {
      auth_store().set_isLogged_in_status(!!user)
    })
    return auth_store().isLoggedIn
  }

  public async returnClaims() {
    await new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth(), async (user) => {
        if (user) {
          await user.getIdTokenResult().then(({ claims }) => {
            resolve(claims)
          })
        }
      })
    }).then((claims) => {
      auth_store().set_claims(claims)
    })
    return auth_store().getclaims
  }

  public async user() {
    new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth(), (user) => {
        resolve(user)
      })
    }).then((user) => {
      auth_store().set_user(user)
    })
    return auth_store().getUser
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
