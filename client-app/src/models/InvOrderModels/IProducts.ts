interface IObjectKeys {
    [key: string]: string | number | boolean;
  }

export interface IProducts extends IObjectKeys {
    productId: number;
    vin: number;
    organic: boolean;
    name:string
    onSale: boolean;
    soldBy:string;
    caseSize:number;
    retailPrice:number;
    sold:number;
    shrink:number;
    expectedInv:number;
    expectedFloor:number;
    par:number;
    productActive:boolean;
    cost:number;
    percentSales:number;
    netGIG:number;
    fill:number;
}

export interface IProductsWithInput  extends IObjectKeys {
    productId: number;
    vin: number;
    organic: boolean;
    name:string
    onSale: boolean;
    soldBy:string;
    caseSize:number;
    retailPrice:number;
    sold:number;
    shrink:number;
    expectedInv:number;
    expectedFloor:number;
    par:number;
    productActive:boolean;
    cost:number;
    percentSales:number;
    netGIG:number;
    fill:number;
    inTheBack: number;
    onTheFloor: number;
    order: number;
    sell: number;
    selling: number;
    suggested: number;
}

export interface IOrderedProducts extends IObjectKeys {
    productId: number;    
    organic: boolean,
    onSale:boolean,
    productActive:boolean,
    vin: number; 
    name: string; 
    order: number; 
    totalCost: number;
}
