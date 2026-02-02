// Handles Projects
export async function getProjects() {
  const res = await fetch("http://localhost:5056/api/projects");
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function createProject(name: string, description: string) {
  const res = await fetch("http://localhost:5056/api/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description }),
  });

  if (!res.ok) throw new Error("Failed to create project");
  return res.json();
}

// Handles Tickets

// Fetch tickets for a specific project
export async function getTickets(projectId: number) {
  const res = await fetch(`http://localhost:5056/api/tickets/${projectId}`);
  if (!res.ok) throw new Error("Failed to fetch tickets");
  return res.json();
}

// Create a new ticket for a specific project
export async function createTicket(
  
  projectId: number,
  description: string,
  Requester: string,
  status: string
) {
  const res = await fetch(`http://localhost:5056/api/tickets/${projectId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ Requester, description, status }),
  });

  if (!res.ok) throw new Error("Failed to create ticket");
  return res.json();
}
