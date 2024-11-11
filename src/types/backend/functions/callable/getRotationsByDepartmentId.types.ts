import { IFirestoreRotation } from "../../FirestoreRotation";

export type GetRotationsByDepartmentIdParams = {
    departmentId: string;
};

export type GetRotationsByDepartmentIdResponse = {
    code: 200;
    message: string;
    rotations: IFirestoreRotation[];
};
