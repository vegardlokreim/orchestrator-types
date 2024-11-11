import { FirestoreDepartmentGroup } from "../../firestoreTypes";

export type CreateDepartmentGroupParams = Omit<FirestoreDepartmentGroup, "id" | "createdAt" | "updatedAt">

export type CreateDepartmentGroupResponse = {
    code: 201 | 400 | 500;
    message: string;
}
