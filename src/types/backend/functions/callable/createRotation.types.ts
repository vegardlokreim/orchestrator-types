import { RotationBuilderState } from "../../FirestoreRotation"
import { FirestoreRotation } from "../../firestoreTypes"

export interface RotationPatternDay {
    shiftId: string,
    taskIds: string[]
}

export type CreateRotationParams = Omit<FirestoreRotation, "id" | "createdAt" | "updatedAt">

export interface CreateRotationResponse {
    code: 201,
    message: "Rotation created successfully",
}