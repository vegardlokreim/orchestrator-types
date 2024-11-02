import React, { useEffect, useCallback, useState, Dispatch, SetStateAction } from "react";
import { getDocsWhere, WhereClause } from "../getDocsWhere";
import { Firestore } from "firebase/firestore";
import { FirestoreCollection } from "../../types/commonTypes";

interface UseFetchDocsWhereResult<T> {
    data: T[] | undefined;
    error: string | undefined;
    isLoading: boolean;
    refetch: () => Promise<T[] | null>;
}

export function useFetchDocsWhere<T>(
    db: Firestore,
    collectionName: FirestoreCollection,
    whereClauses: WhereClause<T>[],
    dependencies: any[],
    setData?: Dispatch<SetStateAction<T[] | undefined>>,
): UseFetchDocsWhereResult<T> {
    const [internalData, setInternalData] = useState<T[] | undefined>();
    const [internalError, setInternalError] = useState<string>();
    const [isLoading, setIsLoading] = useState(true);

    const fetchDocs = useCallback(async () => {
        setIsLoading(true);
        try {
            const docs = await getDocsWhere<T>(db, collectionName, whereClauses);
            const docData = docs.map(doc => doc.data);
            setInternalData(docData);
            setData?.(docData);
            setInternalError(undefined);
            return docs.map(doc => doc.data);
        } catch (err) {
            const errorMessage = `Error while fetching docs from collection ${collectionName} where ${JSON.stringify(whereClauses)}. Error: ${err}`;
            setInternalError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [db, collectionName, JSON.stringify(whereClauses), setData]);

    useEffect(() => {
        fetchDocs();
    }, [fetchDocs, ...dependencies]);

    return {
        data: internalData,
        error: internalError,
        isLoading,
        refetch: fetchDocs
    };
}