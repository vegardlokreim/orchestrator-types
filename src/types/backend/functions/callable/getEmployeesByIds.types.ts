import { FirestoreUser } from "../../firestoreTypes";

/**
 * Retrieves User documents from Firestore based on an array of user IDs.
 * 
 * @param data - Object containing `userIds`, an array of strings representing User IDs.
 * @returns An object with:
 *   - `code: 200`: Success status code.
 *   - `message: "Success"`: Success message.
 *   - `users`: An array of User documents.
 * 
 * @Throws:
 * - `HttpsError("invalid-argument")` if `userIds` is missing or not all elements are strings.
 * 
 * @Note: Can be used to retrieve a single user by passing an array with one ID.
 */
export type GetUserByIdsParams = { userIds: Array<FirestoreUser["id"]> }

export type GetUserByIdsResponse = {
    code: 200;
    message: string;
    users: Array<FirestoreUser>;
}