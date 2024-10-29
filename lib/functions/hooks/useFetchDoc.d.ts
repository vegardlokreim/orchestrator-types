import { Firestore } from "firebase/firestore";
import { FirestoreCollection } from "../../types/commonTypes";
interface UseFetchDocResult<T> {
    data: T | undefined;
    error: string | undefined;
    isLoading: boolean;
    refetch: () => Promise<T | null>;
}
export declare function useFetchDoc<T>(db: Firestore, collectionName: FirestoreCollection, docId: string | undefined, setExternalData?: React.Dispatch<React.SetStateAction<T | undefined>>): UseFetchDocResult<T>;
export {};
