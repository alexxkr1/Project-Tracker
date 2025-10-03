import httpService from "./httpService";


export const getAllProjects = async () => {
    const { data } = await httpService.get("/tracker")
    return data;
}