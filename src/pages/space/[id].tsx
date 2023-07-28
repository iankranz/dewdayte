import Link from "next/link";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import DewButton from "@/components/DewButton";
import { useEffect } from "react";

type Space = {
  id: string;
  name: string;
};

export default function CreateSpacePage() {
  const router = useRouter();

  const spaceId = (router.query.id ?? null) as string | null;

  const space = api.space.get.useQuery({ id: spaceId ?? "" });

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

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            <Link href="/">
              <span className="text-pewrple">dewdayte</span>
            </Link>
          </h1>
          <p className="text-2xl">
            Welcome to {space.data ? space.data.name : "no space name"}
          </p>
          <p>This is a space</p>
          <p className="text-center">
            The id of this space is:{" "}
            {space.data ? space.data.id : "no space id"}
          </p>
          <Link href="/">
            <DewButton type="primary">exit</DewButton>
          </Link>
        </div>
      </main>
    </>
  );
}
