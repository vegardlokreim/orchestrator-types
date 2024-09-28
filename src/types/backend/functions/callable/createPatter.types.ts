import { FirestoreDepartment, FirestoreEmployee, FirestorePattern } from "../../firestoreTypes";

export type CreatePatternParams = {
    name: string;
    weeks: FirestorePattern["weeks"];
    departmentId: FirestoreDepartment["id"];
    createdBy: FirestoreEmployee["id"];
};

export type CreatePatternSuccess = {
    code: 201;
    message: string;
};
