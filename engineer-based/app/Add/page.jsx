"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddEngineer() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [techStack, setTechStack] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:8080/api/v1/software-engineers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, techStack }),
    });

    router.push("/");
  };

  return (
    <div>
      <h1>Add New Engineer</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="techStack"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
          required
        />
        <button type="submit">Add Engineer</button>
        
      </form>
    </div>
  );
}
