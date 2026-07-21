import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../api/client";
import {
  getProjects,
  getTickets,
} from "../api/client";

import { Link } from "react-router-dom";

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
  const [user, setUser] = useState<any>(null);

  const [projects, setProjects] =
    useState<Project[]>([]);

  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  const [tickets, setTickets] =
    useState<Ticket[]>([]);

  const [loadingProjects, setLoadingProjects] =
    useState(true);

  const [loadingTickets, setLoadingTickets] =
    useState(false);

  // Load logged-in user
  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
      } catch (error) {
        console.error(
          "Failed to load user:",
          error
        );
      }
    };

    loadUser();
  }, []);

  // Load projects from API
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error(
          "Failed to load projects:",
          error
        );
      } finally {
        setLoadingProjects(false);
      }
    };

    loadProjects();
  }, []);

  // Load tickets when project selected
  useEffect(() => {
    if (!selectedProject) return;

    const loadTickets = async () => {
      try {
        setLoadingTickets(true);

        const data = await getTickets(
          selectedProject.id
        );

        setTickets(data);
      } catch (error) {
        console.error(
          "Failed to load tickets:",
          error
        );
      } finally {
        setLoadingTickets(false);
      }
    };

    loadTickets();
  }, [selectedProject]);

  return (
    <div className="container my-5">
      <h1 className="mb-4">
        Projects Dashboard
      </h1>

      {/* Logged in user */}
      {user && (
        <div className="alert alert-secondary mb-4">
          Logged in as:
          <strong className="ms-2">
            {user.name}
          </strong>
          <span className="ms-2 text-muted">
            ({user.email})
          </span>
        </div>
      )}

      {/* Projects */}
      <h3 className="mb-3">Projects</h3>

      {loadingProjects ? (
        <p>Loading projects...</p>
      ) : projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div className="row g-3 mb-4">
          {projects.map((project) => (
            <div
              className="col-md-6"
              key={project.id}
            >
              <div
                className={`card shadow-sm ${
                  selectedProject?.id ===
                  project.id
                    ? "border-primary"
                    : ""
                }`}
                style={{
                  cursor: "pointer",
                }}
                onClick={() =>
                  setSelectedProject(project)
                }
              >
                <div className="card-body">
                  <h5 className="card-title">
                    {project.name}
                  </h5>

                  <p className="card-text">
                    {project.description ||
                      "No description"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}


      {/* Create Ticket Button */}

      <div className="d-flex justify-content-between align-items-center mb-3">
  <h5 className="mb-0">
    Tickets for {selectedProject?.name}
  </h5>

  <Link
    to="/create-ticket"
    className="btn btn-success"
  >
    + Create Ticket
  </Link>
</div>

      {/* Tickets */}
      {selectedProject && (
        <div className="card shadow">
          <div className="card-header">
            <h5 className="mb-0">
              Tickets for{" "}
              {selectedProject.name}
            </h5>
          </div>

          <div className="card-body">
            {loadingTickets ? (
              <p>Loading tickets...</p>
            ) : tickets.length === 0 ? (
              <p>No tickets found.</p>
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
                    <tr
                      key={
                        ticket.ticketNumber
                      }
                    >
                      <td>
                        {
                          ticket.ticketNumber
                        }
                      </td>

                      <td>
                        {
                          ticket.description
                        }
                      </td>

                      <td>
                        {ticket.requester}
                      </td>

                      <td>
                        {ticket.status}
                      </td>

                      <td>
                        {ticket.priority ||
                          "-"}
                      </td>
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