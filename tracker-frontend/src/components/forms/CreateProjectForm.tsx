import { Loader, Plus } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import type { IProject, IProjectRequest } from "../../types";
import { createProject } from "../../api/projects";

interface CreateProjectFormProps {
  onSubmitSuccess: (newProject: IProject) => void;
}

const CreateProjectForm = ({ onSubmitSuccess }: CreateProjectFormProps) => {
    const [formData, setFormData] = useState<IProjectRequest>({
        name: '',
        description: '',
        //@ts-expect-error Types need to be improved
        startDate: new Date().toISOString(),
        endDate: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            endDate: name === 'endDate' && value === '' ? null : (name === 'endDate' ? value : prev.endDate)
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (!formData.name.trim() || !formData.description.trim()) {
            setError("Name and Description are required.");
            setLoading(false);
            return;
        }

        try {
            const requestDto: IProjectRequest = {
                name: formData.name,
                description: formData.description,
                startDate: formData.startDate, 
                endDate: formData.endDate || null,
            };

            const newProject = await createProject(requestDto);
            onSubmitSuccess(newProject);
        } catch (error) {
            console.error(error)
            setError("Failed to create project. Check server console.");
            setLoading(false);
        }
    };

    const inputClasses = "w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition";

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Project Title <span className="text-red-500">*</span></label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClasses}
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="description">Description <span className="text-red-500">*</span></label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className={inputClasses}
                    required
                ></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="startDate">Start Date <span className="text-red-500">*</span></label>
                    <input
                        type="datetime-local"
                        id="startDate"
                        name="startDate"
                        //@ts-expect-error Types need to be improved
                        value={formData.startDate}
                        onChange={handleChange}
                        className={inputClasses}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="endDate">Expected End Date (Optional)</label>
                    <input
                        type="datetime-local"
                        id="endDate"
                        name="endDate"
                        value={formData.endDate || ''}
                        onChange={handleChange}
                        className={inputClasses}
                    />
                </div>
            </div>
            
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="pt-4">
                <button
                    type="submit"
                    className="w-full flex items-center justify-center bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 disabled:bg-indigo-400"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader size={20} className="animate-spin mr-2" />
                            Creating...
                        </>
                    ) : (
                        <>
                            <Plus size={20} className="mr-2" />
                            Create Project
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default CreateProjectForm;