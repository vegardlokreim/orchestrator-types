import { Timestamp } from "firebase-admin/firestore";
export type Weekday = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
export interface Shift {
    id: string;
    title: string;
    colorCode: string;
    duration: number;
    shortCode: string;
    allowedDays: Weekday[];
}
export interface Day {
    shift: Shift | null;
    tasks?: string[];
    day: Weekday;
    weekdayNumber: number;
}
export interface Week {
    weekNumber: number;
    days: Array<Day>;
}
export type FirestoreEmployee = {
    id: string;
    name: string;
    email?: string;
    role?: string;
    departments: Array<{
        departmentId: FirestoreDepartment["id"];
        departmentName: FirestoreDepartment["name"];
    }>;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    rotations?: FirestoreRotation[];
};
export interface FirestoreDepartment {
    id: string;
    name: string;
    employees: Array<FirestoreEmployee["id"]>;
    organizationId: FirestoreOrganization["id"];
    createdAt: Timestamp;
    updatedAt: Timestamp;
    rotationIds?: Array<FirestoreDepartment["id"]>;
}
export interface FirestoreOrganization {
    name: string;
    id: string;
    departments: Array<FirestoreDepartment["id"]>;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}
export type FirestorePattern = {
    id: string;
    name: string;
    weeks: Array<Week>;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    updatedBy: FirestoreEmployee["id"];
    createdBy: FirestoreEmployee["id"];
    departmentId: FirestoreDepartment["id"];
};
export type FirestoreRotation = {
    id: string;
    name: string;
    departmentId: FirestoreDepartment["id"];
    organizationId: FirestoreOrganization["id"];
    pattern: {
        patternId: FirestorePattern["id"];
        weeks: number;
        rotationPlan: Array<Week>;
    };
    employees: Array<{
        employeeId: FirestoreEmployee["id"];
        order: number;
    }>;
    employeeIds: Array<FirestoreEmployee["id"]>;
    startDate: Timestamp;
    startOnRotationWeek?: number;
};
export type FirestoreTask = {
    id: string;
    title: string;
    shortCode: string;
    colorCode: string;
    departmentId: FirestoreDepartment["id"];
    allowedDays: Array<Weekday>;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    updatedBy: FirestoreEmployee["id"];
    createdBy: FirestoreEmployee["id"];
};
export interface ShiftInstance {
    rotationId: FirestoreRotation["id"];
    weekNumber: number;
    day: Weekday;
    date: Date;
    shiftId: Shift["id"];
}
export type SwapStatus = "pending" | "accepted" | "declined" | "cancelled";
export type FirestoreShiftSwapProposal = {
    id: string;
    proposerId: FirestoreEmployee["id"];
    recipientId: FirestoreEmployee["id"];
    proposerShift: ShiftInstance;
    recipientShift: ShiftInstance;
    status: SwapStatus;
    proposedAt: Timestamp;
    respondedAt?: Timestamp;
    createdAt: Timestamp;
    message?: string;
};
//# sourceMappingURL=firestoreTypes.d.ts.map