// Handles Projects
import { MAIN_API } from "./ApiConfig";

export async function getProjects() {
  const res = await fetch(`${MAIN_API}/api/projects`);

  if (!res.ok) throw new Error("Failed to fetch projects");

  return res.json();
}

export async function createProject(name: string, description: string) {
  const res = await fetch(`${MAIN_API}/api/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`, // IMPORTANT
    },
    body: JSON.stringify({ name, description }),
  });

  if (!res.ok) throw new Error("Failed to create project");

  return res.json();
}
// Handles Tickets

// GET tickets for project
export async function getTickets(projectId: number) {
  const res = await fetch(`${MAIN_API}/api/tickets/${projectId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch tickets");

  return res.json();
}

// CREATE ticket
export async function createTicket(
  ticketNumber: number,
  projectId: number,
  description: string,
  requester: string,
  status: string
) {
  const res = await fetch(`${MAIN_API}/api/tickets/${projectId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      ticketNumber,
      requester,
      description,
      status,
    }),
  });

  if (!res.ok) throw new Error("Failed to create ticket");

  return res.json();
}