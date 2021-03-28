using System;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }
        public double vin { get; set; }
        public Boolean organic { get; set; }
        public string name { get; set; }
        public Boolean onSale { get; set; }
        public string soldBy { get; set; }
        public int caseSize { get; set; }
        public double retailPrice { get; set; }
        public double sold { get; set; }
        public double shrink { get; set; }
        public double expectedInv { get; set; }
        public double expectedFloor { get; set; }
        public double par { get; set; }
        public Boolean productActive { get; set; }
        public double cost { get; set; }
        public double percentSales { get; set; }
        public double netGIG { get; set; }
        public double fill { get; set; }

        public OrderItems OrderItems { get; set; }

    }
}