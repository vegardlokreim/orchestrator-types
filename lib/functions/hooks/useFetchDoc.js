"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFetchDoc = useFetchDoc;
const react_1 = require("react");
const firestore_1 = require("firebase/firestore");
function useFetchDoc(db, collectionName, docId, setExternalData) {
    const [internalData, setInternalData] = (0, react_1.useState)();
    const [error, setError] = (0, react_1.useState)();
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const fetchDocData = (0, react_1.useCallback)(async () => {
        setIsLoading(true);
        setError(undefined);
        try {
            if (!docId) {
                setInternalData(undefined);
                setExternalData === null || setExternalData === void 0 ? void 0 : setExternalData(undefined);
                return null;
            }
            const docRef = (0, firestore_1.doc)(db, collectionName, docId);
            const docSnapshot = await (0, firestore_1.getDoc)(docRef);
            if (docSnapshot.exists()) {
                const newData = Object.assign({ id: docSnapshot.id }, docSnapshot.data());
                setInternalData(newData);
                setExternalData === null || setExternalData === void 0 ? void 0 : setExternalData(newData);
                return newData;
            }
            else {
                setInternalData(undefined);
                setExternalData === null || setExternalData === void 0 ? void 0 : setExternalData(undefined);
                setError(`Document with ID ${docId} not found in ${collectionName}`);
                return null;
            }
        }
        catch (err) {
            setInternalData(undefined);
            setExternalData === null || setExternalData === void 0 ? void 0 : setExternalData(undefined);
            setError(`Error fetching document: ${err}`);
            throw err;
        }
        finally {
            setIsLoading(false);
        }
    }, [db, collectionName, docId, setExternalData]);
    (0, react_1.useEffect)(() => {
        fetchDocData();
    }, [fetchDocData]);
    return {
        data: internalData,
        error,
        isLoading,
        refetch: fetchDocData,
    };
}
//# sourceMappingURL=useFetchDoc.js.map