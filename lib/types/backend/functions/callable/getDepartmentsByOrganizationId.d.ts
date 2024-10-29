import { FirestoreDepartment, FirestoreOrganization } from "../../firestoreTypes";
export type GetDepartmentsByOrganizationIdParams = {
    organizationId: FirestoreOrganization["id"];
};
export type GetDepartmentsByOrganizationIdResponse = {
    code: 200;
    message: string;
    departments: Array<FirestoreDepartment>;
};
