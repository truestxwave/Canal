using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Canal.Api.Models
{
    public class Ticket
    {
        // TicketNumber is PK
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int TicketNumber { get; set; }

        // FK to Project
        [Required]
        public int ProjectId { get; set; }

        [Required]
        public string Requester { get; set; } = null!;

        [Required]
        public string Description { get; set; } = null!;

        [Required]
        public string Status { get; set; } = "Open";

        // Navigation property
        [ForeignKey(nameof(ProjectId))]  // explicitly map FK
        public Project Project { get; set; } = null!;
    }
}
