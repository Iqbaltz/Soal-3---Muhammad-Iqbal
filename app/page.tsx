import { getServerSession } from "next-auth";
import BasicNavbar from "./components/navbar";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <BasicNavbar isLoggedIn={!!session} />
      <main className="mx-4 lg:mx-20 mt-20">
        <h1>home</h1>
      </main>
    </>
  );
}
