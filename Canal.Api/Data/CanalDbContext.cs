using Microsoft.EntityFrameworkCore;

 namespace Canal.Api.Data
{
    public class CanalDbContext : DbContext
    {
        public CanalDbContext(DbContextOptions<CanalDbContext> options)
            : base(options)
        {
        }
    }
}
