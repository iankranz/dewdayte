import Link from "next/link";
import { api } from "@/utils/api";
import { useRouter } from "next/router";

export default function CreateRoomPage() {
  const router = useRouter();
  const room = api.room.get.useQuery({ id: router.query.id as string });
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            <Link href="/">
              <span className="text-[hsl(280,100%,70%)]">dewdayte</span>
            </Link>
          </h1>
          <p className="text-2xl text-white">
            Welcome to {room.data ? room.data.name : "no room name"}
          </p>
          <p className="text-white">This is a room</p>
          <p className="text-white">
            The id of this room is: {room.data ? room.data.id : "no room id"}
          </p>
          <Link href="/">
            <button className="text-white">exit</button>
          </Link>
        </div>
      </main>
    </>
  );
}
