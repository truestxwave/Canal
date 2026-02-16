using Microsoft.EntityFrameworkCore;
using Canal.LoginAPI.Models;

namespace Canal.LoginAPI.Data
{
    



    public class AppDbContext : DbContext
    {
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    }
}

    
    
  

