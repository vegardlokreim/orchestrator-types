import { FirestoreDepartment, FirestoreUser, FirestoreOrganization } from "../../firestoreTypes";
export type GetUserInfoParams = {
    id: FirestoreUser["id"];
};
export type GetUserInfoResponse = {
    code: number;
    message: string;
    user: FirestoreUser;
    departments: FirestoreDepartment[];
    organizations: FirestoreOrganization[];
};
