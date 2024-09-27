import { FirestoreDepartment } from "../../firestoreTypes";

export type Params = Omit<FirestoreDepartment, "id" | "employees" | "createdAt" | "updatedAt">
