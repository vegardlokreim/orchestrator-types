import { FirestorePattern } from "../../firestoreTypes";

export type GetPatternByIdParams = {
    patternId: FirestorePattern['id'];
}

export type GetPatternByIdResponse = {
    code: 200;
    message: string;
    pattern: FirestorePattern;
};
