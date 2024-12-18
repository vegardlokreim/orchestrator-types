import {
    IFirestoreRotation
} from "../../FirestoreRotation"

export interface RotationPatternDay {
    shiftId: string,
    taskIds: string[]
}

export type CreateRotationParams =
    Omit<IFirestoreRotation,
        | "id"
        | "createdAt"
        | "updatedAt"
        | "createdBy"
        | "userIds"
        | "shiftIds"
        | "taskIds"
        | "startDate"
        | "endDate"
    > & {
        startDate: Date,
        endDate: Date | null,
    }

export interface CreateRotationResponse {
    code: 201,
    message: "Rotation created successfully",
}