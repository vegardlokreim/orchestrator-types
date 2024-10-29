import { firestoreCollections, userStoragePath } from "./typeConsts"

export type Subset<T> = {
    [A in keyof T]?: T[A] extends object
    ? Subset<T[A]>
    : T[A] extends object | null
    ? Subset<T[A]> | null
    : T[A] extends object | null | undefined
    ? Subset<T[A]> | null | undefined
    : T[A]
}

export type FirestoreCollection = (typeof firestoreCollections)[number]

export type UserStoragePath = (typeof userStoragePath)[number]

