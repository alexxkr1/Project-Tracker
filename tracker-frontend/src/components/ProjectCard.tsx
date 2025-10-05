import { useNavigate } from "react-router-dom";
import type { IProject } from "../types"
import { calculateDuration, formatDate } from "../utils/helpers";
import { Calendar, Clock, Archive } from "lucide-react";

interface ProjectCardProps {
    project: IProject;
}

const ProjectCard = ({project}: ProjectCardProps) => {
    const isOngoing = project.endDate === null || new Date(project.endDate) > new Date();
    const statusColor = isOngoing ? 'bg-indigo-100 text-indigo-700' : 'bg-green-100 text-green-700';
    const statusText = isOngoing ? 'Ongoing' : 'Completed';
    const navigate = useNavigate();

    return (
          <div 
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 cursor-pointer border-t-4 border-indigo-500"
            onClick={() => navigate(`/projects/${project.id}`)}
        >
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-gray-800 truncate pr-4">{project.name}</h3>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColor}`}>
                    {statusText}
                </span>
            </div>
            <p className="text-sm text-gray-500 mb-4 line-clamp-2">{project.description}</p>
            
            <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                    <Calendar size={16} className="text-indigo-400 mr-2 flex-shrink-0" />
                    <span className="font-medium">Start:</span>
                    <span className="ml-1">{formatDate(project.startDate)}</span>
                </div>
                <div className="flex items-center text-gray-600">
                    <Clock size={16} className="text-indigo-400 mr-2 flex-shrink-0" />
                    <span className="font-medium">Duration:</span>
                    <span className="ml-1">{calculateDuration(project.startDate, project.endDate)}</span>
                </div>
                <div className="flex items-center text-gray-600">
                    <Archive size={16} className="text-indigo-400 mr-2 flex-shrink-0" />
                    <span className="font-medium">Tasks:</span>
                    <span className="ml-1 font-semibold">{project?.tasks?.length ?? 0}</span>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard;