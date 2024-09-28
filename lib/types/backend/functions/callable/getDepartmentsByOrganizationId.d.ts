import { FirestoreDepartment, FirestoreOrganization } from "../../firestoreTypes";
export type GetDepartmentsByOrganizationIdParams = {
    organizationId: FirestoreOrganization["id"];
};
export type GetDepartmentsByOrganizationIdSuccess = {
    code: 200;
    message: string;
    departments: Array<FirestoreDepartment>;
};
