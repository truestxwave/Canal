import { useState, useEffect } from "react";
import { getProjects, createProject, getTickets, createTicket } from "./api/client";

type Project = {
  id: number;
  name: string;
  description?: string;
};

type Ticket = {
  ticketNumber: number;
  projectId: number;
  description: string;
  Requester: string;
  status: string;
};

function App() {
  // Projects state
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [creatingProject, setCreatingProject] = useState(false);

  // Selected project for tickets
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Tickets state
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [ticketDescription, setTicketDescription] = useState("");
  const [ticketRequester, setTicketRequester] = useState("");
  const [creatingTicket, setCreatingTicket] = useState(false);
  const [ticketNumber, setTicketNumber] = useState(1); // simple auto-increment per session

  // Fetch projects on load
  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoadingProjects(false));
  }, []);

  // Fetch tickets when selected project changes
  useEffect(() => {
    if (!selectedProject) return;
    getTickets(selectedProject.id)
      .then(setTickets)
      .catch(console.error);
  }, [selectedProject]);

  return (
    <div style={{ padding: 24 }}>
      <h1>Projects</h1>

      {/* Create Project Form */}
      <div style={{ marginBottom: 24 }}>
        <h2>Create New Project</h2>
        <input
          type="text"
          placeholder="Project name"
          value={projectName}
          onChange={e => setProjectName(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <input
          type="text"
          placeholder="Description"
          value={projectDescription}
          onChange={e => setProjectDescription(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <button
          onClick={async () => {
            if (!projectName) return alert("Project name required");
            setCreatingProject(true);
            try {
              await createProject(projectName, projectDescription);
              setProjectName("");
              setProjectDescription("");
              const data = await getProjects();
              setProjects(data);
            } catch (err) {
              console.error(err);
              alert("Failed to create project");
            } finally {
              setCreatingProject(false);
            }
          }}
          disabled={creatingProject}
        >
          {creatingProject ? "Creating..." : "Add Project"}
        </button>
      </div>

      {/* Project List */}
      {loadingProjects ? (
        <p>Loading projects...</p>
      ) : projects.length === 0 ? (
        <p>No projects yet. Create one to get started!</p>
      ) : (
        <ul>
          {projects.map(p => (
            <li key={p.id}>
              <strong
                style={{ cursor: "pointer", textDecoration: selectedProject?.id === p.id ? "underline" : "none" }}
                onClick={() => setSelectedProject(p)}
              >
                {p.name}
              </strong>{" "}
              - {p.description || "No description"}
            </li>
          ))}
        </ul>
      )}

      {/* Tickets Section */}
      {selectedProject && (
        <div style={{ marginTop: 40 }}>
          <h2>Tickets for {selectedProject.name}</h2>

          {/* Add Ticket Form */}
          <div style={{ marginBottom: 16 }}>
            <input
              type="text"
              placeholder="Requester"
              value={ticketRequester}
              onChange={e => setTicketRequester(e.target.value)}
              style={{ marginRight: 8 }}
            />
            <input
              type="text"
              placeholder="Description"
              value={ticketDescription}
              onChange={e => setTicketDescription(e.target.value)}
              style={{ marginRight: 8 }}
            />
            <button
              onClick={async () => {
                if (!ticketRequester || !ticketDescription) return alert("Requester and description required");
                setCreatingTicket(true);
                try {
                  await createTicket(ticketNumber, selectedProject.id, ticketDescription, ticketRequester, "Open");
                  const data = await getTickets(selectedProject.id);
                  setTickets(data);
                  setTicketRequester("");
                  setTicketDescription("");
                  setTicketNumber(prev => prev + 1); // increment ticket number
                } catch (err) {
                  console.error(err);
                  alert("Failed to create ticket");
                } finally {
                  setCreatingTicket(false);
                }
              }}
              disabled={creatingTicket}
            >
              {creatingTicket ? "Creating..." : "Add Ticket"}
            </button>
          </div>

          {/* Tickets List */}
          {tickets.length === 0 ? (
            <p>No tickets yet for this project.</p>
          ) : (
            <ul>
              {tickets.map(t => (
                <li key={t.ticketNumber} style={{ marginBottom: 8 }}>
                  <strong>#{t.ticketNumber} {t.Requester}</strong>: {t.description} - {t.status}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
