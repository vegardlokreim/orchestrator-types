import { FirestoreDepartment } from "../../firestoreTypes";

export type GetEmployeesByDepartmentIdParams = {
    departmentId: FirestoreDepartment['id'];
}