import { collection, DocumentData, Firestore, getDocs, query, QueryDocumentSnapshot, where, WhereFilterOp } from 'firebase/firestore';
import { FirestoreCollection } from '../types/commonTypes';

export type WhereFilterOpType<T> = T extends Array<infer _U> ? "array-contains" | "array-contains-any" | WhereFilterOp : WhereFilterOp;

// Adjusting WhereClause to handle values for array types (like employeeId within employeeIds array)
export type WhereClause<T> = { [K in keyof T]: [K, WhereFilterOpType<T[K]>, T[K] extends Array<infer U> ? U : T[K]]; }[keyof T];

type ReturnType<DocumentType> = Promise<{ ref: QueryDocumentSnapshot<DocumentData, DocumentData>; data: DocumentType }[]>


export async function getDocsWhere<DocumentType>(db: Firestore, collectionName: FirestoreCollection, whereClauses: WhereClause<DocumentType>[], dontThrow = true): ReturnType<DocumentType> {
    const collectionRef = collection(db, collectionName);

    let q = query(collectionRef);

    whereClauses.forEach(([field, op, value]) => {
        q = query(q, where(field as string, op, value));
    });


    try {
        const querySnapshot = await getDocs(q);

        if ((querySnapshot.empty && !dontThrow)) throw new Error(`No documents found in collection ${collectionName} with the provided criteria`);

        return querySnapshot.docs.map((doc) => ({
            ref: doc,
            data: doc.data() as DocumentType
        }));

    } catch (error) {
        if (dontThrow) {
            console.warn(`Error fetching documents from collection ${collectionName}:`, error);
            return [];
        }
        throw error;
    }
}