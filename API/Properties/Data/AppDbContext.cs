using APIrestfullC_.Properties.Models;
using Microsoft.EntityFrameworkCore;

namespace APIrestfullC_.Properties.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Produto> Produtos { get; set; }
    }
}
