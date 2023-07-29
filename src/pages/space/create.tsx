import { api } from "@/utils/api";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import DewButton from "@/components/DewButton";
import DewTextInput from "@/components/DewTextInput";
import Head from "next/head";

export default function CreateSpacePage() {
  const router = useRouter();
  const space = api.space.create.useMutation();

  const [name, setName] = useState<string>("");

  function createSpace() {
    if (!name) return;
    space.mutate({ name });
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
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
      <main className="flex min-h-screen flex-col items-center gap-16 p-6">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          <Link href="/">
            <span className="text-brand-purple">dewdayte</span>
          </Link>
        </h1>
        <div className="flex flex-col gap-8">
          <div className="w-full text-5xl text-brand-purple">
            <Link href="/">&larr;</Link>
          </div>
          <p className="font-spline text-3xl font-bold">
            what should we call this space?
          </p>
          <DewTextInput
            value={name}
            handleChange={handleNameChange}
            label="name"
            htmlFor="space-name"
          />
          <DewButton type="primary" handleClick={createSpace}>
            let’s go
          </DewButton>
        </div>
      </main>
    </>
  );
}
