import { FirestoreDepartment, FirestoreUser, FirestoreOrganization } from "../../firestoreTypes";
export type GetEmployeeInfoParams = {
    id: FirestoreUser["id"];
};
export type GetEmployeeInfoResponse = {
    code: number;
    message: string;
    user: FirestoreUser;
    departments: FirestoreDepartment[];
    organizations: FirestoreOrganization[];
};
