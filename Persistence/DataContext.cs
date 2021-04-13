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
        public DbSet<OrderItemProduct> OrderItemProduct { get; set; }
        public DbSet<FloorObjects> FloorObjects { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OrderItemProduct>()
             .HasKey(t => new { t.ProductId, t.OrderId });

            modelBuilder.Entity<OrderItemProduct>()
             .HasOne(pt => pt.Product)
             .WithMany(p => p.OrderItemProducts)
             .HasForeignKey(pt => pt.ProductId);

            modelBuilder.Entity<OrderItemProduct>()
             .HasOne(pt => pt.Order)
             .WithMany(t => t.OrderItemProducts)
             .HasForeignKey(pt => pt.OrderId);
        }

    }
}
