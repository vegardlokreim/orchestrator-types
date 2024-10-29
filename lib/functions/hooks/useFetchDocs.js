"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFetchDocs = useFetchDocs;
const react_1 = require("react");
const firestore_1 = require("firebase/firestore");
function useFetchDocs(db, collectionName, setExternalData) {
    const [internalData, setInternalData] = (0, react_1.useState)();
    const [error, setError] = (0, react_1.useState)();
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const fetchDocs = (0, react_1.useCallback)(async () => {
        setIsLoading(true);
        setError(undefined);
        try {
            const collectionRef = (0, firestore_1.collection)(db, collectionName);
            const queryRef = (0, firestore_1.query)(collectionRef);
            const snapshot = await (0, firestore_1.getDocs)(queryRef);
            if (!snapshot.empty) {
                const newData = snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
                setInternalData(newData);
                setExternalData === null || setExternalData === void 0 ? void 0 : setExternalData(newData);
                return newData;
            }
            else {
                const newData = [];
                setInternalData(newData);
                setExternalData === null || setExternalData === void 0 ? void 0 : setExternalData(newData);
                setError(`No documents found in ${collectionName}`);
                return null;
            }
        }
        catch (err) {
            const newData = [];
            setInternalData(newData);
            setExternalData === null || setExternalData === void 0 ? void 0 : setExternalData(newData);
            setError(`Error fetching documents: ${err}`);
            throw err;
        }
        finally {
            setIsLoading(false);
        }
    }, [db, collectionName, setExternalData]);
    (0, react_1.useEffect)(() => {
        fetchDocs();
    }, [fetchDocs]);
    return {
        data: internalData,
        error,
        isLoading,
        refetch: fetchDocs,
    };
}
//# sourceMappingURL=useFetchDocs.js.map