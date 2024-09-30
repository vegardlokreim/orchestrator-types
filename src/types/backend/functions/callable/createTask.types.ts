import { FirestoreTask } from "../../firestoreTypes";

export type CreateTaskParams = Omit<FirestoreTask, "id" | "createdAt" | "updatedAt" | "updatedBy">;

export type CreateTaskSuccess = {
    code: 201;
    message: string;
}