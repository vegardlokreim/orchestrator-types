import { FirestoreOrganization } from "../../firestoreTypes";

export type Params = Omit<FirestoreOrganization, "departments" | "createdAt" | "updatedAt">
