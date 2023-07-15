import Image from "next/image";
import { prisma } from "@/prisma/prisma";
import { User } from "@prisma/client";
import Link from "next/link";
import DeleteButton from "./delete";

type Users = User[];

export default async function Home() {
  const users: Users = await fetch("http://localhost:3000/api/users", {
    method: "GET",
    next: {
      tags: ['users'],
      revalidate: 0
    }
  }).then((res) => res.json());
  // const users = await prisma.user.findMany();
  return (
    <main style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>
      <Link className="p-2 m-4 border-2 border-black" href={"/new_user"}>
        Add User
      </Link>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: 20,
        }}
      >
        {users.map((user) => (
          <div
            key={user.id}
            style={{ border: "1px solid #ccc", textAlign: "center" }}
          >
            <img
              src={`https://robohash.org/${user.id}?set=set2&size=180x180`}
              alt={user.fullName}
              style={{ height: 180, width: 180 }}
            />
            <h3>{user.fullName}</h3>
            <p>{user.email}</p>
            <p>{user.role}</p>
            <DeleteButton id={user.id}></DeleteButton>
          </div>
        ))}
      </div>
    </main>
  );
}
