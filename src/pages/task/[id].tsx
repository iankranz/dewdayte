import Link from "next/link";
import { useRouter } from "next/router";
import DewButton from "@/components/DewButton";
import TaskViewPanel from "@/components/TaskViewPanel";
import TaskEditForm from "@/components/TaskEditForm";
import { useState, useEffect } from "react";
import { useTask } from "@/hooks/useTask";

export default function TaskPage() {
  const router = useRouter();
  const taskId = (router.query.id ?? null) as string | null;
  const { task, updateTask } = useTask(taskId);

  const [mode, setMode] = useState<"view" | "edit">("view");

  useEffect(() => {
    if (router.query.edit == "true") {
      setMode("edit");
    }
  }, [router.query.edit]);

  function handleFormDiscard() {
    setMode("view");
  }

  function handleFormSubmit(
    name: string | null,
    dueCategory: string,
    description: string | null
  ) {
    updateTask({ name, dueCategory, description })
      .then(() => {
        if (!taskId) return;
        setMode("view");
        router.replace(`/task/${taskId}`).catch((e) => {
          console.error(e);
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  function handleDueCategoryChange(value: string) {
    updateTask({
      name: task?.name ?? null,
      dueCategory: value,
      description: task?.description ?? null,
    }).catch((e) => console.error(e));
  }

  function handleEditClick() {
    setMode("edit");
  }

  return (
    <>
      <main className="flex min-h-screen flex-col p-6">
        {mode === "edit" ? (
          <h1 className="mb-8 font-spline text-2xl text-near-black">
            edit task
          </h1>
        ) : (
          <div className="mb-6 flex items-center justify-between">
            <Link href={`/space/${task?.spaceId}`}>
              <span className="text-brand-purple">&larr;</span>
            </Link>
            <DewButton
              type="secondary"
              handleClick={handleEditClick}
              width="fit"
              padding="sm"
            >
              edit
            </DewButton>
          </div>
        )}
        {mode === "edit" ? (
          <TaskEditForm
            task={task}
            handleFormDiscard={handleFormDiscard}
            handleFormSubmit={handleFormSubmit}
          />
        ) : (
          <TaskViewPanel
            task={task}
            handleDueCategoryChange={handleDueCategoryChange}
          />
        )}
        <div className="flex grow flex-col items-center justify-end">
          <span>
            powered by <span className="text-brand-purple">dewdayte</span>
          </span>
        </div>
      </main>
    </>
  );
}
