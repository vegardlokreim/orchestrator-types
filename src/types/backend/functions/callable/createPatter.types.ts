import { FirestoreDepartment, FirestoreUser, FirestorePattern } from "../../firestoreTypes";

export type CreatePatternParams = {
    name: string;
    weeks: FirestorePattern["weeks"];
    departmentId: FirestoreDepartment["id"];
    createdBy: FirestoreUser["id"];
};

export type CreatePatternResponse = {
    code: 201;
    message: string;
};
