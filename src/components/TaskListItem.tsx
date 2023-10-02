import { type Task } from "@/hooks/useTask";
import Link from "next/link";
import ChevronIcon from "@/icons/ChevronIcon";
import DewCheckbox from "./DewCheckbox";
export default function TaskListItem({
  task,
  handleTaskCompleteToggle,
  handleArchiveClick,
}: {
  task: Task;
  handleTaskCompleteToggle: () => void;
  handleArchiveClick: () => void;
}) {
  return (
    <div className="flex h-fit w-full items-center rounded bg-spray">
      <div className="py-4 pl-4">
        <DewCheckbox
          handleInputChange={handleTaskCompleteToggle}
          checked={Boolean(task.completedAt)}
        />
      </div>

      <Link href={`/task/${task.id}`} className="flex h-16 items-center pl-6">
        <div>{task.name ?? "untitled"}</div>
      </Link>

      <div className="flex h-16 grow items-center justify-end">
        {task.completedAt ? (
          <span
            className="cursor-pointer pr-4 font-spline text-brand-purple"
            onClick={handleArchiveClick}
          >
            delete
          </span>
        ) : (
          <Link
            href={`/task/${task.id}`}
            className="flex h-full w-full items-center justify-end pr-4"
          >
            <ChevronIcon />
          </Link>
        )}
      </div>
    </div>
  );
}
