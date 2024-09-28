import { FirestoreEmployee } from "../../firestoreTypes";
export type CreateEmployeeParams = Omit<FirestoreEmployee, "id" | "createdAt" | "updatedAt">;
