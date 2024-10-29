import { FirestoreDepartment, FirestoreUser } from "../../firestoreTypes";
export type GetUserByDepartmentIdParams = {
    departmentId: FirestoreDepartment['id'];
};
export type GetUserByDepartmentIdResponse = {
    code: 200;
    message: string;
    users: Array<FirestoreUser>;
};
