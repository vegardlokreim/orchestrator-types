import { FirestoreEmployee, FirestoreOrganization } from "../../firestoreTypes";

export type GetOrganizationsByEmployeeIdParams = {
    employeeId: FirestoreEmployee['id'];
}

export type GetOrganizationsByEmployeeIdSuccess = {
    code: 200;
    message: string;
    organizations: Array<FirestoreOrganization>;
}