import { Timestamp } from "firebase-admin/firestore";

export function timestampToDate( timestamp: Timestamp | undefined | null, throwError = false ): Date {
    if (!timestamp) {
        if (!throwError) return new Date( 0 );
        throw new Error( "Timestamp is undefined" );
    }
    return new Date( timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000 );
}