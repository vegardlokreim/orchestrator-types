import { Timestamp } from 'firebase-admin/firestore';
import { WhereFilterOp, Firestore, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { Dispatch, SetStateAction } from 'react';

declare const firestoreCollections: readonly ["organizations", "users", "rotations", "patterns", "departments", "shifts", "tasks", "roles"];
declare const userStoragePath: readonly ["profilePicture", "driversLicense", "signatures", "contracts", "carPickupAgreements", "carDeliveryAgreements"];

type Subset<T> = {
    [A in keyof T]?: T[A] extends object ? Subset<T[A]> : T[A] extends object | null ? Subset<T[A]> | null : T[A] extends object | null | undefined ? Subset<T[A]> | null | undefined : T[A];
};
type FirestoreCollection = (typeof firestoreCollections)[number];
type UserStoragePath = (typeof userStoragePath)[number];

type HomePageProps = {
    id: string;
};

type Weekday = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
interface FirestoreShift {
    id: string;
    title: string;
    colorCode: string;
    duration: number;
    shortCode: string;
    allowedDays: Weekday[];
    departmentId: FirestoreDepartment["id"];
}
interface Day {
    shift: FirestoreShift | null;
    tasks?: Array<FirestoreTask>;
    day: Weekday;
    weekdayNumber: number;
}
interface Week {
    weekNumber: number;
    days: Array<Day>;
    hours?: number;
}
type FirestoreUser = {
    id: string;
    name: string;
    email?: string;
    role?: string;
    departments: Array<FirestoreDepartment["id"]>;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    rotations?: FirestoreRotation[];
};
interface FirestoreDepartment {
    id: string;
    name: string;
    users: Array<FirestoreUser["id"]>;
    organizationId: FirestoreOrganization["id"];
    createdAt: Timestamp;
    updatedAt: Timestamp;
    rotationIds?: Array<FirestoreDepartment["id"]>;
}
interface FirestoreOrganization {
    name: string;
    id: string;
    departments: Array<FirestoreDepartment["id"]>;
    userIds: Array<FirestoreUser["id"]>;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}
type FirestorePattern = {
    id: string;
    name: string;
    weeks: Array<Week>;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    updatedBy: FirestoreUser["id"];
    createdBy: FirestoreUser["id"];
    departmentId: FirestoreDepartment["id"];
};
type FirestoreRotation = {
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
type FirestoreTask = {
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
interface ShiftInstance {
    rotationId: FirestoreRotation["id"];
    weekNumber: number;
    day: Weekday;
    date: Date;
    shiftId: FirestoreShift["id"];
}
type SwapStatus = "pending" | "accepted" | "declined" | "cancelled";
type FirestoreShiftSwapProposal = {
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

/**
 * Retrieves User documents from Firestore based on an array of user IDs.
 *
 * @param data - Object containing `userIds`, an array of strings representing User IDs.
 * @returns An object with:
 *   - `code: 200`: Success status code.
 *   - `message: "Success"`: Success message.
 *   - `users`: An array of User documents.
 *
 * @Throws:
 * - `HttpsError("invalid-argument")` if `userIds` is missing or not all elements are strings.
 *
 * @Note: Can be used to retrieve a single user by passing an array with one ID.
 */
type GetUsersByIdsParams = {
    userIds: Array<FirestoreUser["id"]>;
};
type GetUsersByIdsResponse = {
    code: 200;
    message: string;
    users: Array<FirestoreUser>;
};

type GetUsersByDepartmentIdParams = {
    departmentId: FirestoreDepartment['id'];
};
type GetUsersByDepartmentIdResponse = {
    code: 200;
    message: string;
    users: Array<FirestoreUser>;
};

type GetUserInfoParams = {
    id: FirestoreUser["id"];
};
type GetUserInfoResponse = {
    code: number;
    message: string;
    user: FirestoreUser;
    departments: FirestoreDepartment[];
    organizations: FirestoreOrganization[];
};

type GetTasksByDepartmentIdParams = {
    departmentId: FirestoreDepartment["id"];
};
type GetTasksByDepartmentIdResponse = {
    code: 200;
    message: string;
    tasks: FirestoreTask[];
};

type GetShiftsByDepartmentIdParams = {
    departmentId: string;
};
type GetShiftsByDepartmentIdResponse = {
    code: 200;
    message: string;
    shifts: FirestoreShift[];
};

type GetRotationsByUserIdParams = {
    userId: FirestoreUser["id"];
};
type GetRotationsByUserIdResponse = {
    code: 200;
    message: string;
    rotations: FirestoreRotation[];
};

type GetRotationsByDepartmentIdParams = {
    departmentId: string;
};
type GetRotationsByDepartmentIdResponse = {
    code: 200;
    message: string;
    rotations: FirestoreRotation[];
};

type GetRotationByIdParams = {
    rotationId: string;
};
type GetRotationByIdResponse = {
    code: 200;
    message: string;
    rotation: FirestoreRotation;
};

type GetPatternsByUserIdParams = {
    userId: FirestoreUser['id'];
};
type GetPatternsByUserIdResponse = {
    code: 200;
    message: string;
    patterns: FirestorePattern[];
};

type GetPatternByIdParams = {
    patternId: FirestorePattern['id'];
};
type GetPatternByIdResponse = {
    code: 200;
    message: string;
    pattern: FirestorePattern;
};

type GetDepartmentsByOrganizationIdParams = {
    organizationId: FirestoreOrganization["id"];
};
type GetDepartmentsByOrganizationIdResponse = {
    code: 200;
    message: string;
    departments: Array<FirestoreDepartment>;
};

type CreateUserParams = Omit<FirestoreUser, "id" | "createdAt" | "updatedAt">;
type CreateUserResponse = {
    code: 201;
    message: string;
};

type CreateTaskParams = Omit<FirestoreTask, "id" | "createdAt" | "updatedAt" | "updatedBy">;
type CreateTaskResponse = {
    code: 201;
    message: string;
};

type CreateShiftParams = {
    title: string;
    duration: number;
    colorCode: string;
    shortCode: string;
    allowedDays: string[];
    departmentId: FirestoreDepartment['id'];
};
type CreateShiftResponse = {
    code: 201;
    message: string;
};

type CreateRotationParams = {
    name: string;
    pattern: {
        patternId: FirestorePattern["id"];
        weeks: number;
        rotationPlan: FirestorePattern["weeks"];
    };
    organizationId: FirestoreOrganization["id"];
    departmentId: FirestoreDepartment["id"];
    users: Array<{
        userId: FirestoreUser["id"];
        order: number;
    }>;
    startDate: Date;
};
type CreateRotationResponse = {
    code: 201;
    message: string;
};

type CreatePatternParams = {
    name: string;
    weeks: FirestorePattern["weeks"];
    departmentId: FirestoreDepartment["id"];
    createdBy: FirestoreUser["id"];
};
type CreatePatternResponse = {
    code: 201;
    message: string;
};

type CreateOrganizationParams = Omit<FirestoreOrganization, "departments" | "createdAt" | "updatedAt">;
type CreateOrganizationResponse = {
    code: 201;
    message: string;
};

type CreateDepartmentParams = Omit<FirestoreDepartment, "id" | "users" | "createdAt" | "updatedAt">;
type CreateDepartmentResponse = {
    code: 201;
    message: string;
};

type GetOrganizationsByUserIdParams = {
    userId: FirestoreUser['id'];
};
type GetOrganizationsByUserIdResponse = {
    code: 200;
    message: string;
    organizations: Array<FirestoreOrganization>;
};

type WhereFilterOpType<T> = T extends Array<infer _U> ? "array-contains" | "array-contains-any" | WhereFilterOp : WhereFilterOp;
type WhereClause<T> = {
    [K in keyof T]: [K, WhereFilterOpType<T[K]>, T[K] extends Array<infer U> ? U : T[K]];
}[keyof T];
type ReturnType<DocumentType> = Promise<{
    ref: QueryDocumentSnapshot<DocumentData, DocumentData>;
    data: DocumentType;
}[]>;
declare function getDocsWhere<DocumentType>(db: Firestore, collectionName: FirestoreCollection, whereClauses: WhereClause<DocumentType>[], dontThrow?: boolean): ReturnType<DocumentType>;

declare function timestampToDate(timestamp: Timestamp | undefined | null, throwError?: boolean): Date;

declare function formatDate(date: Date, locale: Intl.LocalesArgument, compress?: boolean): string;

declare function callFunction<P, R>(name: string, params?: P): Promise<R>;

declare function useScrollToTop(): void;

interface UseFetchDocsWhereResult<T> {
    data: T[] | undefined;
    error: string | undefined;
    isLoading: boolean;
    refetch: () => Promise<T[] | null>;
}
declare function useFetchDocsWhere<T>(db: Firestore, collectionName: FirestoreCollection, whereClauses: WhereClause<T>[], dependencies: any[], setData?: Dispatch<SetStateAction<T[] | undefined>>): UseFetchDocsWhereResult<T>;

interface UseFetchDocsResult<T> {
    data: T[] | undefined;
    error: string | undefined;
    isLoading: boolean;
    refetch: () => Promise<T[] | null>;
}
declare function useFetchDocs<T>(db: Firestore, collectionName: FirestoreCollection, setExternalData?: Dispatch<SetStateAction<T[]>> | Dispatch<SetStateAction<T[] | undefined>>): UseFetchDocsResult<T>;

interface UseFetchDocResult<T> {
    data: T | undefined;
    error: string | undefined;
    isLoading: boolean;
    refetch: () => Promise<T | null>;
}
declare function useFetchDoc<T>(db: Firestore, collectionName: FirestoreCollection, docId: string | undefined, setExternalData?: Dispatch<SetStateAction<T | undefined>>): UseFetchDocResult<T>;

export { type CreateDepartmentParams, type CreateDepartmentResponse, type CreateOrganizationParams, type CreateOrganizationResponse, type CreatePatternParams, type CreatePatternResponse, type CreateRotationParams, type CreateRotationResponse, type CreateShiftParams, type CreateShiftResponse, type CreateTaskParams, type CreateTaskResponse, type CreateUserParams, type CreateUserResponse, type Day, type FirestoreCollection, type FirestoreDepartment, type FirestoreOrganization, type FirestorePattern, type FirestoreRotation, type FirestoreShift, type FirestoreShiftSwapProposal, type FirestoreTask, type FirestoreUser, type GetDepartmentsByOrganizationIdParams, type GetDepartmentsByOrganizationIdResponse, type GetOrganizationsByUserIdParams, type GetOrganizationsByUserIdResponse, type GetPatternByIdParams, type GetPatternByIdResponse, type GetPatternsByUserIdParams, type GetPatternsByUserIdResponse, type GetRotationByIdParams, type GetRotationByIdResponse, type GetRotationsByDepartmentIdParams, type GetRotationsByDepartmentIdResponse, type GetRotationsByUserIdParams, type GetRotationsByUserIdResponse, type GetShiftsByDepartmentIdParams, type GetShiftsByDepartmentIdResponse, type GetTasksByDepartmentIdParams, type GetTasksByDepartmentIdResponse, type GetUserInfoParams, type GetUserInfoResponse, type GetUsersByDepartmentIdParams, type GetUsersByDepartmentIdResponse, type GetUsersByIdsParams, type GetUsersByIdsResponse, type HomePageProps, type ShiftInstance, type Subset, type SwapStatus, type UserStoragePath, type Week, type Weekday, type WhereClause, type WhereFilterOpType, callFunction, firestoreCollections, formatDate, getDocsWhere, timestampToDate, useFetchDoc, useFetchDocs, useFetchDocsWhere, useScrollToTop, userStoragePath };
