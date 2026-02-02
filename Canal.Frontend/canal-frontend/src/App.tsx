import { useEffect, useState } from "react";
import { getProjects } from "./api/client";

type Project = {
  id: number;
  name: string;
};

function App() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjects().then(setProjects).catch(console.error);
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Projects</h1>
      <ul>
        {projects.map(p => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
