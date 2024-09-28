import { FirestoreEmployee } from "../../firestoreTypes";
/**
 * Retrieves employee documents from Firestore based on an array of employee IDs.
 *
 * @param data - Object containing `employeeIds`, an array of strings representing employee IDs.
 * @returns An object with:
 *   - `code: 200`: Success status code.
 *   - `message: "Success"`: Success message.
 *   - `employees`: An array of employee documents.
 *
 * @Throws:
 * - `HttpsError("invalid-argument")` if `employeeIds` is missing or not all elements are strings.
 *
 * @Note: Can be used to retrieve a single employee by passing an array with one ID.
 */
export type GetEmployeesByIdsParams = {
    employeeIds: Array<FirestoreEmployee["id"]>;
};
export type GetEmployeesByIdsSuccess = {
    code: 200;
    message: string;
    employees: Array<FirestoreEmployee>;
};
