using Microsoft.EntityFrameworkCore;
using Canal.Api.Models;

namespace Canal.Api.Data
{
    public class CanalDbContext : DbContext
    {
        public CanalDbContext(DbContextOptions<CanalDbContext> options) : base(options) { }

        public DbSet<Project> Projects { get; set; } = null!;
        public DbSet<Ticket> Tickets { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // PK
            modelBuilder.Entity<Ticket>().HasKey(t => t.TicketNumber);

            // Relationship
            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.Project)
                .WithMany(p => p.Tickets)
                .HasForeignKey(t => t.ProjectId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
