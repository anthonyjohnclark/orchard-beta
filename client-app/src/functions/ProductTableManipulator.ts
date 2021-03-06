class FloorObjectManipulator {

    public static  AddProductToTable = (floor:any, selectedId:any, selectedProduct:any ) => {   

    const adjustedTables = [...floor]

    const prodTableIndex = adjustedTables.findIndex(( tables:any ) => tables.id === selectedId);

    adjustedTables[prodTableIndex].text = selectedProduct.name;

    adjustedTables[prodTableIndex].inUse = true;


    adjustedTables[prodTableIndex].id = `productTable${selectedProduct.id}.${adjustedTables.length}`;

    if (selectedProduct.onSale){
      adjustedTables[prodTableIndex].stroke = "#fdcb6e"
    }
    
    if (selectedProduct.organic){
      adjustedTables[prodTableIndex].fill = "#7fb069"
      }
      else {
      adjustedTables[prodTableIndex].fill = "#7678ed"
    }

    adjustedTables[prodTableIndex].fillText = selectedProduct.tableFill;

    adjustedTables[prodTableIndex].productId = selectedProduct.id;

    return adjustedTables;
}
}
export default FloorObjectManipulator;
