import { FirestoreDepartment, FirestoreTask } from "../../firestoreTypes";
export type GetTasksByDepartmentIdParams = {
    departmentId: FirestoreDepartment["id"];
};
export type GetTasksByDepartmentIdSuccess = {
    code: 200;
    message: string;
    tasks: FirestoreTask[];
};
