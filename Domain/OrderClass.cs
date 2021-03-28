using System.Collections.Generic;
using System;

namespace Domain
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime dateOrdered { get; set; }
        public int piecesOrdered { get; set; }
        public double orderTotal { get; set; }
        public List<OrderItems> orderedProducts { get; set; }
    }
}

