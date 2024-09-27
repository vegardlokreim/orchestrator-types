import { FirestoreOrganization } from "../../firestoreTypes";

export type CreateOrganizationParams = Omit<FirestoreOrganization, "departments" | "createdAt" | "updatedAt">
