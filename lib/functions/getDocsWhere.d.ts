import { DocumentData, Firestore, QueryDocumentSnapshot, WhereFilterOp } from 'firebase/firestore';
import { FirestoreCollection } from '../types/commonTypes';
export type WhereFilterOpType<T> = T extends Array<infer _U> ? "array-contains" | "array-contains-any" | WhereFilterOp : WhereFilterOp;
export type WhereClause<T> = {
    [K in keyof T]: [K, WhereFilterOpType<T[K]>, T[K] extends Array<infer U> ? U : T[K]];
}[keyof T];
type ReturnType<DocumentType> = Promise<{
    ref: QueryDocumentSnapshot<DocumentData, DocumentData>;
    data: DocumentType;
}[]>;
export declare function getDocsWhere<DocumentType>(db: Firestore, collectionName: FirestoreCollection, whereClauses: WhereClause<DocumentType>[], dontThrow?: boolean): ReturnType<DocumentType>;
export {};
