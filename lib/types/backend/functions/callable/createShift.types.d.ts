import { FirestoreDepartment } from "../../firestoreTypes";
export type CreateShiftParams = {
    title: string;
    duration: number;
    colorCode: string;
    shortCode: string;
    allowedDays: string[];
    departmentId: FirestoreDepartment['id'];
};
export type CreateShiftSuccess = {
    code: 201;
    message: string;
};
