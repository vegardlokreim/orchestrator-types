import { FirestoreDepartment } from "../../firestoreTypes";

export type CreateDepartmentParams = Omit<FirestoreDepartment, "id" | "employees" | "createdAt" | "updatedAt">
