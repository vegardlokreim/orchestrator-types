import { FirestoreRotation } from "../../firestoreTypes";
export type GetRotationsByEmployeeIdParams = {
    employeeId: string;
};
export type GetRotationsByEmployeeIdSuccess = {
    code: 200;
    message: string;
    rotations: FirestoreRotation[];
};
