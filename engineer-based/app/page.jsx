"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [engineers, setEngineers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/software-engineers")
      .then((res) => res.json())
      .then((data) => setEngineers(data))
      .catch((err) => console.error(err));
  }, []);

   const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this engineer?")) {
      await fetch(`http://localhost:8080/api/v1/software-engineers/${id}`, {
        method: "DELETE",
      });
      loadEngineers(); // Refresh list after deletion
    }
  };

  return (
    <div>
      <h1>Software Engineers</h1>
      <Link href="/Add">Add New Engineer</Link>
      <ul>
        {engineers.map((eng) => (
          <li key={eng.id}>
            <Link href={`/Engineer/${eng.id}`}>
              <strong>{eng.name}</strong> — {eng.techStack}
            </Link>
             <button
              style={{ marginLeft: "10px", color: "red" }}
              onClick={() => handleDelete(eng.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
