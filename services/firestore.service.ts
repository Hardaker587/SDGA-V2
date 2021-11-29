import { FirebaseService } from './firebase.service'
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from 'firebase/firestore'
import { FirestoreQuery } from '../interfaces/firestore/FirestoreQuery.Interface'

export class FirestoreService extends FirebaseService {
  public async addDocument(
    collectionRef: string,
    documentRef: string,
    data: any
  ) {
    await setDoc(doc(this.firestore(), collectionRef, documentRef), data)
  }

  public async getAllDocuments(collectionRef: string) {
    const output = []
    const querySnapshot = await getDocs(
      collection(this.firestore(), collectionRef)
    )
    querySnapshot.forEach((snapshot) => {
      output.push({ id: snapshot.id, ...snapshot.data() })
    })
    return output
  }

  public async getOneDocument(collectionRef: string, documentRef: string) {
    const documentRefernce = doc(this.firestore(), collectionRef, documentRef)
    const documentSnapshot = await getDoc(documentRefernce)
    if (documentSnapshot.exists())
      return { id: documentSnapshot.id, ...documentSnapshot.data() }
  }

  public async queryDocuments(
    collectionRef: string,
    queryObject: FirestoreQuery
  ) {
    const output = []
    const collectionReference = collection(this.firestore(), collectionRef)
    const constructedQuery = query(
      collectionReference,
      where(queryObject.key, queryObject.operator, queryObject.value)
    )
    const querySnapshot = await getDocs(constructedQuery)
    querySnapshot.forEach((snapshot) => {
      output.push({ id: snapshot.id, ...snapshot.data() })
    })
    return output
  }

  public async documentCount(collectionRef: string) {
    const querySnapshot = await getDocs(
      collection(this.firestore(), collectionRef)
    )
    return querySnapshot.size
  }
}
