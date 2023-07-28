import Link from "next/link";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import DewButton from "@/components/DewButton";

export default function CreateSpacePage() {
  const router = useRouter();
  const space = api.space.get.useQuery({ id: router.query.id as string });
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
