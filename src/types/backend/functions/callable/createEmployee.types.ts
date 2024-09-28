import { FirestoreEmployee } from "../../firestoreTypes";

export type CreateEmployeeParams = Omit<FirestoreEmployee, "id" | "createdAt" | "updatedAt">

export type CreateEmployeeSuccess = {
    code: 201;
    message: string;
}