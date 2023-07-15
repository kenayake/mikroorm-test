"use client";
import { prisma } from "@/prisma/prisma";
import { Role } from "@prisma/client";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

interface Fields {
  fullName: string;
  email: string;
  password: string;
  role?: Role;
}

export default function AddUser() {
  const router = useRouter();

  const [fields, setFields] = useState<Fields>({
    fullName: "",
    email: "",
    password: "",
  });

  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const id = event.target.id;
    const value = event.target.value;
    setFields((values) => ({ ...values, [id]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await fetch("http://mikroorm-test-git-master-thohgc.vercel.app/api/users", {
      method: "POST",
      body: JSON.stringify({
        fullName: fields.fullName,
        email: fields.email,
        password: fields.password,
        role: fields.role as Role,
      }),
    })
      .then(async (e) => alert(await e.clone().text()))
      .then((_) => router.replace("/"));
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex flex-col space-y-5 w-fit"
    >
      <label htmlFor="fullName">
        fullName
        <input
          type="text"
          id="fullName"
          value={fields.fullName}
          onChange={(e) => handleFieldChange(e)}
          className="border-2 border-black"
        />
      </label>
      <label htmlFor="email">
        email
        <input
          type="text"
          id="email"
          value={fields.email}
          onChange={(e) => handleFieldChange(e)}
          title="Email"
          className="border-2 border-black"
        />
      </label>

      <label htmlFor="password">
        password
        <input
          type="text"
          id="password"
          value={fields.password}
          onChange={(e) => handleFieldChange(e)}
          className="border-2 border-black"
        />
      </label>
      <label htmlFor="role">
        Role
        <select
          id="role"
          value={fields.role}
          onChange={(e) => handleFieldChange(e)}
          className="border-2 border-black"
          required
        >
          <option value="" disabled selected className="hidden"></option>
          <option value={Role.STUDENT}>Student</option>
          <option value={Role.LECTURER}>Lecturer</option>
          <option value={Role.STAFF}>Staff</option>
        </select>
      </label>
      <button
        type="submit"
        className="p-1 border-2 border-black"
      >Submit</button>
    </form>
  );
}
