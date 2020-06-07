using System;

namespace Domain
{

    public class Product
    {
        public int Id { get; set; }
        public Boolean organic { get; set; }
        public string Name { get; set; }
        public Boolean onSale { get; set; }
        public string soldBy { get; set; }
        public int caseSize { get; set; }
        public int retailPrice { get; set; }
        public int sold { get; set; }
        public int shrink { get; set; }
        public int expectedInv { get; set; }
        public int expectedFloor { get; set; }
        public int par { get; set; }
        public Boolean productActive { get; set; }
    }
}