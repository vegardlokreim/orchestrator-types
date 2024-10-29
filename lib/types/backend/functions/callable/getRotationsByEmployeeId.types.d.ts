import { FirestoreUser, FirestoreRotation } from "../../firestoreTypes";
export type GetRotationsByUserIdParams = {
    userId: FirestoreUser["id"];
};
export type GetRotationsByUserIdResponse = {
    code: 200;
    message: string;
    rotations: FirestoreRotation[];
};
