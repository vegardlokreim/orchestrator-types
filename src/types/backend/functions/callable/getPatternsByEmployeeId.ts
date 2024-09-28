import { FirestoreEmployee, FirestorePattern } from "../../firestoreTypes";

export type GetPatternsByEmployeeIdParams = {
    employeeId: FirestoreEmployee['id'];
};

export type GetPatternsByEmployeeIdSuccess = {
    code: 200;
    message: string;
    patterns: FirestorePattern[];
};
