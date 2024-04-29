import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { Button } from "~/components/ui/button";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="flex flex-col justify-center pb-10">
          <h1 className="text-4xl font-bold">Welcome to Plot.ai</h1>
        </div>
        <div className="flex items-center justify-center">
          <div className="pr-2">
            <Button>Create a Model</Button>
          </div>
          <div>
            <Button variant="outline">Start a Search</Button>
          </div>
        </div>
      </main>
    </>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
