import { FirestoreDepartment } from "../../firestoreTypes";
export type CreateDepartmentParams = Omit<FirestoreDepartment, "id" | "users" | "createdAt" | "updatedAt">;
export type CreateDepartmentResponse = {
    code: 201;
    message: string;
};
