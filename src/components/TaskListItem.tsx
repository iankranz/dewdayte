import { type Task } from "@/hooks/useTask";
import Link from "next/link";

export default function TaskListItem({ task }: { task: Task }) {
  return (
    <div className="w-full rounded bg-spray p-4">
      <Link href={`/task/${task.id}`}>{task.name ?? "untitled"}</Link>
    </div>
  );
}
