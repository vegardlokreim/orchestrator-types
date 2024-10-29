import { FirestoreDepartment, FirestoreUser } from "../../firestoreTypes";
export type GetUsersByDepartmentIdParams = {
    departmentId: FirestoreDepartment['id'];
};
export type GetUsersByDepartmentIdResponse = {
    code: 200;
    message: string;
    users: Array<FirestoreUser>;
};
