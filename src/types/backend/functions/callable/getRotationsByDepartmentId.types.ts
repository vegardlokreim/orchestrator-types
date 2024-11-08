import { FirestoreRotation } from "../../firestoreTypes";

export type GetRotationsByDepartmentIdParams = {
    departmentId: string;
};

export type GetRotationsByDepartmentIdResponse = {
    code: 200;
    message: string;
    rotations: FirestoreRotation[];
};
