import Link from "next/link";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import DewButton from "@/components/DewButton";
import DewTextInput from "@/components/DewTextInput";
import { useState, useEffect } from "react";

export default function SpacePage() {
  const router = useRouter();

  const [mode, setMode] = useState<"view" | "edit">("view");

  const taskId = (router.query.id ?? null) as string | null;

  const task = api.task.get.useQuery({ id: taskId ?? "" });

  useEffect(() => {
    if (router.query.edit == "true") {
      setMode("edit");
    }
  }, [router.query.edit]);

  return (
    <>
      <main className="flex min-h-screen flex-col p-6">
        <div className="flex justify-between">
          <Link href={`/space/${task.data?.spaceId}`}>leave</Link>
          <DewButton type="primary">edit</DewButton>
        </div>
        <h1>{task.data ? task.data.id : "Loading..."}</h1>
        {mode === "edit" ? <input /> : <span>Name</span>}
        <span>Due</span>
        <span>Description</span>
        <span>
          powered by <span className="text-brand-purple">dewdayte</span>
        </span>
      </main>
    </>
  );
}
