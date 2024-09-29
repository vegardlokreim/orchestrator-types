import { FirestoreShift } from "../../firestoreTypes";
export type GetShiftsByDepartmentIdParams = {
    departmentId: string;
};
export type GetShiftsByDepartmentIdSuccess = {
    code: 200;
    message: string;
    shifts: FirestoreShift[];
};
