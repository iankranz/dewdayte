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

  const getTaskQuery = api.task.get.useQuery({ id: taskId ?? "" });
  const updateTaskMutation = api.task.update.useMutation();

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
    if (!taskId) return;
    let dbDueCategory: "TODAY" | "THIS_WEEK" | "THIS_MONTH" = "TODAY";
    switch (dueCategory) {
      case "THIS_WEEK":
        dbDueCategory = "THIS_WEEK";
        break;
      case "THIS_MONTH":
        dbDueCategory = "THIS_MONTH";
        break;
      default:
        dbDueCategory = "TODAY";
    }

    updateTaskMutation
      .mutateAsync({
        id: taskId,
        name,
        dueCategory: dbDueCategory,
        description,
      })
      .then((res) => {
        setMode("view");
      })
      .catch((err) => {
        console.log(err);
      });
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
              <Link href={`/space/${getTaskQuery.data?.spaceId}`}>leave</Link>
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
