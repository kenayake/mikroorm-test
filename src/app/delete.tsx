"use client";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();

  const handleClick = async () => {
    const res = await fetch(`http://localhost:3000/api/${id}`, {
      method: "DELETE"
    })
      .then(async (e) => alert(await e.clone().text()))
      .then((_) => router.replace("/"));
  };

  return (
    <button
      className="p-2 m-4 border-2 border-black"
      onClick={async () => await handleClick()}
    >
      Delete
    </button>
  );
}
