export interface RotationPatternDay {
    shiftId: string,
    taskIds: string[]
}
export interface CreateRotationParams {
    basicInfo: {
        name: string,
        startDate: string,
        departmentId: string,
        groupId?: string

    }
    doctors: {
        doctorId: string,
        startWeek: number
    }[]

    weekPatterns: {
        patternId: number, // week number in the rotation
        days: {
            monday: RotationPatternDay
            tuesday: RotationPatternDay
            wednesday: RotationPatternDay
            thursday: RotationPatternDay
            friday: RotationPatternDay
            saturday: RotationPatternDay
            sunday: RotationPatternDay
        }
    }[]
}

export interface CreateRotationResponse {
    code: 201,
    message: "Rotation created successfully",
}