import { FirestoreDepartment } from "../../firestoreTypes";

export type CreateDepartmentParams = Omit<FirestoreDepartment, "id" | "employees" | "createdAt" | "updatedAt">

export type CreateDepartmentParamsSuccess = {
    code: 201,
    message: string
}