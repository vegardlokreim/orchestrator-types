import { Timestamp } from "firebase-admin/firestore";
import {
    FirestoreDepartment,
    FirestoreDepartmentGroup,
    FirestoreTask,
    FirestoreUser,
} from "./firestoreTypes";


export type Weekday = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday"


// export type FirestoreTask = {
//     id: string,
//     title: string,
//     shortCode: string,
//     colorCode: string,
//     departmentId: FirestoreDepartment["id"],
//     allowedDays: Array<Weekday>,

//     duration?: number,

//     details?: {
//         isPreMidShift?: boolean,
//         isPostMidShift?: boolean,
//     }

//     createdAt: Timestamp,
//     updatedAt: Timestamp,
//     updatedBy: FirestoreUser["id"]
//     createdBy: FirestoreUser["id"]
// }

export interface FirestoreShift {
    id: string;
    title: string;
    colorCode: string
    duration: number,
    shortCode: string,
    allowedDays: Weekday[],
    departmentId: FirestoreDepartment["id"]
}

// export interface Day {
//     shift: FirestoreShift | null,
//     tasks?: Array<FirestoreTask>
//     day: Weekday,
//     weekdayNumber: number
// }

// export interface Week {
//     weekNumber: number, // weekNumber in rotation, not calendar
//     days: Array<Day>,
//     hours?: number
// }


// export interface AssignedUser {
//     userId: FirestoreUser["id"] | null;
//     fullName: string | null;
//     firstName: string | null;
//     lastname: string | null;
//     startWeek: number;
// }

// export interface DaySchedule {
//     shiftId: string | null;
//     taskIds: Array<FirestoreTask['id']>
// }

// export interface WeekPattern {
//     patternId: number;
//     days: Record<Weekday, DaySchedule>;
// }



export interface IRotationUser {
    userId: string;
    fullName: string;
    firstName: string;
    lastName: string;
    startWeek: number;
}

export interface IRotationDay {
    day: Weekday;
    shiftId: FirestoreShift["id"] | null;
    taskIds: FirestoreTask["id"][];
}

export interface IRotationWeek {
    rotationWeek: number;
    days: Record<Weekday, IRotationDay>;
}


export interface IFirestoreRotation {
    id: string;
    name: string;

    departmentId: string;
    departmentName: string;

    users: IRotationUser[];
    weeks: IRotationWeek[];

    replaces: IFirestoreRotation["id"] | null

    updatedAt: Timestamp;
    createdAt: Timestamp;
    createdBy: FirestoreUser["id"];

    groupId: FirestoreDepartmentGroup["id"] | null;

    replaced: {
        replacedBy: IFirestoreRotation["id"];
        replacedAt: Timestamp;
    } | null;

    startDate: Timestamp;
    endDate: Timestamp | null;

    startDateNumbers: {
        day: number;
        month: number;
        year: number;
    }

    endDateNumbers: {
        day: number;
        month: number;
        year: number;
    } | null;

    userIds: FirestoreUser["id"][];
    shiftIds: FirestoreShift["id"][];
    taskIds: FirestoreTask["id"][];


}



