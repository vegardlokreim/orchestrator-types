import { Timestamp } from 'firebase-admin/firestore';
import { WhereFilterOp, Firestore, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { Dispatch, SetStateAction } from 'react';

declare const firestoreCollections: readonly ["organizations", "users", "rotations", "patterns", "departments", "shifts", "tasks", "roles", "departmentGroups", "shiftSwapProposals", "shiftSwaps"];
declare const userStoragePath: readonly ["profilePicture", "driversLicense", "signatures", "contracts", "carPickupAgreements", "carDeliveryAgreements"];

/**
 * A recursive type that makes all properties of a given type `T` optional.
 *
 * This type differs from `Partial<T>` in that it goes deeper into nested objects,
 * making every property at every level optional.
 *
 * @template T - The type to be transformed into a subset with every property optional.
 */
type Subset<T> = {
    [A in keyof T]?: T[A] extends object ? Subset<T[A]> : T[A] extends object | null ? Subset<T[A]> | null : T[A] extends object | null | undefined ? Subset<T[A]> | null | undefined : T[A];
};
/**
 * A recursive type that makes all properties of a given type `T` required.
 *
 * This type differs from `Required<T>` in that it goes deeper into nested objects,
 * making every property at every level required.
 *
 * Note that null is still allowed
 *
 * @template T - The type to be transformed into a subset with every property required.
 */
type DeepRequired<T> = {
    [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P] extends object | null ? DeepRequired<T[P]> : T[P] extends object | null | undefined ? DeepRequired<T[P]> : T[P];
};
/**
 * A recursive type that makes all properties of a given type `T` required and non-nullable.
 *
 * This type differs from `Required<T>` in that it goes deeper into nested objects,
 * making every property at every level required and non-nullable.
 *
 * @template T - The type to be transformed into a subset with every property required.
 */
type DeepRequiredNonNull<T, K extends keyof T = keyof T> = {
    [P in K]-?: T[P] extends object ? DeepRequiredNonNull<NonNullable<T[P]>> : NonNullable<T[P]>;
} & {
    [P in Exclude<keyof T, K>]: T[P] extends object ? T[P] extends null | undefined ? never : DeepRequiredNonNull<T[P]> : NonNullable<T[P]>;
};
type FirestoreCollection = (typeof firestoreCollections)[number];
type UserStoragePath = (typeof userStoragePath)[number];

type HomePageProps = {
    id: string;
};

declare const USER_ROLES: readonly ["ADMIN", "DEPARTMENT_MANAGER", "OVERLEGE", "LIS1", "LIS2", "LIS3"];

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
interface RotationBuilderState {
    currentStep: 1 | 2 | 3 | 4;
    name: string;
    startDate: Date;
    departmentId: FirestoreDepartment["id"];
    groupId?: FirestoreDepartmentGroup["id"];
    offset: number;
    users: {
        userId: string | null;
        fullName: string | null;
        startWeek: number | null;
    }[];
    weeks: Record<number, IRotationWeek>;
    replaces: IFirestoreRotation | null;
}
interface IRotationUser {
    userId: string;
    fullName: string;
    startWeek: number;
}
interface IRotationDay {
    day: Weekday;
    shiftId: FirestoreShift["id"] | null;
    taskIds: FirestoreTask["id"][];
}
interface IRotationWeek {
    rotationWeek: number;
    days: Record<Weekday, IRotationDay>;
}
interface IFirestoreRotation {
    id: string;
    name: string;
    departmentId: string;
    departmentName: string;
    startDate: Timestamp;
    isDeprecated: boolean;
    users: IRotationUser[];
    weeks: Record<number, IRotationWeek>;
    replaces?: IFirestoreRotation["id"];
    updatedAt: Timestamp;
    createdAt: Timestamp;
    createdBy: FirestoreUser["id"];
    userIds: FirestoreUser["id"][];
    replacedBy?: IFirestoreRotation["id"];
    startDateString: string;
}

type FirestoreUserRole = {
    role: typeof USER_ROLES[number];
    department: FirestoreDepartment["id"];
    createdAt: Timestamp;
    updatedAt: Timestamp;
};
type FirestoreUser = {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    phone: string;
    roles: Array<FirestoreUserRole>;
    departments?: Array<FirestoreDepartment["id"]>;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    rotations?: IFirestoreRotation[];
    rotationIds?: Array<IFirestoreRotation["id"]>;
};
interface FirestoreDepartment {
    id: string;
    name: string;
    users: Array<FirestoreUser["id"]>;
    organizationId: FirestoreOrganization["id"];
    createdAt: Timestamp;
    updatedAt: Timestamp;
    rotationIds?: Array<FirestoreDepartment["id"]>;
    departmentGroupIds?: Array<FirestoreDepartmentGroup["id"]>;
}
interface FirestoreOrganization {
    name: string;
    id: string;
    departments: Array<FirestoreDepartment["id"]>;
    userIds: Array<FirestoreUser["id"]>;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}
type FirestoreTask = {
    id: string;
    title: string;
    shortCode: string;
    colorCode: string;
    departmentId: FirestoreDepartment["id"];
    allowedDays: Array<Weekday>;
    duration?: number;
    details?: {
        isPreMidShift?: boolean;
        isPostMidShift?: boolean;
    };
    createdAt: Timestamp;
    updatedAt: Timestamp;
    updatedBy: FirestoreUser["id"];
    createdBy: FirestoreUser["id"];
};
interface ShiftInstance {
    rotationId: IFirestoreRotation["id"];
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
type FirestoreDepartmentGroup = {
    id: string;
    name: string;
    department: FirestoreDepartment["id"];
    users: Array<FirestoreUser["id"]>;
    createdAt: Timestamp;
    updatedAt: Timestamp;
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
    rotations: IFirestoreRotation[];
};

type GetRotationsByDepartmentIdParams = {
    departmentId: string;
};
type GetRotationsByDepartmentIdResponse = {
    code: 200;
    message: string;
    rotations: IFirestoreRotation[];
};

type GetRotationByIdParams = {
    rotationId: string;
};
type GetRotationByIdResponse = {
    code: 200;
    message: string;
    rotation: IFirestoreRotation;
};

type GetDepartmentsByOrganizationIdParams = {
    organizationId: FirestoreOrganization["id"];
};
type GetDepartmentsByOrganizationIdResponse = {
    code: 200;
    message: string;
    departments: Array<FirestoreDepartment>;
};

type CreateUserParams = Omit<FirestoreUser, "id" | "fullName" | "createdAt" | "updatedAt">;
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

interface RotationPatternDay {
    shiftId: string;
    taskIds: string[];
}
type CreateRotationParams = Omit<IFirestoreRotation, "id" | "createdAt" | "updatedAt" | "createdBy" | "userIds" | "startDate" | "startDateString"> & {
    startDate: Date;
};
interface CreateRotationResponse {
    code: 201;
    message: "Rotation created successfully";
}

type CreateOrganizationParams = Omit<FirestoreOrganization, "departments" | "createdAt" | "updatedAt">;
type CreateOrganizationResponse = {
    code: 201;
    message: string;
};

type CreateDepartmentGroupParams = Omit<FirestoreDepartmentGroup, "id" | "createdAt" | "updatedAt">;
type CreateDepartmentGroupResponse = {
    code: 201 | 400 | 500;
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

declare const getStartWeek: (userId: string, rotation: IFirestoreRotation) => number | null;
declare const getRotationWeekNumberAtDate: (userId: string, rotation: IFirestoreRotation, date: Date) => number | null;
declare const getRotationWeekAtDate: (userId: string, rotation: IFirestoreRotation, date: Date) => IRotationWeek | null;
declare const sortDays: (days: Record<string, IRotationDay>) => Record<Weekday, IRotationDay>;

export { type CreateDepartmentGroupParams, type CreateDepartmentGroupResponse, type CreateDepartmentParams, type CreateDepartmentResponse, type CreateOrganizationParams, type CreateOrganizationResponse, type CreateRotationParams, type CreateRotationResponse, type CreateShiftParams, type CreateShiftResponse, type CreateTaskParams, type CreateTaskResponse, type CreateUserParams, type CreateUserResponse, type DeepRequired, type DeepRequiredNonNull, type FirestoreCollection, type FirestoreDepartment, type FirestoreDepartmentGroup, type FirestoreOrganization, type FirestoreShift, type FirestoreShiftSwapProposal, type FirestoreTask, type FirestoreUser, type FirestoreUserRole, type GetDepartmentsByOrganizationIdParams, type GetDepartmentsByOrganizationIdResponse, type GetOrganizationsByUserIdParams, type GetOrganizationsByUserIdResponse, type GetRotationByIdParams, type GetRotationByIdResponse, type GetRotationsByDepartmentIdParams, type GetRotationsByDepartmentIdResponse, type GetRotationsByUserIdParams, type GetRotationsByUserIdResponse, type GetShiftsByDepartmentIdParams, type GetShiftsByDepartmentIdResponse, type GetTasksByDepartmentIdParams, type GetTasksByDepartmentIdResponse, type GetUserInfoParams, type GetUserInfoResponse, type GetUsersByDepartmentIdParams, type GetUsersByDepartmentIdResponse, type GetUsersByIdsParams, type GetUsersByIdsResponse, type HomePageProps, type IFirestoreRotation, type IRotationDay, type IRotationUser, type IRotationWeek, type RotationBuilderState, type RotationPatternDay, type ShiftInstance, type Subset, type SwapStatus, USER_ROLES, type UserStoragePath, type Weekday, type WhereClause, type WhereFilterOpType, callFunction, firestoreCollections, formatDate, getDocsWhere, getRotationWeekAtDate, getRotationWeekNumberAtDate, getStartWeek, sortDays, timestampToDate, useFetchDoc, useFetchDocs, useFetchDocsWhere, useScrollToTop, userStoragePath };
