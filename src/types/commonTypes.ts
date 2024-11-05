import { firestoreCollections, userStoragePath } from "./typeConsts"

/**
 * A recursive type that makes all properties of a given type `T` optional.
 * 
 * This type differs from `Partial<T>` in that it goes deeper into nested objects,
 * making every property at every level optional.
 * 
 * @template T - The type to be transformed into a subset with every property optional.
 */
export type Subset<T> = {
    [A in keyof T]?: T[A] extends object
    ? Subset<T[A]>
    : T[A] extends object | null
    ? Subset<T[A]> | null
    : T[A] extends object | null | undefined
    ? Subset<T[A]> | null | undefined
    : T[A]
}

/**
 * A recursive type that makes all properties of a given type `T` required.
 * 
 * This type differs from `Required<T>` in that it goes deeper into nested objects,
 * making every property at every level required.
 * 
 * Note that null is still allowed
 * 
 * @template T - The type to be transformed into a subset with every property required.
 */
export type DeepRequired<T> = {
    [P in keyof T]-?: T[P] extends object
    ? DeepRequired<T[P]>
    : T[P] extends object | null
    ? DeepRequired<T[P]>
    : T[P] extends object | null | undefined
    ? DeepRequired<T[P]>
    : T[P]
};


/**
 * A recursive type that makes all properties of a given type `T` required and non-nullable.
 * 
 * This type differs from `Required<T>` in that it goes deeper into nested objects,
 * making every property at every level required and non-nullable.
 * 
 * @template T - The type to be transformed into a subset with every property required.
 */
export type DeepRequiredNonNull<T,K extends keyof T = keyof T> = {
    [P in K]-?: T[P] extends object
        ? DeepRequiredNonNull<NonNullable<T[P]>>
        : NonNullable<T[P]>
} & {
    // Handle remaining properties
    [P in Exclude<keyof T, K>]: T[P] extends object
        ? T[P] extends null | undefined
            ? never
            : DeepRequiredNonNull<T[P]>
        : NonNullable<T[P]>
};


export type FirestoreCollection = (typeof firestoreCollections)[number]

export type UserStoragePath = (typeof userStoragePath)[number]

