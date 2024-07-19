"use client";

import { Button } from "@/components/ui";
import { useRouter } from "next/navigation";

export default function Congrats() {
  const { push } = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center gap-2 flex-col w-full text-center">
      <h1 className="font-bold text-4xl">Congratulations !</h1>
      <h2 className="text-lg">You´re account has been created with success !</h2>
      <Button text="Back to home" onClick={() => push("/auth/login")} />
    </div>
  );
}
