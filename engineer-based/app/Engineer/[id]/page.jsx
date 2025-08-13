"use client";

import { useEffect, useState } from "react";

export default function EngineerDetails({ params }) {
  const { id } = params; 
  const [engineer, setEngineer] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/software-engineers/${id}`)
      .then((res) => res.json())
      .then((data) => setEngineer(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!engineer) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{engineer.name}</h1>
      <p>techStack: {engineer.techStack}</p>
    </div>
  );
}
