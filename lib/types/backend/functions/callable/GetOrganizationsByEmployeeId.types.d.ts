import { FirestoreEmployee, FirestoreOrganization } from "../../firestoreTypes";
export type GetOrganizatonsByEmployeeIdParams = {
    employeeId: FirestoreEmployee['id'];
};
export type GetOrganizatonsByEmployeeIdSuccess = {
    code: 200;
    message: string;
    organizations: Array<FirestoreOrganization>;
};
