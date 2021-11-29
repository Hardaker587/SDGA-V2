import { FirebaseService } from '~/services/firebase.service'
import {
  ref,
  onValue,
  set,
  remove,
  update,
  query,
  equalTo,
  orderByChild,
  get,
  child,
} from 'firebase/database'
import { DatabaseAddOneInterface } from '~/interfaces/realtime-database/DatabaseAddOne.Interface'
export class RealtimeDatabaseService extends FirebaseService {
  public addOne(request: DatabaseAddOneInterface) {
    return set(
      ref(this.database(), `${request.collection}/${request.reference}`),
      request.data
    )
  }
  public findOne(collection: string, reference: string) {
    return new Promise((resolve, reject) => {
      const databaseReference = ref(this.database())
      get(child(databaseReference, `${collection}/${reference}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            resolve(snapshot.val())
          } else {
            resolve({ status: 'warning', message: 'No data available' })
          }
        })
        .catch((error) => {
          reject({ status: 'error', message: error })
          console.error(error)
        })
    })
  }

  public deleteOne(reference: string) {
    const referenceLookup = ref(this.database(), reference)
    return remove(referenceLookup)
  }

  public updateOne(request: DatabaseAddOneInterface) {
    const referenceLookup = ref(
      this.database(),
      `${request.collection}/${request.reference}`
    )
    return update(referenceLookup, request.data)
  }
  public findAll(collection: string) {
    return new Promise((resolve, reject) => {
      const databaseReference = ref(this.database(), `${collection}`)
      get(databaseReference)
        .then((snapshot) => {
          if (snapshot.exists()) {
            resolve(snapshot.val())
          } else {
            resolve({ status: 'warning', message: 'No data available' })
          }
        })
        .catch((error) => {
          reject({ status: 'error', message: error })
          console.error(error)
        })
    })
  }

  public findMany(
    collection: string,
    queryValue: string,
    referenceValue?: any
  ) {
    return new Promise((resolve, reject) => {
      const databaseReference = ref(this.database(), `${collection}`)
      const queryLookup = query(
        databaseReference,
        orderByChild(queryValue || ''),
        equalTo(referenceValue)
      )
      get(queryLookup)
        .then((snapshot) => {
          if (snapshot.exists()) {
            resolve(snapshot.val())
          } else {
            resolve({ status: 'warning', message: 'No data available' })
          }
        })
        .catch((error) => {
          reject({ status: 'error', message: error })
          console.error(error)
        })
    })
  }
}
