using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class OrderItems
    {
        [Key, ForeignKey("Product")]
        public int ProductId { get; set; }
        public Order Order { get; set; }
        public double totalCost { get; set; }
        public int ordered { get; set; }
        public Product Product { get; set; }
    }
}
