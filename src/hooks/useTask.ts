import { useState, useEffect } from "react";
import { api } from "@/utils/api";

export interface Task {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string | null;
  description: string | null;
  spaceId: string;
  completedAt: Date | null;
  dueCategory: "TODAY" | "THIS_WEEK" | "THIS_MONTH" | null;
}

export function useTask(taskId: string | null) {
  const getTaskQuery = api.task.get.useQuery({ id: taskId ?? "" });
  const updateTaskMutation = api.task.update.useMutation();

  const [task, setTask] = useState<Task | null>(null);

  async function updateTask(input: {
    name: string | null;
    dueCategory: string;
    description: string | null;
  }) {
    if (!taskId) return;
    let dbDueCategory: "TODAY" | "THIS_WEEK" | "THIS_MONTH" = "TODAY";
    switch (input.dueCategory) {
      case "THIS_WEEK":
        dbDueCategory = "THIS_WEEK";
        break;
      case "THIS_MONTH":
        dbDueCategory = "THIS_MONTH";
        break;
      default:
        dbDueCategory = "TODAY";
    }
    try {
      const newTask = await updateTaskMutation.mutateAsync({
        id: taskId,
        name: input.name ?? "",
        dueCategory: dbDueCategory,
        description: input.description ?? "",
      });
      setTask(newTask);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (!getTaskQuery.data) return;
    setTask(getTaskQuery.data);
  }, [getTaskQuery.data]);

  return { task, updateTask };
}
