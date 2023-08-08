import Link from "next/link";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import DewButton from "@/components/DewButton";
import { useEffect } from "react";
import { useSpaceTasks } from "@/hooks/useSpaceTasks";
import TaskList from "@/components/TaskList";

interface Space {
  id: string;
  name: string;
}

export default function SpacePage() {
  const router = useRouter();

  const spaceId = (router.query.id ?? null) as string | null;

  const { todayTasks, thisMonthTasks, thisWeekTasks, toggleTaskComplete } =
    useSpaceTasks(spaceId);

  const space = api.space.get.useQuery({ id: spaceId ?? "" });
  const room = api.task.create.useMutation();

  useEffect(() => {
    if (!space.data?.id || !space.data?.name) return;
    const data = window.localStorage.getItem("my-spaces");
    let mySpaces = [] as Space[];
    if (data) {
      const parsedData = JSON.parse(data) as {
        spaces?: Space[];
      };
      if (parsedData.spaces) {
        mySpaces = parsedData.spaces?.filter(
          (mySpace) => mySpace.id !== space.data?.id
        );
      }
    }
    mySpaces = [
      { id: space.data?.id, name: space.data?.name },
      ...mySpaces,
    ].slice(0, 5);
    window.localStorage.setItem(
      "my-spaces",
      JSON.stringify({ spaces: mySpaces })
    );
  }, [space.data?.id, space.data?.name]);

  function handleNewClick() {
    if (!spaceId) return;
    room
      .mutateAsync({
        spaceId: spaceId,
      })
      .then((res) => {
        router.push(`/task/${res.id}?edit=true`).catch((err) => {
          console.error(err);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <>
      <main className="flex min-h-screen flex-col p-6">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/">
            <span className="font-spline text-brand-purple">&larr;leave</span>
          </Link>
          <DewButton
            type="primary"
            padding="sm"
            width="fit"
            handleClick={handleNewClick}
          >
            +new
          </DewButton>
        </div>
        <h1 className="mb-12 font-spline text-2xl">
          {space.data ? space.data.name : "Loading..."}
        </h1>
        <div className="flex flex-col gap-12">
          {todayTasks && (
            <TaskList
              label="today"
              tasks={todayTasks}
              handleTaskCompleteToggle={(task) => {
                toggleTaskComplete(task).catch((e) => console.error(e));
              }}
            />
          )}

          {thisWeekTasks && (
            <TaskList
              label="this week"
              tasks={thisWeekTasks}
              handleTaskCompleteToggle={(task) => {
                toggleTaskComplete(task).catch((e) => console.error(e));
              }}
            />
          )}

          {thisMonthTasks && (
            <TaskList
              label="this month"
              tasks={thisMonthTasks}
              handleTaskCompleteToggle={(task) => {
                toggleTaskComplete(task).catch((e) => console.error(e));
              }}
            />
          )}
        </div>
        <div className="flex min-h-[5rem] grow flex-col items-center justify-end">
          <span>
            powered by <span className="text-brand-purple">dewdayte</span>
          </span>
        </div>
      </main>
    </>
  );
}
