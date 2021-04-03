using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItems> OrderedItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OrderItems>(entity =>
                    {
                        entity.HasKey(z => z.OrderItemsId);
                        entity.HasOne(p => p.Product)
                             .WithOne(a => a.OrderItems)
                             .HasForeignKey<OrderItems>(a => a.ProductId);
                    });
        }

    }
}
