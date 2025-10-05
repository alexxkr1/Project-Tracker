import { useEffect, useState } from "react";
import type { IProject } from "../types";
import { getAllProjects } from "../api/projects";
import ProjectCard from "../components/ProjectCard";
import { Loader, Plus } from "lucide-react";
import Modal from "../components/ui/Modal";
import CreateProjectForm from "../components/forms/CreateProjectForm";

const ProjectsPage = () => {
    const [projects, setProjects] = useState<IProject[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setLoading(true);
        getAllProjects()
        .then(data => {
            setProjects(data);
            setLoading(false);
        }).catch(err => {
            setError(err);
            setLoading(false)
        });

    }, [])

    if(loading) {
        return (
            <div className="flex items-center justify-center p-12 text-gray-500">
                <Loader size={24} className="animate-spin mr-3" /> Loading Projects...
            </div>        
        )
    }

    if(error) {
        return (
            <div className="p-8 text-center text-red-600 bg-red-50 rounded-lg max-w-lg mx-auto mt-10">
                Error: {error}
            </div>
        )
    }

    return (
        <div className="p-4 sm:p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-extrabold text-gray-900">All Projects</h1>
                <button 
                    className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition duration-150"
                   onClick={() => setIsModalOpen(true)}
                >
                    <Plus size={20} className="mr-2" />
                    New Project
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(project => (
                    <ProjectCard key={project.id} project={project} /> 
                ))}
            </div>
             <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Project">
                <CreateProjectForm onSubmitSuccess={(newProject: IProject) => {
                setProjects([...projects, newProject]);
                setIsModalOpen(false);
                }} />
      </Modal>
        </div>
    )
}

export default ProjectsPage;