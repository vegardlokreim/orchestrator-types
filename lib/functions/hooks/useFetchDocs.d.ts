import { Firestore } from "firebase/firestore";
import { FirestoreCollection } from "../../types/commonTypes";
interface UseFetchDocsResult<T> {
    data: T[] | undefined;
    error: string | undefined;
    isLoading: boolean;
    refetch: () => Promise<T[] | null>;
}
export declare function useFetchDocs<T>(db: Firestore, collectionName: FirestoreCollection, setExternalData?: React.Dispatch<React.SetStateAction<T[]>> | React.Dispatch<React.SetStateAction<T[] | undefined>>): UseFetchDocsResult<T>;
export {};
