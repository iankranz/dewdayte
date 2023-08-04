import Link from "next/link";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import DewButton from "@/components/DewButton";
import { useEffect } from "react";

interface Space {
  id: string;
  name: string;
}

export default function SpacePage() {
  const router = useRouter();

  const spaceId = (router.query.id ?? null) as string | null;

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
        <div className="flex justify-between">
          <Link href="/">leave</Link>
          <DewButton type="primary" handleClick={handleNewClick}>
            +new
          </DewButton>
        </div>
        <h1>{space.data ? space.data.name : "Loading..."}</h1>
        <div className="h-24 w-full bg-spray"></div>
        <span>
          powered by <span className="text-brand-purple">dewdayte</span>
        </span>
      </main>
    </>
  );
}
