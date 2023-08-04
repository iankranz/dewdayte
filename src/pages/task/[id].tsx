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

  const taskId = (router.query.id ?? null) as string | null;

  const task = api.task.get.useQuery({ id: taskId ?? "" });

  return (
    <>
      <main className="flex min-h-screen flex-col p-6">
        <div className="flex justify-between">
          <Link href="/">leave</Link>
          <DewButton type="primary">edit</DewButton>
        </div>
        <h1>{task.data ? task.data.id : "Loading..."}</h1>
        <div className="h-24 w-full bg-spray"></div>
        <span>
          powered by <span className="text-brand-purple">dewdayte</span>
        </span>
      </main>
    </>
  );
}
