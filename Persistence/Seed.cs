// using System.Collections.Generic;
// using System.Linq;
// using Domain;

// namespace Persistence
// {
//     public class Seed
//     {
//         public static void SeedData(DataContext context)
//         {
//             if (!context.Products.Any())
//             {
//                 var products = new List<Product>
// {
// new Product
//     {
//                       organic = true,
//                       Name = "Fuji Apples",
//                       onSale = false,
//                      soldBy = "lb",
//                      caseSize = 40,
//                       retailPrice = 2.99,
//                       sold = 75,
//                       shrink = 25.7,
//                       expectedInv = 2,
//                      expectedFloor = 1,
//                       par = 3,
//                       productActive = true,
//                       percentSales = 7,
//                       cost = 50.99,
//                       fill = 3
//                     },
// new Product
//     {
//                       organic = true,
//                       Name = "Gala Apples",
//                       onSale = true,
//                      soldBy = "lb",
//                      caseSize = 40,
//                       retailPrice = 1.99,
//                       sold = 80,
//                       shrink = 28,
//                       expectedInv = 2.5,
//                      expectedFloor = 1.5,
//                       par = 5,
//                       productActive = true,
//                       percentSales = 6.5,
//                       netGIG = 60.97,
//                       cost = 44.99,
//                       fill = 3
//                     },
//                     new Product
//     {
//                       organic = true,
//                       Name = "Kale",
//                       onSale = true,
//                      soldBy = "bunch",
//                      caseSize = 25,
//                       retailPrice = 4.99,
//                       sold = 60,
//                       shrink = 15,
//                       expectedInv = 1,
//                      expectedFloor = 2,
//                       par = 1,
//                       productActive = true,
//                       percentSales = 6,
//                       netGIG = 55.43,
//                       cost = 44.99,
//                       fill = 2
//                     },
//                     new Product
//     {
//                       organic = true,
//                       Name = "Red Kale",
//                       onSale = false,
//                      soldBy = "lb",
//                      caseSize = 25,
//                       retailPrice = 4.99,
//                       sold = 35,
//                       shrink = 10,
//                       expectedInv = 1,
//                      expectedFloor = 2,
//                       par = 1,
//                       productActive = true,
//                       percentSales = 5,                
//                       netGIG = 55.43,
//                       cost = 44.99,
//                        fill = 2
//                     },

//                     new Product
//     {
//                       organic = true,
//                       Name = "Yams",
//                       onSale = false,
//                      soldBy = "lb",
//                      caseSize = 40,
//                       retailPrice = 1.99,
//                       sold = 15,
//                       shrink = 10,
//                       expectedInv = 1 ,
//                      expectedFloor = 2,
//                       par = 2,
//                       productActive = true,
//                       percentSales = 5,
//                       netGIG = 42.97,
//                       cost = 32.99,
//                       fill = 2                                                       
//                     },
//                     new Product
//     {
//                       organic = false,
//                       Name = "Broccoli",
//                       onSale = true,
//                      soldBy = "lb",
//                      caseSize = 40,
//                       retailPrice = 1.99,
//                       sold = 55,
//                       shrink = 25,
//                       expectedInv = 2,
//                      expectedFloor = 1,
//                       par = 3,
//                       productActive = true,
//                       percentSales = 4,
//                       netGIG = 30.97,
//                       cost = 19.99,
//                       fill = 2
//                    },
//                     new Product
//     {
//                       organic = false,
//                       Name = "HoneyCrisp Apples",
//                       onSale = false,
//                      soldBy = "lb",
//                      caseSize = 40,
//                       retailPrice = 5.99,
//                       sold = 20,
//                       shrink = 5,
//                       expectedInv = 0,
//                      expectedFloor = 2,
//                       par = 1,
//                       productActive = true,
//                       percentSales = 6,
//                       netGIG = 32.97,
//                       cost = 23.99,
//                       fill = 6


//                     },
//                     new Product
//     {
//                       organic = false,
//                       Name = "Avocados",
//                       onSale = false,
//                      soldBy = "each",
//                      caseSize = 35,
//                       retailPrice = 1.99,
//                       sold = 105,
//                       shrink = 55,
//                       expectedInv = 5,
//                      expectedFloor = 4,
//                       par = 10,
//                       productActive = true,
//                       percentSales = 8,
//                       netGIG = 32.97,
//                       cost = 23.99,
//                       fill = 12
//                     },
//                     new Product
//     {
//                       organic = false,
//                       Name = "Watermelon",
//                       onSale = true,
//                      soldBy = "each",
//                      caseSize = 80,
//                       retailPrice = 1.99,
//                       sold = 0,
//                       shrink = 0,
//                       expectedInv = 0,
//                      expectedFloor = 1,
//                       par = 0,
//                       productActive = false,
//                       percentSales = 9,
//                       netGIG = 66.97,
//                       cost = 107.99,
//                       fill = 1
//                     },
//                     new Product
//     {
//                       organic = true,
//                       Name = "Chard",
//                       onSale = true,
//                      soldBy = "bunch",
//                      caseSize = 25,
//                       retailPrice = 2.99,
//                       sold = 18,
//                       shrink = 3,
//                       expectedInv = 0,
//                      expectedFloor = 1,
//                       par = 1,
//                       productActive = true,
//                       percentSales = 3.33,
//                       netGIG = 72.97,
//                       cost = 61.99,
//                       fill = 1
//                     },
//                     new Product
//     {
//                       organic = true,
//                       Name = "Bananas",
//                       onSale = false,
//                      soldBy = "lb",
//                      caseSize = 40,
//                       retailPrice = .99,
//                       sold = 200,
//                       shrink = 25,
//                       expectedInv = 5,
//                     expectedFloor = 3,
//                     par = 3,
//                     productActive = true,
//                    percentSales = 2,
//                     netGIG = 75.97,
//                     cost = 68.99,
//                       fill = 7
//                     }

//     };
//                 context.Products.AddRange(products);
//                 context.SaveChanges();
//             }
//         }
//     }
// }