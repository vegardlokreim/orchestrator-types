import { FirestoreDepartment, FirestoreEmployee, FirestoreOrganization } from "../../firestoreTypes";
export type GetEmployeeInfoParams = {
    id: FirestoreEmployee["id"];
};
export type GetEmployeeInfoSuccess = {
    code: number;
    message: string;
    employee: FirestoreEmployee;
    departments: FirestoreDepartment[];
    organizations: FirestoreOrganization[];
};
