import { FirestoreUser } from "../../firestoreTypes";

export type CreateEmployeeParams = Omit<FirestoreUser, "id" | "createdAt" | "updatedAt">

export type CreateUserResponse = {
    code: 201;
    message: string;
}