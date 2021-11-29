import { WhereFilterOp } from "firebase/firestore";

export interface FirestoreQuery {
    key: string,
    operator: WhereFilterOp,
    value: any
}