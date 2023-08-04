import Link from "next/link";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import DewButton from "@/components/DewButton";
import TaskViewPanel from "@/components/TaskViewPanel";
import TaskEditForm from "@/components/TaskEditForm";
import { useState, useEffect } from "react";

export default function SpacePage() {
  const router = useRouter();

  const [mode, setMode] = useState<"view" | "edit">("view");

  const taskId = (router.query.id ?? null) as string | null;

  const task = api.task.get.useQuery({ id: taskId ?? "" });

  useEffect(() => {
    if (router.query.edit == "true") {
      setMode("edit");
    }
  }, [router.query.edit]);

  function handleFormDiscard() {
    setMode("view");
  }

  function handleFormSubmit(
    name: string,
    dueCategory: string,
    description: string
  ) {
    console.log("name: ", name);
    console.log("due category: ", dueCategory);
    console.log("description: ", description);
    return;
  }

  function handleEditClick() {
    setMode("edit");
  }

  return (
    <>
      <main className="flex min-h-screen flex-col p-6">
        <div className="flex justify-between">
          {mode === "edit" ? (
            <h1 className="mb-8 font-spline text-2xl text-near-black">
              edit task
            </h1>
          ) : (
            <>
              <Link href={`/space/${task.data?.spaceId}`}>leave</Link>
              <DewButton type="secondary" handleClick={handleEditClick}>
                edit
              </DewButton>
            </>
          )}
        </div>
        {mode === "edit" ? (
          <TaskEditForm
            handleFormDiscard={handleFormDiscard}
            handleFormSubmit={handleFormSubmit}
          />
        ) : (
          <TaskViewPanel />
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
