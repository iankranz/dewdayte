import { type Task } from "@/hooks/useTask";
import Link from "next/link";
import ChevronIcon from "@/icons/ChevronIcon";
import DewCheckbox from "./DewCheckbox";
export default function TaskListItem({
  task,
  handleTaskCompleteToggle,
}: {
  task: Task;
  handleTaskCompleteToggle: () => void;
}) {
  return (
    <div className="flex w-full items-center gap-3 rounded bg-spray p-4">
      <DewCheckbox
        handleInputChange={handleTaskCompleteToggle}
        checked={Boolean(task.completedAt)}
      />

      <span className="">{task.name ?? "untitled"}</span>

      <div className="flex grow justify-end">
        <Link href={`/task/${task.id}`}>
          <ChevronIcon />
        </Link>
      </div>
    </div>
  );
}
