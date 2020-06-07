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


        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Product>().HasData(
                //         new Product {  
                //     Id = 54289214,
                //      organic: true,
                //      Name: "Fuji",
                //      onSale: true,
                //      soldBy: "lb",
                //      caseSize: response.data,
                //      retailPrice: response.data,
                //      sold: response.data,
                //      shrink: response.data,
                //      expectedInv: response.data,
                //      expectedFloor: response.data,
                //      par: response.data,
                //      isActive: response.data,
                //    },
                //   {
                //     vin: 1202556211,
                //     organic: false,
                //     name: "Gala Apples",
                //     onSale: false,
                //     soldBy: "lb",
                //     caseSize: 40,
                //     retailPrice: 3.99,
                //     sold: 45,
                //     shrink: 10,
                //     expectedInv: 2,
                //     expectedFloor: 0.8,
                //     par: 2,
                //     isActive: true,
                //   },
                // ], },
                new Product { Id = 2, Name = "Fuji", organic = true, onSale = true, soldBy = "lb", caseSize = 40, retailPrice = 45 },
                new Product { Id = 3, Name = "suck it thrice" },
                new Product { Id = 4, Name = "suck it four" }
            );
        }
    }

}
