import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../api/AuthApi";

type Project = {
  id: number;
  name: string;
  description?: string;
};

type Ticket = {
  ticketNumber: number;
  projectId: number;
  description: string;
  requester: string;
  status: string;
  priority?: "Low" | "Medium" | "High";
};

const Dashboard: React.FC = () => {

  // ✅ FIX: add user state
  const [user, setUser] = useState<any>(null);

  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  // ✅ Load logged-in user
  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
      } catch (error) {
        console.error("Not logged in:", error);
      }
    };

    loadUser();
  }, []);

  // Dummy projects
  useEffect(() => {
    setProjects([
      { id: 1, name: "Website Redesign", description: "Update homepage" },
      { id: 2, name: "Backend API", description: "Add endpoints" },
    ]);
  }, []);

  // Dummy tickets
  useEffect(() => {
    if (!selectedProject) return;

    setTickets([
      {
        ticketNumber: 1,
        projectId: selectedProject.id,
        description: "Fix login bug",
        requester: "Alice",
        status: "Open",
        priority: "High",
      },
      {
        ticketNumber: 2,
        projectId: selectedProject.id,
        description: "Update UI",
        requester: "Bob",
        status: "In Progress",
        priority: "Medium",
      },
    ]);
  }, [selectedProject]);

  return (
    <div className="container my-5">

      <h1 className="mb-3">Projects Dashboard</h1>

      {/* ✅ SHOW USER */}
      {user && (
        <div className="alert alert-secondary mb-4">
          Logged in as: <strong>{user.name}</strong> ({user.email})
        </div>
      )}

      {/* Projects list */}
      <div className="row g-3 mb-4">
        {projects.map((project) => (
          <div className="col-md-6" key={project.id}>
            <div
              className={`card ${
                selectedProject?.id === project.id ? "border-primary" : ""
              }`}
              onClick={() => setSelectedProject(project)}
              style={{ cursor: "pointer" }}
            >
              <div className="card-body">
                <h5 className="card-title">{project.name}</h5>
                <p className="card-text">
                  {project.description || "No description"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tickets */}
      {selectedProject && (
        <div className="card shadow mb-4">
          <div className="card-header">
            <h5 className="mb-0">
              Tickets for {selectedProject.name}
            </h5>
          </div>

          <div className="card-body">
            {tickets.length === 0 ? (
              <p>No tickets yet</p>
            ) : (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Ticket #</th>
                    <th>Description</th>
                    <th>Requester</th>
                    <th>Status</th>
                    <th>Priority</th>
                  </tr>
                </thead>

                <tbody>
                  {tickets.map((ticket) => (
                    <tr key={ticket.ticketNumber}>
                      <td>{ticket.ticketNumber}</td>
                      <td>{ticket.description}</td>
                      <td>{ticket.requester}</td>
                      <td>{ticket.status}</td>
                      <td>{ticket.priority || "-"}</td>
                    </tr>
                  ))}
                </tbody>

              </table>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;