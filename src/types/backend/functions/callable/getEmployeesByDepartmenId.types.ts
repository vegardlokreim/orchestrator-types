import { FirestoreDepartment, FirestoreUser } from "../../firestoreTypes";

export type GetUserByDepartmentIdParams = {
    departmentId: FirestoreDepartment['id'];
}

export type GetUserByByDepartmentIdResponse= {
    code: 200,
    message: string,
    users: Array<FirestoreUser>
}