import { api } from "@/utils/api";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function CreateRoomPage() {
  const router = useRouter();
  const room = api.room.create.useMutation();

  const [name, setName] = useState<string | null>(null);

  function createRoom() {
    if (!name) return;
    room.mutate({ name });
  }

  function handleNameInput(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;
    setName(target.value);
  }

  useEffect(() => {
    if (!room.data) return;
    router.push(`/room/${room.data.id}`).catch((err) => console.error(err));
  }, [room.data, router]);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            <Link href="/">
              <span className="text-[hsl(280,100%,70%)]">dewdayte</span>
            </Link>
          </h1>
          <p className="text-white">enter a name for the room</p>
          <input onChange={handleNameInput} />
          <button className="text-white" onClick={createRoom}>
            create
          </button>
        </div>
      </main>
    </>
  );
}
