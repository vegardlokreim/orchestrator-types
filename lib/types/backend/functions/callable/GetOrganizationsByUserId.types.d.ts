import { FirestoreUser, FirestoreOrganization } from "../../firestoreTypes";
export type GetOrganizationsByUserIdParams = {
    userId: FirestoreUser['id'];
};
export type GetOrganizationsByUserIdResponse = {
    code: 200;
    message: string;
    organizations: Array<FirestoreOrganization>;
};
