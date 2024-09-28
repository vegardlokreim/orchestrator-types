import { FirestoreDepartment, FirestoreEmployee, FirestoreOrganization } from "../../firestoreTypes"

export type GetEmployeeInfoParams = {
    id: FirestoreEmployee["id"]
}

export type GetEmployeeInfoSuccess = {
    code: string,
    message: string,
    employee: FirestoreEmployee,
    departments: FirestoreDepartment[],
    organizations: FirestoreOrganization[]
}