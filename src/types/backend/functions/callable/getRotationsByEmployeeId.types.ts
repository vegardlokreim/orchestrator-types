import { FirestoreEmployee, FirestoreRotation } from "../../firestoreTypes";

export type GetRotationsByEmployeeIdParams = {
    employeeId: FirestoreEmployee["id"]
}
export type GetRotationsByEmployeeIdSuccess = {
    code: 200;
    message: string;
    rotations: FirestoreRotation[];
};
