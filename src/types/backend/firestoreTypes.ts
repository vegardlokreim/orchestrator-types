import { Timestamp } from "firebase-admin/firestore";
import { USER_ROLES } from "./typeConsts";
import { FirestoreShift, IFirestoreRotation, Weekday } from "./FirestoreRotation";


export type FirestoreUserRole = {
    role: typeof USER_ROLES[number],
    department: FirestoreDepartment["id"]
    createdAt: Timestamp,
    updatedAt: Timestamp
}


export type FirestoreUser = {
    id: string
    firstName: string,
    lastName: string,
    fullName: string,
    email: string
    phone: string
    roles: Array<FirestoreUserRole>,
    departments?: Array<FirestoreDepartment["id"]>
    createdAt: Timestamp
    updatedAt: Timestamp
    rotations?: IFirestoreRotation[]
    rotationIds?: Array<IFirestoreRotation["id"]>
}

export interface FirestoreDepartment {
    id: string
    name: string
    users: Array<FirestoreUser["id"]>
    organizationId: FirestoreOrganization["id"]
    createdAt: Timestamp
    updatedAt: Timestamp
    rotationIds?: Array<FirestoreDepartment["id"]>
    departmentGroupIds?: Array<FirestoreDepartmentGroup["id"]>

}

export interface FirestoreOrganization {
    name: string
    id: string
    departments: Array<FirestoreDepartment["id"]>
    userIds: Array<FirestoreUser["id"]>
    createdAt: Timestamp
    updatedAt: Timestamp
}


// export type FirestorePattern = {
//     id: string
//     name: string
//     weeks: Array<Week>
//     createdAt: Timestamp,
//     updatedAt: Timestamp,
//     updatedBy: FirestoreUser["id"],
//     createdBy: FirestoreUser["id"], // Possibly irrelevant
//     departmentId: FirestoreDepartment["id"]
// }



export type FirestoreTask = {
    id: string,
    title: string,
    shortCode: string,
    colorCode: string,
    departmentId: FirestoreDepartment["id"],
    allowedDays: Array<Weekday>,

    duration?: number,

    details?: {
        isPreMidShift?: boolean,
        isPostMidShift?: boolean,
    }

    createdAt: Timestamp,
    updatedAt: Timestamp,
    updatedBy: FirestoreUser["id"]
    createdBy: FirestoreUser["id"]
}


export interface ShiftInstance {
    rotationId: IFirestoreRotation["id"]; // ID of the rotation
    weekNumber: number; // Week number in the rotation plan
    day: Weekday; // Day of the week
    date: Date; // Actual date of the shift
    shiftId: FirestoreShift["id"]; // ID of the shift
}


export type SwapStatus = "pending" | "accepted" | "declined" | "cancelled";


export type FirestoreShiftSwapProposal = {
    id: string;
    proposerId: FirestoreUser["id"]; // User proposing the swap
    recipientId: FirestoreUser["id"]; // User being asked to swap
    proposerShift: ShiftInstance; // FirestoreShift details of the proposer
    recipientShift: ShiftInstance; // FirestoreShift details of the recipient
    status: SwapStatus; // Current status of the swap proposal
    proposedAt: Timestamp; // Timestamp when the proposal was made
    respondedAt?: Timestamp; // Timestamp when the proposal was responded to
    createdAt: Timestamp;
    message?: string; // Optional message from the proposer
}



export type FirestoreDepartmentGroup = {
    id: string
    name: string
    department: FirestoreDepartment["id"]
    users: Array<FirestoreUser["id"]>

    createdAt: Timestamp
    updatedAt: Timestamp
}
