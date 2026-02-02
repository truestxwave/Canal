namespace Canal.Api.Models
{


public class Ticket
{
    public int Id { get; set; }
    public int ProjectId { get; set; } // link to project
    public string Requester { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string Status { get; set; } = "Open"; // Open, In Progress, Done, Closed
     public Project Project { get; set; } = null!;
}
}
