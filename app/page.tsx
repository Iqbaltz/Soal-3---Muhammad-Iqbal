import { getServerSession } from "next-auth";
import BasicNavbar from "../src/components/navbar";
import { authOptions } from "@/src/utils/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <BasicNavbar isLoggedIn={!!session} />
      <main className="mx-4 lg:mx-20 mt-20">
        <h1 className="text-2xl w-fit px-12 mx-auto py-8 bg-zinc-900">
          Welcome!, Please login/register to manage inventory
        </h1>
      </main>
    </>
  );
}
