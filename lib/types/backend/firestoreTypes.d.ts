import { Timestamp } from "firebase-admin/firestore";
export type Weekday = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
export interface FirestoreShift {
    id: string;
    title: string;
    colorCode: string;
    duration: number;
    shortCode: string;
    allowedDays: Weekday[];
    departmentId: FirestoreDepartment["id"];
}
export interface Day {
    shift: FirestoreShift | null;
    tasks?: Array<FirestoreTask>;
    day: Weekday;
    weekdayNumber: number;
}
export interface Week {
    weekNumber: number;
    days: Array<Day>;
    hours?: number;
}
export type FirestoreUser = {
    id: string;
    name: string;
    email?: string;
    role?: string;
    departments: Array<FirestoreDepartment["id"]>;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    rotations?: FirestoreRotation[];
};
export interface FirestoreDepartment {
    id: string;
    name: string;
    users: Array<FirestoreUser["id"]>;
    organizationId: FirestoreOrganization["id"];
    createdAt: Timestamp;
    updatedAt: Timestamp;
    rotationIds?: Array<FirestoreDepartment["id"]>;
}
export interface FirestoreOrganization {
    name: string;
    id: string;
    departments: Array<FirestoreDepartment["id"]>;
    userIds: Array<FirestoreUser["id"]>;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}
export type FirestorePattern = {
    id: string;
    name: string;
    weeks: Array<Week>;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    updatedBy: FirestoreUser["id"];
    createdBy: FirestoreUser["id"];
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
    users: Array<{
        userId: FirestoreUser["id"];
        order: number;
    }>;
    userIds: Array<FirestoreUser["id"]>;
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
    updatedBy: FirestoreUser["id"];
    createdBy: FirestoreUser["id"];
};
export interface ShiftInstance {
    rotationId: FirestoreRotation["id"];
    weekNumber: number;
    day: Weekday;
    date: Date;
    shiftId: FirestoreShift["id"];
}
export type SwapStatus = "pending" | "accepted" | "declined" | "cancelled";
export type FirestoreShiftSwapProposal = {
    id: string;
    proposerId: FirestoreUser["id"];
    recipientId: FirestoreUser["id"];
    proposerShift: ShiftInstance;
    recipientShift: ShiftInstance;
    status: SwapStatus;
    proposedAt: Timestamp;
    respondedAt?: Timestamp;
    createdAt: Timestamp;
    message?: string;
};
