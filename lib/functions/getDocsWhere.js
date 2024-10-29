"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocsWhere = getDocsWhere;
const firestore_1 = require("firebase/firestore");
async function getDocsWhere(db, collectionName, whereClauses, dontThrow = true) {
    const collectionRef = (0, firestore_1.collection)(db, collectionName);
    let q = (0, firestore_1.query)(collectionRef);
    whereClauses.forEach(([field, op, value]) => {
        q = (0, firestore_1.query)(q, (0, firestore_1.where)(field, op, value));
    });
    try {
        const querySnapshot = await (0, firestore_1.getDocs)(q);
        if ((querySnapshot.empty && !dontThrow))
            throw new Error(`No documents found in collection ${collectionName} with the provided criteria`);
        return querySnapshot.docs.map((doc) => ({
            ref: doc,
            data: doc.data()
        }));
    }
    catch (error) {
        if (dontThrow) {
            console.warn(`Error fetching documents from collection ${collectionName}:`, error);
            return [];
        }
        throw error;
    }
}
//# sourceMappingURL=getDocsWhere.js.map