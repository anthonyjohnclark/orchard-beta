using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Domain;

namespace Domain
{
    public class OrderItemProduct
    {
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; }

        public double totalCost { get; set; }

        public double ordered { get; set; }

    }
}
