"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFetchDocsWhere = useFetchDocsWhere;
const react_1 = require("react");
const getDocsWhere_1 = require("../getDocsWhere");
function useFetchDocsWhere(db, collectionName, whereClauses, dependencies, setData) {
    const [internalData, setInternalData] = (0, react_1.useState)();
    const [internalError, setInternalError] = (0, react_1.useState)();
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const fetchDocs = (0, react_1.useCallback)(async () => {
        setIsLoading(true);
        try {
            const docs = await (0, getDocsWhere_1.getDocsWhere)(db, collectionName, whereClauses);
            const docData = docs.map(doc => doc.data);
            setInternalData(docData);
            setData === null || setData === void 0 ? void 0 : setData(docData);
            setInternalError(undefined);
            return docs.map(doc => doc.data);
        }
        catch (err) {
            const errorMessage = `Error while fetching docs from collection ${collectionName} where ${JSON.stringify(whereClauses)}. Error: ${err}`;
            setInternalError(errorMessage);
            throw err;
        }
        finally {
            setIsLoading(false);
        }
    }, [db, collectionName, JSON.stringify(whereClauses), setData]);
    (0, react_1.useEffect)(() => {
        fetchDocs();
    }, [fetchDocs, ...dependencies]);
    return {
        data: internalData,
        error: internalError,
        isLoading,
        refetch: fetchDocs
    };
}
//# sourceMappingURL=useFetchDocsWhere.js.map