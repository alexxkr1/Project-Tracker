import httpService from "../service/httpService";
import type { IStatus, ITask, ITaskRequest } from "../types";

export const createTask = async (taskDto: ITaskRequest): Promise<ITask> => {
  const { data } = await httpService.post<ITask>("/tasks", taskDto);
  return data;
};

export const updateStatus = async (_projectId: number, taskId: number, status: IStatus): Promise<ITask> => {
  const { data } = await httpService.put<ITask>(`/tasks/${taskId}`, {
    status
  });
  return data;
};
