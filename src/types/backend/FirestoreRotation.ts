import {
    FirestoreDepartment,
    FirestoreDepartmentGroup,
    FirestoreRotation,
    FirestoreTask,
    FirestoreUser,
    Weekday
} from "./firestoreTypes";


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

export interface RotationBuilderState {
    currentStep: 1 | 2 | 3 | 4;
    basicInfo: {
        name: string;
        startDate: string | Date;
        departmentId: FirestoreDepartment["id"];
        groupId?: FirestoreDepartmentGroup["id"];
    } | null;
    offset: number;
    users: Array<AssignedUser>;
    weekPatterns: Array<WeekPattern>;
    replaces: FirestoreRotation | null;
}
