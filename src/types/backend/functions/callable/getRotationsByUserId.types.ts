import { IFirestoreRotation } from "../../FirestoreRotation";
import { FirestoreUser } from "../../firestoreTypes";

export type GetRotationsByUserIdParams = {
    userId: FirestoreUser["id"]
}
export type GetRotationsByUserIdResponse = {
    code: 200;
    message: string;
    rotations: IFirestoreRotation[];
};
