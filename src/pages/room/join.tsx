import { api } from "@/utils/api";

export default function JoinRoomPage() {
  const room = api.room.create.useMutation();

  function createRoom() {
    room.mutate({ name: "test room" });
  }
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            <span className="text-[hsl(280,100%,70%)]">dewdayte</span>
          </h1>
          <p className="text-2xl text-white">
            {room.data ? room.data.id : "Loading tRPC query..."}
          </p>
          <button className="text-white" onClick={createRoom}>
            the join page
          </button>
        </div>
      </main>
    </>
  );
}
