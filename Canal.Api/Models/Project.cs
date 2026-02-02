using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Canal.Api.Models

// Represents a project entity in the Canal application
{
    public class Project
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public string Name { get; set; }
        
        public string? Description { get; set; }
        
        public ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
    }
}