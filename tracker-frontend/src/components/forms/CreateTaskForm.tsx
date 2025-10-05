import { Loader, Plus } from "lucide-react";
import { createTask } from "../../api/tasks";
import { useState, type ChangeEvent, type FormEvent } from "react";
import type { ITask } from "../../types";

interface CreateTaskFormProps {
  projectId: number;
  onTaskCreated: (task: ITask) => void;
}

interface TaskFormData {
  title: string;
  description: string;
  dueDate: string | null;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ projectId, onTaskCreated }) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    dueDate: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      dueDate:
        name === "dueDate" && value === ""
          ? null
          : name === "dueDate"
          ? value
          : prev.dueDate,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = formData.title.trim();
    if (!name) return;

    setLoading(true);
    setError(null);

    try {
      const taskRequest = {
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate
          ? new Date(formData.dueDate).toISOString()
          : null,
        project_id: projectId,
      };

      const newTask = await createTask(taskRequest);
      onTaskCreated(newTask);

      // Reset form
      setFormData({
        title: "",
        description: "",
        dueDate: null,
      });
    } catch (err) {
      setError("Failed to add task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 mb-4 p-4 bg-gray-50 rounded-xl border border-gray-200 shadow-inner"
    >
      <div className="flex space-x-2">
        <input
          type="text"
          name="title"
          placeholder="Task Title (required)..."
          value={formData.title}
          onChange={handleChange}
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-base"
          disabled={loading}
          required
        />
        <button
          type="submit"
          className="flex-shrink-0 bg-indigo-600 text-white px-4 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition disabled:bg-indigo-400 flex items-center justify-center"
          disabled={loading || !formData.title.trim() || !formData.description.trim() || !formData.dueDate?.trim()}
        >
          {loading ? <Loader size={20} className="animate-spin" /> : <Plus size={20} />}
        </button>
      </div>

      <textarea
        name="description"
        placeholder="Task Description (required)..."
        value={formData.description}
        onChange={handleChange}
        rows={2}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        disabled={loading}
      />

      <div>
        <label
          htmlFor="dueDate"
          className="block text-xs font-medium text-gray-500 mb-1"
        >
          Due Date (Required)
        </label>
        <input
          type="datetime-local"
          id="dueDate"
          name="dueDate"
          value={formData.dueDate ?? ""}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          disabled={loading}
        />
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  );
};

export default CreateTaskForm;
