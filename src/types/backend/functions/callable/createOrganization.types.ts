import { FirestoreOrganization } from "../../firestoreTypes";

export type CreateOrganizationParams = Omit<FirestoreOrganization, "departments" | "createdAt" | "updatedAt">

export type CreateOrganizationSuccess = { code: 201, message: string }
