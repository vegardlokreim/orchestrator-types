import { FirestorePattern } from "../../firestoreTypes";
export type GetPatternByIdParams = {
    patternId: FirestorePattern['id'];
};
export type GetPatternByIdResponses = {
    code: 200;
    message: string;
    pattern: FirestorePattern;
};
