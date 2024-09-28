import { FirestorePattern } from "../../firestoreTypes";

export type GetPatternByIdParams = {
    patternId: FirestorePattern['id'];
}

export type GetPatternByIdSuccess = {
    code: 200;
    message: string;
    pattern: FirebaseFirestore.DocumentData | undefined;
};