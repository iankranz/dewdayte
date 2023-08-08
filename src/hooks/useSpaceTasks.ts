import { api } from "@/utils/api";
import { useState, useEffect } from "react";
import { type Task } from "./useTask";

export function useSpaceTasks(spaceId: string | null) {
  const [todayTasks, setTodayTasks] = useState<Task[]>([]);
  const [thisWeekTasks, setThisWeekTasks] = useState<Task[]>([]);
  const [thisMonthTasks, setThisMonthTasks] = useState<Task[]>([]);

  const getDayTasksQuery = api.space.getDayTasks.useQuery({
    id: spaceId ?? "",
  });
  const getWeekTasksQuery = api.space.getWeekTasks.useQuery({
    id: spaceId ?? "",
  });
  const getMonthTasksQuery = api.space.getMonthTasks.useQuery({
    id: spaceId ?? "",
  });
  const updateTaskMutation = api.task.update.useMutation();

  useEffect(() => {
    if (!getDayTasksQuery.data) return;
    setTodayTasks(getDayTasksQuery.data.tasks);
  }, [getDayTasksQuery.data]);

  useEffect(() => {
    if (!getWeekTasksQuery.data) return;
    setThisWeekTasks(getWeekTasksQuery.data.tasks);
  }, [getWeekTasksQuery.data]);

  useEffect(() => {
    if (!getMonthTasksQuery.data) return;
    setThisMonthTasks(getMonthTasksQuery.data.tasks);
  }, [getMonthTasksQuery.data]);

  async function toggleTaskComplete(task: Task) {
    const completedAt = task.completedAt ? null : new Date();
    const updatedTask = await updateTaskMutation.mutateAsync({
      id: task.id,
      completedAt,
    });
    if (task.dueCategory === "TODAY") {
      setTodayTasks(
        todayTasks.map((t) => {
          if (t.id === task.id) {
            return updatedTask;
          }
          return t;
        })
      );
    } else if (task.dueCategory === "THIS_WEEK") {
      setThisWeekTasks(
        thisWeekTasks.map((t) => {
          if (t.id === task.id) {
            return updatedTask;
          }
          return t;
        })
      );
    } else if (task.dueCategory === "THIS_MONTH") {
      setThisMonthTasks(
        thisMonthTasks.map((t) => {
          if (t.id === task.id) {
            return updatedTask;
          }
          return t;
        })
      );
    }
  }

  return { todayTasks, thisWeekTasks, thisMonthTasks, toggleTaskComplete };
}
