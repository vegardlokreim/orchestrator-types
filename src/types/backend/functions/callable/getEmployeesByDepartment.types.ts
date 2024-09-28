import { FirestoreDepartment, FirestoreEmployee } from "../../firestoreTypes";

export type GetEmployeesByDepartmentIdParams = {
    departmentId: FirestoreDepartment['id'];
}

export type GetEmployeesByDepartmentIdSuccess = {
    code: 200,
    message: string,
    employees: Array<FirestoreEmployee>
}