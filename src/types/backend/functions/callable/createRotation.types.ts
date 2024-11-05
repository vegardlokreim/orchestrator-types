import { RotationBuilderState } from "../../FirestoreRotation"

export interface RotationPatternDay {
    shiftId: string,
    taskIds: string[]
}

export interface CreateRotationParams extends Omit<RotationBuilderState, "currentStep">{}

export interface CreateRotationResponse {
    code: 201,
    message: "Rotation created successfully",
}