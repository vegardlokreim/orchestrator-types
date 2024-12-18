import { FirestoreShift } from "../../FirestoreRotation";


export type GetShiftsByDepartmentIdParams = {
    departmentId: string;
};

export type GetShiftsByDepartmentIdResponse = {
    code: 200;
    message: string;
    shifts: FirestoreShift[];
};