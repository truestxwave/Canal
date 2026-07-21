import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { getProjects, createTicket} from "../api/client";

type Project = {
  id: number;
  name: string;
  description?: string;
};

const TicketCreation: React.FC = () => {
    const navigate = useNavigate();
    
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        ticketNumber: "",
        projectId: "",
        description: "",
        requester: "",
        status: "Open",
    });

    const [error , setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await getProjects();
                setProjects(data);
            } catch (error) {
                setError("Failed to load projects");
            } finally {
                setLoading(false);
            }   
         };
         loadProjects();
    }, []);
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement| HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            await createTicket({
                ticketNumber: Number(formData.ticketNumber),
                projectId: Number(formData.projectId),
                description: formData.description,
                requester: formData.requester,
                status: formData.status
            });
            
            setSuccess("Ticket created successfully");
            setFormData({
                ticketNumber: "",
                projectId: "",
                description: "",
                requester: "",
                status: "Open",
            });

            setTimeout(() => {
                navigate("/dashboard");
            }, 1500);
        } catch (error) {
            setError("Failed to create ticket");
        }
    };
     
    if (loading) {
        return (
            <div className="container mt-5">
            loading projects...
            </div>
        );      
    }
        
    return (
        <div className="container mt-5">
            <div className="card shadow-lg">

            <div className="card-header bg-primary text-white">
            <h3 className="mb-0">
                Create Ticket
                </h3>
            </div>

                <div className="card-body">
                    
                    {success && (
                        <div className="alert alert-success">{success}</div>
                    )}
                    {error && (
                        <div className="alert alert-danger">{error}</div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">
                                Ticket Number
                            </label>
                            
                            <input
                                type="number"
                                className="form-control"
                                name="ticketNumber"
                                value={formData.ticketNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Project
                            </label>

                            <select
                                className="form-select"
                                name="projectId"
                                value={formData.projectId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">
                                    Select a project
                                </option>
                                {projects.map((project) => (
                                    <option key={project.id} 
                                    value={project.id}
                                    >
                                        {project.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Requester
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                name="requester"
                                value={formData.requester}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Description
                            </label>

                            <textarea
                                className="form-control"
                                rows={5}
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">
                        Status
                    </label>

                    <select
                        className="form-select"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Create Ticket
                </button>   

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/dashboard")}
                >
                    Cancel
                </button>
            </form>
        </div>
    </div>
</div>
            
        
    );
};

export default TicketCreation;
