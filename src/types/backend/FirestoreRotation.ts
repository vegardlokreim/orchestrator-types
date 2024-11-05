import { FirestoreDepartment, FirestoreGroup, FirestoreTask, FirestoreUser, Weekday } from "./firestoreTypes";


// RotationBuilderState types
export interface RotationBuilderState {

    currentStep: 1 | 2 | 3 | 4

    basicInfo: {
        name: string
        startDate: string | Date
        departmentId: FirestoreDepartment["id"]
        groupId?: FirestoreGroup["id"]
    } | null
    users: Array<AssignedUser>
    weekPatterns: Array<WeekPattern>
}

export interface AssignedUser {
    userId: FirestoreUser["id"] | null;
    fullName: string | null;
    firstName: string | null;
    lastname: string | null;
    startWeek: number;
}

export interface DaySchedule {
    shiftId: string | null;
    taskIds: Array<FirestoreTask['id']>
}

export interface WeekPattern {
    patternId: number;
    days: Record<Weekday, DaySchedule>;
}