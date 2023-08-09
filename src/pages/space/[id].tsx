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

  const {
    todayTasks,
    thisMonthTasks,
    thisWeekTasks,
    isEmptySpace,
    toggleTaskComplete,
    archiveTask,
  } = useSpaceTasks(spaceId);

  const getSpaceQuery = api.space.get.useQuery({ id: spaceId ?? "" });
  const createTaskMutation = api.task.create.useMutation();

  // todo: create a custom hook for localstorage logic
  useEffect(() => {
    if (!getSpaceQuery.data?.id || !getSpaceQuery.data?.name) return;
    const data = window.localStorage.getItem("my-spaces");
    let mySpaces = [] as Space[];
    if (data) {
      const parsedData = JSON.parse(data) as {
        spaces?: Space[];
      };
      if (parsedData.spaces) {
        mySpaces = parsedData.spaces?.filter(
          (mySpace) => mySpace.id !== getSpaceQuery.data?.id
        );
      }
    }
    mySpaces = [
      { id: getSpaceQuery.data?.id, name: getSpaceQuery.data?.name },
      ...mySpaces,
    ].slice(0, 5);
    window.localStorage.setItem(
      "my-spaces",
      JSON.stringify({ spaces: mySpaces })
    );
  }, [getSpaceQuery.data?.id, getSpaceQuery.data?.name]);

  function handleNewClick() {
    if (!spaceId) return;
    createTaskMutation
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
      <main className="flex h-full min-h-screen flex-col items-center p-6">
        <div className="flex h-full w-full grow flex-col md:max-w-2xl">
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
            {getSpaceQuery.data ? getSpaceQuery.data.name : "Loading..."}
          </h1>
          {isEmptySpace ? (
            <div className="w-full text-center">
              your space is empty!
              <br />
              click &quot;+new&quot; to start adding tasks
            </div>
          ) : (
            <div className="flex flex-col gap-12">
              {Boolean(todayTasks.length) && (
                <TaskList
                  label="today"
                  tasks={todayTasks}
                  handleTaskCompleteToggle={(task) => {
                    toggleTaskComplete(task).catch((e) => console.error(e));
                  }}
                  handleArchiveClick={(task) => {
                    archiveTask(task).catch((e) => console.error(e));
                  }}
                />
              )}

              {Boolean(thisWeekTasks.length) && (
                <TaskList
                  label="this week"
                  tasks={thisWeekTasks}
                  handleTaskCompleteToggle={(task) => {
                    toggleTaskComplete(task).catch((e) => console.error(e));
                  }}
                  handleArchiveClick={(task) => {
                    archiveTask(task).catch((e) => console.error(e));
                  }}
                />
              )}

              {Boolean(thisMonthTasks.length) && (
                <TaskList
                  label="this month"
                  tasks={thisMonthTasks}
                  handleTaskCompleteToggle={(task) => {
                    toggleTaskComplete(task).catch((e) => console.error(e));
                  }}
                  handleArchiveClick={(task) => {
                    archiveTask(task).catch((e) => console.error(e));
                  }}
                />
              )}
            </div>
          )}
          <div className="flex min-h-[5rem] grow flex-col items-center justify-end">
            <span>
              powered by <span className="text-brand-purple">dewdayte</span>
            </span>
          </div>
        </div>
      </main>
    </>
  );
}
