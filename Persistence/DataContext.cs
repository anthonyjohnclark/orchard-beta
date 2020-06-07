using System;
using Microsoft.EntityFrameworkCore;
using Domain;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Product> Products { get; set; }


        // protected override void OnModelCreating(ModelBuilder builder)
        // {
        //     builder.Entity<Product>().HasData(

        //     );
        // }
    }

}
