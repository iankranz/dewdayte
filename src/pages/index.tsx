import Head from "next/head";
import Link from "next/link";
import DewButton from "@/components/DewButton";
import { useEffect, useState } from "react";

interface Space {
  id: string;
  name: string;
}

export default function Home() {
  const [spaces, setSpaces] = useState<Space[]>([]);

  const testSpaceId = process.env.NEXT_PUBLIC_TEST_SPACE_ID;

  useEffect(() => {
    const data = window.localStorage.getItem("my-spaces");
    let mySpaces = [] as Space[];
    if (data) {
      const parsedData = JSON.parse(data) as { spaces: Space[] | undefined };
      if (parsedData.spaces) {
        mySpaces = parsedData.spaces;
      }
    }
    setSpaces(mySpaces);
  }, []);

  const spacesList = spaces.map((space) => {
    return (
      <li key={space.id} className="font-spline text-xl text-brand-purple">
        <Link href={`/space/${space.id}`}>{space.name} &rarr;</Link>
      </li>
    );
  });

  return (
    <>
      <Head>
        <title>dewdayte</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center px-6 py-4">
        <div className="flex h-full w-full flex-col items-center justify-center gap-12 md:max-w-xl">
          <div className="flex w-full justify-center">
            <h1 className="text-shadow-dewdayte text-5xl font-bold text-brand-purple">
              dewdayte
            </h1>
          </div>
          {Boolean(spaces.length) && (
            <div className="flex w-full flex-col gap-4 rounded-lg bg-grey-lightest p-6">
              <p className="font-spline text-2xl">your spaces</p>
              <ul className="ml-4 flex flex-col gap-4">{spacesList}</ul>
            </div>
          )}
          <div className="flex w-full flex-col gap-8">
            <h2 className="font-spline text-4xl font-bold">
              get sh*t done
              <br />
              (on time)
            </h2>
            <div className="flex w-full flex-col gap-8">
              <Link href="/space/create">
                <DewButton type="primary">create a new space</DewButton>
              </Link>
            </div>
          </div>
          <div className="w-full rounded-xl bg-midnight-purple p-6">
            <p className="mb-8 font-spline text-2xl text-white">
              just want to test it out?
            </p>
            <Link href={`/space/${testSpaceId}`}>
              <DewButton type="surface-light">join the demo space</DewButton>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
