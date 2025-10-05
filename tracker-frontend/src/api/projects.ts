import httpService from "../service/httpService";
import type { IProject, IProjectRequest } from "../types";


export const getAllProjects = async (): Promise<IProject[]> => {
    const { data } = await httpService.get<IProject[]>("/projects")
    return data;
}

export const createProject = async (projectDto: IProjectRequest): Promise<IProject> => {
    const { data } = await httpService.post<IProject>("/projects", projectDto )
    return data;
}

export const getProject = async (id: number): Promise<IProject> => {
    const { data } = await httpService.get<IProject>(`/projects/${id}`)
    return data;
}
