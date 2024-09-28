import { FirestoreDepartment, FirestoreEmployee, FirestoreOrganization, FirestorePattern } from "../../firestoreTypes";
export type CreateRotationParams = {
    name: string;
    pattern: {
        patternId: FirestorePattern["id"];
        weeks: number;
        rotationPlan: FirestorePattern["weeks"];
    };
    organizationId: FirestoreOrganization["id"];
    departmentId: FirestoreDepartment["id"];
    employees: Array<{
        employeeId: FirestoreEmployee["id"];
        order: number;
    }>;
    startDate: Date;
};
