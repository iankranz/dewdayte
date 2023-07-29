import { api } from "@/utils/api";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import DewButton from "@/components/DewButton";
import Head from "next/head";

export default function CreateSpacePage() {
  const router = useRouter();
  const space = api.space.create.useMutation();

  const [name, setName] = useState<string | null>(null);

  function createSpace() {
    if (!name) return;
    space.mutate({ name });
  }

  function handleNameInput(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;
    setName(target.value);
  }

  useEffect(() => {
    if (!space.data) return;
    router.push(`/space/${space.data.id}`).catch((err) => console.error(err));
  }, [space.data, router]);

  return (
    <>
      <Head>
        <title>dewdayte</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            <Link href="/">
              <span className="text-brand-purple">dewdayte</span>
            </Link>
          </h1>
          <div className="flex w-72 flex-col gap-4">
            <p>enter a name for the space</p>
            <input
              className="w-full border border-black"
              onChange={handleNameInput}
            />
            <DewButton type="primary" handleClick={createSpace}>
              create
            </DewButton>
          </div>
        </div>
      </main>
    </>
  );
}
