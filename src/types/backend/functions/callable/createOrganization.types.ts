import { FirestoreOrganization } from "../../firestoreTypes";

export type CreateOrganizationParams = Omit<FirestoreOrganization, "departments" | "createdAt" | "updatedAt">

export type CreateOrganizationResponse = { code: 201, message: string }
