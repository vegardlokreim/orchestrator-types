import { IFirestoreRotation } from "../../FirestoreRotation";

export type GetRotationByIdParams = {
    rotationId: string;
};

export type GetRotationByIdResponse = {
    code: 200;
    message: string;
    rotation: IFirestoreRotation;
};