import { FirestoreDepartment, FirestoreTask } from "../../firestoreTypes";
export type GetTasksByDepartmentIdParams = {
    departmentId: FirestoreDepartment["id"];
};
export type GetTasksByDepartmentIdResponse = {
    code: 200;
    message: string;
    tasks: FirestoreTask[];
};
