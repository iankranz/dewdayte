import { type Task } from "@/hooks/useTask";
import TaskListItem from "./TaskListItem";

export default function TaskList({
  label,
  tasks,
  handleTaskCompleteToggle,
  handleArchiveClick,
}: {
  label: string;
  tasks: Task[];
  handleTaskCompleteToggle: (task: Task) => void;
  handleArchiveClick: (task: Task) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="font-spline">{label}</div>
      <div className="flex flex-col gap-4">
        {tasks.map((task) => {
          return (
            <TaskListItem
              task={task}
              key={task.id}
              handleTaskCompleteToggle={() => handleTaskCompleteToggle(task)}
              handleArchiveClick={() => handleArchiveClick(task)}
            />
          );
        })}
      </div>
    </div>
  );
}
