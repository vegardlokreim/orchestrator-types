import { IFirestoreRotation, RotationBuilderState } from "../../FirestoreRotation"

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
        | "startDate"
        | "startDateString"
    > & {
        startDate: Date,
    }

export interface CreateRotationResponse {
    code: 201,
    message: "Rotation created successfully",
}