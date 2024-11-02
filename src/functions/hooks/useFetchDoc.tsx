import { useEffect, useCallback, useState, Dispatch, SetStateAction } from "react";
import { doc, Firestore, getDoc } from "firebase/firestore";
import { FirestoreCollection } from "../../types/commonTypes";

interface UseFetchDocResult<T> {
    data: T | undefined;
    error: string | undefined;
    isLoading: boolean;
    refetch: () => Promise<T | null>;
}

export function useFetchDoc<T>(
    db: Firestore,
    collectionName: FirestoreCollection,
    docId: string | undefined,
    setExternalData?: Dispatch<SetStateAction<T | undefined>>,
): UseFetchDocResult<T> {
    const [internalData, setInternalData] = useState<T>();
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState(true);

    const fetchDocData = useCallback(async () => {
        setIsLoading(true);
        setError(undefined);

        try {
            if (!docId) {
                setInternalData(undefined);
                setExternalData?.(undefined);
                return null;
            }

            const docRef = doc(db, collectionName, docId);
            const docSnapshot = await getDoc(docRef);

            if (docSnapshot.exists()) {
                const newData = {
                    id: docSnapshot.id,
                    ...docSnapshot.data()
                } as T;

                setInternalData(newData);
                setExternalData?.(newData);
                return newData;
            } else {
                setInternalData(undefined);
                setExternalData?.(undefined);
                setError(`Document with ID ${docId} not found in ${collectionName}`);
                return null;
            }
        } catch (err) {
            setInternalData(undefined);
            setExternalData?.(undefined);
            setError(`Error fetching document: ${err}`);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [db, collectionName, docId, setExternalData]);

    useEffect(() => {
        fetchDocData();
    }, [fetchDocData]);

    return {
        data: internalData,
        error,
        isLoading,
        refetch: fetchDocData,
    };
}