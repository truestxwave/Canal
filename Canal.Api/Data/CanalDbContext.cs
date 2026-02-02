using Microsoft.EntityFrameworkCore;
using Canal.Api.Models;
// Data context for Canal application
namespace Canal.Api.Data
{
    public class CanalDbContext : DbContext
    {
        public CanalDbContext(DbContextOptions<CanalDbContext> options)
            : base(options)
        { }

        public DbSet<Project> Projects { get; set; } // Make sure this exists
        public DbSet<Ticket> Tickets { get; set; } // Make sure this exists
    }
}
