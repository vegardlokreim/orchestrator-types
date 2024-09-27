import { FirestoreTask } from "../../firestoreTypes";

export type Params = Omit<FirestoreTask, "id" | "createdAt" | "updatedAt">;
