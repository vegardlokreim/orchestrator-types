// src/functions/getDocsWhere.ts
import { collection, getDocs, query, where } from "firebase/firestore";
async function getDocsWhere(db, collectionName, whereClauses, dontThrow = true) {
  const collectionRef = collection(db, collectionName);
  let q = query(collectionRef);
  whereClauses.forEach(([field, op, value]) => {
    q = query(q, where(field, op, value));
  });
  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty && !dontThrow) throw new Error(`No documents found in collection ${collectionName} with the provided criteria`);
    return querySnapshot.docs.map((doc2) => ({
      ref: doc2,
      data: doc2.data()
    }));
  } catch (error) {
    if (dontThrow) {
      console.warn(`Error fetching documents from collection ${collectionName}:`, error);
      return [];
    }
    throw error;
  }
}

// src/functions/timestampToDate.ts
function timestampToDate(timestamp, throwError = false) {
  if (!timestamp) {
    if (!throwError) return /* @__PURE__ */ new Date(0);
    throw new Error("Timestamp is undefined");
  }
  return new Date(timestamp.seconds * 1e3 + timestamp.nanoseconds / 1e6);
}

// src/functions/formatDate.ts
function formatDate(date, locale, compress = false) {
  const options = { year: compress ? "2-digit" : "numeric", month: compress ? "numeric" : "short", day: "2-digit", hour: "numeric", minute: "numeric" };
  return date.toLocaleDateString(locale, options);
}

// src/functions/callFunction.ts
import { getFunctions, httpsCallable } from "firebase/functions";
async function callFunction(name, params) {
  const functions = getFunctions();
  const func = httpsCallable(functions, name);
  const response = params ? await func(params) : await func();
  return response.data;
}

// src/functions/hooks/useScrollToTop.tsx
import { useEffect } from "react";
function useScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
}

// src/functions/hooks/useFetchDocsWhere.tsx
import { useEffect as useEffect2, useCallback, useState } from "react";
function useFetchDocsWhere(db, collectionName, whereClauses, dependencies, setData) {
  const [internalData, setInternalData] = useState();
  const [internalError, setInternalError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const fetchDocs = useCallback(async () => {
    setIsLoading(true);
    try {
      const docs = await getDocsWhere(db, collectionName, whereClauses);
      const docData = docs.map((doc2) => doc2.data);
      setInternalData(docData);
      setData == null ? void 0 : setData(docData);
      setInternalError(void 0);
      return docs.map((doc2) => doc2.data);
    } catch (err) {
      const errorMessage = `Error while fetching docs from collection ${collectionName} where ${JSON.stringify(whereClauses)}. Error: ${err}`;
      setInternalError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [db, collectionName, JSON.stringify(whereClauses), setData]);
  useEffect2(() => {
    fetchDocs();
  }, [fetchDocs, ...dependencies]);
  return {
    data: internalData,
    error: internalError,
    isLoading,
    refetch: fetchDocs
  };
}

// src/functions/hooks/useFetchDocs.tsx
import { useEffect as useEffect3, useCallback as useCallback2, useState as useState2 } from "react";
import { collection as collection2, getDocs as getDocs2, query as query2 } from "firebase/firestore";
function useFetchDocs(db, collectionName, setExternalData) {
  const [internalData, setInternalData] = useState2();
  const [error, setError] = useState2();
  const [isLoading, setIsLoading] = useState2(true);
  const fetchDocs = useCallback2(async () => {
    setIsLoading(true);
    setError(void 0);
    try {
      const collectionRef = collection2(db, collectionName);
      const queryRef = query2(collectionRef);
      const snapshot = await getDocs2(queryRef);
      if (!snapshot.empty) {
        const newData = snapshot.docs.map((doc2) => ({
          id: doc2.id,
          ...doc2.data()
        }));
        setInternalData(newData);
        setExternalData == null ? void 0 : setExternalData(newData);
        return newData;
      } else {
        const newData = [];
        setInternalData(newData);
        setExternalData == null ? void 0 : setExternalData(newData);
        setError(`No documents found in ${collectionName}`);
        return null;
      }
    } catch (err) {
      const newData = [];
      setInternalData(newData);
      setExternalData == null ? void 0 : setExternalData(newData);
      setError(`Error fetching documents: ${err}`);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [db, collectionName, setExternalData]);
  useEffect3(() => {
    fetchDocs();
  }, [fetchDocs]);
  return {
    data: internalData,
    error,
    isLoading,
    refetch: fetchDocs
  };
}

// src/functions/hooks/useFetchDoc.tsx
import { useEffect as useEffect4, useCallback as useCallback3, useState as useState3 } from "react";
import { doc, getDoc } from "firebase/firestore";
function useFetchDoc(db, collectionName, docId, setExternalData) {
  const [internalData, setInternalData] = useState3();
  const [error, setError] = useState3();
  const [isLoading, setIsLoading] = useState3(true);
  const fetchDocData = useCallback3(async () => {
    setIsLoading(true);
    setError(void 0);
    try {
      if (!docId) {
        setInternalData(void 0);
        setExternalData == null ? void 0 : setExternalData(void 0);
        return null;
      }
      const docRef = doc(db, collectionName, docId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const newData = {
          id: docSnapshot.id,
          ...docSnapshot.data()
        };
        setInternalData(newData);
        setExternalData == null ? void 0 : setExternalData(newData);
        return newData;
      } else {
        setInternalData(void 0);
        setExternalData == null ? void 0 : setExternalData(void 0);
        setError(`Document with ID ${docId} not found in ${collectionName}`);
        return null;
      }
    } catch (err) {
      setInternalData(void 0);
      setExternalData == null ? void 0 : setExternalData(void 0);
      setError(`Error fetching document: ${err}`);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [db, collectionName, docId, setExternalData]);
  useEffect4(() => {
    fetchDocData();
  }, [fetchDocData]);
  return {
    data: internalData,
    error,
    isLoading,
    refetch: fetchDocData
  };
}

// src/types/typeConsts.ts
var firestoreCollections = [
  "organizations",
  "users",
  "rotations",
  "patterns",
  "departments",
  "shifts",
  "tasks",
  "roles"
];
var userStoragePath = [
  "profilePicture",
  "driversLicense",
  "signatures",
  "contracts",
  "carPickupAgreements",
  "carDeliveryAgreements"
];
export {
  callFunction,
  firestoreCollections,
  formatDate,
  getDocsWhere,
  timestampToDate,
  useFetchDoc,
  useFetchDocs,
  useFetchDocsWhere,
  useScrollToTop,
  userStoragePath
};
