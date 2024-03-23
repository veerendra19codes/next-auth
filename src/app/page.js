import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Logout from "@/components/logout/logout";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await  getServerSession(authOptions);
  if(!session) {
    redirect("/login");
  }
  console.log(session);

  return (
    <div className="flex justify-center items-center h-screen w-full flex-col">
      <h1>Home</h1>
      { session ? (
        <div className="w-full flex flex-col justify-center items-center">
        <h1>Welcome, {session.user?.username}</h1>
        <Logout />

        </div>
      ) : (
        <Link href="/login">
        <button className="logout py-2 px-4 bg-green-500 rounded-xl text-white">
          Log In 
        </button>
        </Link>
      )}
    </div>
  )
}
