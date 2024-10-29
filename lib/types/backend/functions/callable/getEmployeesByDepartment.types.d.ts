import { FirestoreDepartment, FirestoreUser } from "../../firestoreTypes";
export type GetusersByDepartmentIdParams = {
    departmentId: FirestoreDepartment['id'];
};
export type GetusersByDepartmentIdSuccess = {
    code: 200;
    message: string;
    users: Array<FirestoreUser>;
};
