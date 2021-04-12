import { IProductsWithInput } from "../models/InvOrderModels/IProducts";
import { IFilterConfig, ISortConfig, ISortConfigForHeaders } from "../models/InvOrderModels/ISortFilterConfig";

class ProductManipulator   {

public static CreateOrderedProducts = (inputs:IProductsWithInput[]) =>{
let orderedProducts = inputs.filter(((products:any) => products.order > 0)).map((products) =>  (
    {
    productId: products.productId,  
    organic: products.organic,
    productActive:products.productActive,
    onSale:products.onSale,
    vin: products.vin,
    name: products.name,
    order:  products.order,
    totalCost: products.order * products.cost
  }));
  return orderedProducts;
}

 public static SearchFilteredProducts = (inputs:IProductsWithInput[], searchText:string) => 
    inputs.filter((products) => {
     return (
       products.name.toString().toLowerCase().indexOf(searchText) >= 0 ||
       products.id.toString().indexOf(searchText) >= 0
    );
   });


public static FilterProducts = (inputs:IProductsWithInput[], filterConfig:IFilterConfig) => {
  let filteredProducts =
     inputs.filter((products) => {
     if (filterConfig !== null) {
       switch (filterConfig.id) {
         case 1:
           return products[filterConfig.primaryKey];
         case 2:
         case 4:
         case 5:
           return (
             products[filterConfig.primaryKey] &&
             products[filterConfig.secondaryKey]
           );
         case 3:
           return (
             products[filterConfig.primaryKey] &&
             !products[filterConfig.secondaryKey]
           );
         case 6:
         case 7:
         case 9:
           return (
             !products[filterConfig.primaryKey] &&
             products[filterConfig.secondaryKey]
           );
         case 8:
           return (
             !products[filterConfig.primaryKey] &&
             !products[filterConfig.secondaryKey]
           );
         case 10:
           return !products[filterConfig.primaryKey];
       }
     }
     return [...inputs];
    });
    return filteredProducts;
  }

public static SortProducts = (inputs:IProductsWithInput[], sortConfig:ISortConfig, sortConfigForHeaders:ISortConfigForHeaders) => 
{
if (sortConfigForHeaders.key !== "" && sortConfig.primaryKey === "") {
  let sortedProductsHeaders =
  inputs.sort((a, b) => {
    if (a[sortConfigForHeaders.key] < b[sortConfigForHeaders.key]) {
      return sortConfigForHeaders.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfigForHeaders.key] > b[sortConfigForHeaders.key]) {
      return sortConfigForHeaders.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });
  console.log(sortConfigForHeaders)
  return sortedProductsHeaders;
}


if (sortConfig.primaryKey !== "") {
  if (sortConfig.direction === "normal") {
    let sortedProducts =
    inputs.sort((a:any, b:any) => {
      return (
        b[sortConfig.primaryKey] - a[sortConfig.primaryKey] ||
        b[sortConfig.secondaryKey] - a[sortConfig.secondaryKey] ||
        b[sortConfig.tertiaryKey] - a[sortConfig.tertiaryKey]
      );
    });
    return sortedProducts;

  } else if (sortConfig.direction === "reverse1") {
    let sortedProducts =
    inputs.sort((a:any, b:any) => {
      return (
        a[sortConfig.primaryKey] - b[sortConfig.primaryKey] ||
        b[sortConfig.secondaryKey] - a[sortConfig.secondaryKey] ||
        b[sortConfig.tertiaryKey] - a[sortConfig.tertiaryKey]
      );
    });
    return sortedProducts;

  } else if (sortConfig.direction === "reverse2") {
    let sortedProducts =
    inputs.sort((a:any, b:any) => {
      return (
        b[sortConfig.primaryKey] - a[sortConfig.primaryKey] ||
        a[sortConfig.secondaryKey] - b[sortConfig.secondaryKey] ||
        b[sortConfig.tertiaryKey] - a[sortConfig.tertiaryKey]
      );
    });
    return sortedProducts;

  } else if (sortConfig.direction === "reverse1and2") {
    let sortedProducts =
    inputs.sort((a:any, b:any) => {
      return (
        a[sortConfig.primaryKey] - b[sortConfig.primaryKey] ||
        a[sortConfig.secondaryKey] - b[sortConfig.secondaryKey] ||
        b[sortConfig.tertiaryKey] - a[sortConfig.tertiaryKey]
      );
    });
    return sortedProducts;
  }
}
return [...inputs];
}
  }
export default ProductManipulator; 