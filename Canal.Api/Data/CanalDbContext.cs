using Microsoft.EntityFrameworkCore;
using Canal.Api.Models;

namespace Canal.Api.Data
{
    public class CanalDbContext : DbContext
    {
        public CanalDbContext(DbContextOptions<CanalDbContext> options)
            : base(options)
        { }

        public DbSet<Project> Projects { get; set; } // Make sure this exists
    }
}
