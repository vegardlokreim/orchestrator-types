import { FirestoreDepartment, FirestoreUser, FirestoreOrganization, FirestorePattern } from "../../firestoreTypes"

export type CreateRotationParams = {
    name: string;
    pattern: {
        patternId: FirestorePattern["id"];
        weeks: number;
        rotationPlan: FirestorePattern["weeks"];
    }
    organizationId: FirestoreOrganization["id"];
    departmentId: FirestoreDepartment["id"];
    users: Array<{ userId: FirestoreUser["id"], order: number }>;
    startDate: Date;
}


export type CreateRotationResponse = {
    code: 201;
    message: string;
}