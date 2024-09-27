import { FirestoreTask } from "../../firestoreTypes";
export type CreateTaskParams = Omit<FirestoreTask, "id" | "createdAt" | "updatedAt">;
//# sourceMappingURL=createTask.types.d.ts.map