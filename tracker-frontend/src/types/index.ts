export type IStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface IProjectRequest {
    name: string;
    description: string;
    startDate: Date;
    endDate: string | null; 
}

export interface ITaskRequest {
    title: string;
    description: string;
    status?: IStatus;
    project_id: number;
}


export interface ITask {
    id: number;
    title: string;
    description: string;
    status: IStatus;
    dueDate: Date;
    project_id: number;
}


export interface IProject {
    id: number;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date | null;
    tasks: ITask[];
}
