import { ChevronDown, Clock, Loader } from "lucide-react";
import { formatDate } from "../utils/helpers";
import { useState } from "react";
import type { IStatus, ITask } from "../types";

interface TaskItemProps {
  task: ITask;
  onStatusChange: (taskId: number, newStatus: IStatus) => void;
  loadingTaskId?: number | null;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onStatusChange, loadingTaskId }) => {
  const STATUS_OPTIONS: IStatus[] = ["TODO", "IN_PROGRESS", "DONE"];
  const isLoading = loadingTaskId === task.id;
  const [isExpanded, setIsExpanded] = useState(false);

  const statusColorMap: Record<IStatus, string> = {
    TODO: "bg-gray-200 text-gray-800",
    IN_PROGRESS: "bg-yellow-200 text-yellow-800",
    DONE: "bg-green-200 text-green-800",
  };

  const isPastDue =
    task.dueDate && task.status !== "DONE"
      ? new Date(task.dueDate) < new Date()
      : false;

  const dueDateClass = isPastDue
    ? "text-red-600 font-bold"
    : "text-gray-600";

  return (
    <li className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-md transition">
      <div
        className="p-4 flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3 max-w-[70%]">
          <ChevronDown
            size={20}
            className={`text-gray-500 transition-transform duration-200 flex-shrink-0 ${
              isExpanded ? "rotate-180" : "rotate-0"
            }`}
          />
          <span
            className={`font-semibold text-lg truncate ${
              task.status === "DONE"
                ? "text-green-700 line-through"
                : "text-gray-800"
            }`}
          >
            {task.title}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          {isLoading && <Loader size={16} className="animate-spin text-indigo-500" />}
          <select
            value={task.status}
            onChange={(e) => {
              e.stopPropagation();
              onStatusChange(task.id, e.target.value as IStatus);
            }}
            className={`text-sm font-semibold px-3 py-1 rounded-full border border-gray-300 appearance-none cursor-pointer focus:ring-2 focus:ring-indigo-500 transition
              ${statusColorMap[task.status]}
              ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isLoading}
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-100 p-4 space-y-3 bg-gray-50 rounded-b-xl">
          {task.description || task.dueDate ? (
            <>
              {task.description && (
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">Description:</p>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {task.description}
                  </p>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Clock
                  size={16}
                  className={isPastDue ? "text-red-500" : "text-indigo-400"}
                />
                <p className="text-sm">
                  <span className="font-medium">Due Date: </span>
                  <span className={dueDateClass}>
                    {task.dueDate ? formatDate(task.dueDate) : "No due date set"}
                  </span>
                </p>
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-sm italic">
              No details added for this task.
            </p>
          )}
        </div>
      )}
    </li>
  );
};

export default TaskItem;
