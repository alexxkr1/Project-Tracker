import { useEffect, useState } from "react";
import type { IProject, IStatus, ITask } from "../types";
import { getProject } from "../api/projects";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar, Clock, Loader } from "lucide-react";
import { calculateDuration, formatDate } from "../utils/helpers";
import { updateStatus } from "../api/tasks";
import TaskItem from "../components/TaskItem";
import CreateTaskForm from "../components/forms/CreateTaskForm";

const ProjectDetailPage = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [project, setProject] = useState<IProject | null>(null);
    const [loading, setLoading] = useState(true);
    const [loadingTaskId, setLoadingTaskId] = useState<number | null>(null); 

    useEffect(() => {
        setLoading(true);
        getProject(parseInt(id as string))
            .then(data => {
                setProject(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]); 

    const handleTaskCreated = (newTask: ITask) => {
        if (project) {
            setProject(prev => prev ? ({
                ...prev,
                tasks: prev.tasks.concat(newTask)
            }) : null);
        }
    };

    const handleStatusChange = async (taskId: number, newStatus: IStatus) => {
        if (!project) return;

        setLoadingTaskId(taskId);
        
        try {
            const updatedTask = await updateStatus(parseInt(id as string), taskId, newStatus);
            
            setProject(prev => prev ? ({
                ...prev,
                tasks: prev.tasks.map(t => 
                    t.id === taskId ? updatedTask : t
                )
            }) : null);

        } catch (error) {
            console.error("Error updating task status:", error);
        } finally {
            setLoadingTaskId(null);
        }
    };

    if (loading) {
         return (
            <div className="flex items-center justify-center p-12 text-gray-500">
                <Loader size={24} className="animate-spin mr-3" /> Loading Project Details...
            </div>
        );
    }

    if (!project) {
        return (
            <div className="p-8 text-center text-red-600 max-w-4xl mx-auto mt-10">
                <h1 className="text-3xl font-bold">404 - Project Not Found</h1>
                <button 
                    className="mt-4 text-indigo-600 hover:text-indigo-800"
                    onClick={() => navigate('/')}
                >
                    Go back to Projects
                </button>
            </div>
        );
    }
    
    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <button 
                className="text-sm text-indigo-600 hover:text-indigo-800 mb-4" 
                onClick={() => navigate('/')}
            >
                &larr; Back to All Projects
            </button>
            <div className="bg-white p-6 rounded-xl shadow-2xl border-l-8 border-indigo-600">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{project.name}</h1>
                <p className="text-gray-600 mb-6">{project.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
                    <div className="text-lg">
                        <Calendar size={18} className="inline-block text-indigo-500 mr-2" />
                        <span className="font-semibold">Start Date:</span> {formatDate(project.startDate)}
                    </div>
                    <div className="text-lg">
                        <Calendar size={18} className="inline-block text-indigo-500 mr-2" />
                        <span className="font-semibold">End Date:</span> {formatDate(project.endDate)}
                    </div>
                    <div className="col-span-2 text-lg">
                        <Clock size={18} className="inline-block text-indigo-500 mr-2" />
                        <span className="font-semibold">Total Duration:</span> {calculateDuration(project.startDate, project.endDate)}
                    </div>
                </div>
                
                <h2 className="text-2xl font-bold mt-8 mb-4 border-t pt-4">Tasks ({project.tasks.length})</h2>

                <CreateTaskForm projectId={project.id} onTaskCreated={handleTaskCreated} />


                {project.tasks.length === 0 ? (
                    <p className="text-gray-500 italic">No tasks assigned yet.</p>
                ) : (
                    <ul className="space-y-3">
                        {project.tasks.map(task => (
                            <TaskItem 
                                key={task.id} 
                                task={task} 
                                onStatusChange={handleStatusChange} 
                                loadingTaskId={loadingTaskId}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};


export default ProjectDetailPage;