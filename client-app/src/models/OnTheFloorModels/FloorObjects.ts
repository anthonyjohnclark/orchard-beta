interface IObjectKeys {
    [key: string]: string | number | boolean | undefined;
  }

export interface ISelectedProduct extends IObjectKeys{
id: string,
organic: boolean,
onSale: boolean,
name: string,
tableFill: number
}

export interface IFloorObjects extends IObjectKeys {
    type: string,
    x: number,
    y: number,
    width: number,
    height: number,
    stroke: string,
    id: string, 
    text: string,
    fontSize: number,
    fill?: string,
    fillText?: string,
    productId?: string,
    inUse?: boolean,
}
