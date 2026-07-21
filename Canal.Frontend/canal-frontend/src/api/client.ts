import { MAIN_API } from "./ApiConfig";

// Helper to always get token safely
const getToken = () => localStorage.getItem("token");




export async function getCurrentUser() {
  const res = await fetch(
    `${MAIN_API}/api/auth/me`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch user");

  return res.json();
}

// -------------------- PROJECTS --------------------
type CreateProjectRequest = {
  name: string;
  description: string;
  status?: string;
};

export async function getProjects() {
  const res = await fetch
  (`${MAIN_API}/api/projects`, {
    method : "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch projects");

  return res.json();

  
}

export async function createProject(project: CreateProjectRequest) {
  const res = await fetch(`${MAIN_API}/api/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      name: project.name,
      description: project.description,
      status: project.status,
    }),
  });

  if (!res.ok) throw new Error("Failed to create project");

  return res.json();
}

// -------------------- TICKETS --------------------

export async function getTickets(projectId: number) {
  const res = await fetch(
    `${MAIN_API}/api/tickets/${projectId}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch tickets");

  return res.json();
}
type CreateTicketRequest = {
  ticketNumber: number;
  projectId: number;
  description: string;
  requester: string;
  status: string;
};

export async function createTicket(ticket: CreateTicketRequest) {
  const res = await fetch(
    `${MAIN_API}/api/tickets/${ticket.projectId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        ticketNumber: ticket.ticketNumber,
        description: ticket.description,
        requester: ticket.requester,
        status: ticket.status,
    }),
    }
  );

  if (!res.ok) throw new Error("Failed to create ticket");

  return res.json();
}

 
 
 

  
