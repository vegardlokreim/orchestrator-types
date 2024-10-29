import React from "react";
import { WhereClause } from "../getDocsWhere";
import { Firestore } from "firebase/firestore";
import { FirestoreCollection } from "../../types/commonTypes";
interface UseFetchDocsWhereResult<T> {
    data: T[] | undefined;
    error: string | undefined;
    isLoading: boolean;
    refetch: () => Promise<T[] | null>;
}
export declare function useFetchDocsWhere<T>(db: Firestore, collectionName: FirestoreCollection, whereClauses: WhereClause<T>[], dependencies: any[], setData?: React.Dispatch<React.SetStateAction<T[] | undefined>>): UseFetchDocsWhereResult<T>;
export {};
