import React, { useState,  useEffect } from "react";

const useUpdateProductFloor = (selectedId:any, hardscapeLabelText:any ) => {

    const localFloor = localStorage.getItem('on-the-floor');

    const userJson:any = localFloor !== null ? JSON.parse(localFloor) : null;
  
    const [floor, setFloor] = useState( userJson || []) as any;
    const [selectedProduct, setSelectedProduct] = useState({}) as any; 

    
    const setProductForTable =  (id:number, organic:boolean, onSale:boolean, name:string) => {
    setSelectedProduct({
        id: id,
        organic: organic,
        onSale: onSale,
        name: name,
        tableFill: 1    
    });
    }

  //fill value here needs to be different from fill value derived from baseProduct state because that Fill 
  //value is the cumulative total of all Fill values from the floor products. this is the fill value we 
  //set for each individual tables. 

    const updateNewFillValue = (newFillValue:number) => {
        setSelectedProduct({
        ...selectedProduct, 
        tableFill: newFillValue
        })
    }

    const updateFloor = (floor:any) => {
        setFloor(floor);
      }
    
      const addProductToTable = () => {
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
    
          setFloor(adjustedTables);
          updateNewFillValue(1);
      }
      
      const addTable = (xPos:number, yPos:number) => {
        const table = {
          type: "table",
          x: xPos,
          y: yPos,
          width: 100,
          height: 100,
          stroke: "white",
          id: `emptyTable${floor.length + 1}`, 
          text: "Product Table",
          fontSize: 14,
          fill: null,
          fillText: null,
          productId: null,
          inUse: false,
        };
        const flr = [...floor]
        setFloor(flr.concat([table]));
      };
      
      const addPillar = (xPos:number, yPos:number) => {
        const pillar = {
          type: "pillar",
          x: xPos + 50,
          y: yPos + 50,
          width: 100,
          height: 100,
          stroke: "white",
          id: `circ${floor.length + 1}`,
        };
        const flr = [...floor];
        setFloor(flr.concat([pillar]));
      };
      
      const addHardscape = (xPos:number, yPos:number) => {
        const hard = {
          type: "hardscape",
          x: xPos,
          y: yPos,
          width: 150,
          height: 100,
          stroke: "white",
          id: `hardscape${floor.length + 1}`,
          text: null,
          fontSize: 14,
        };
        const flr = [...floor];   
        setFloor(flr.concat([hard]));
      }; 
    
      const deleteFloor = () => {
        let index = floor.findIndex((object:any) => object.id === selectedId);
        if (index !== -1) {
          const flr = [...floor]
          flr.splice(index, 1);
          setFloor(flr)
        }
      }

      const addLabelToHardscape = () => {

        const editedHardscapes = [...floor]
    
        const hardscapeIndex = editedHardscapes.findIndex(( tables:any ) => tables.id === selectedId);
    
        editedHardscapes[hardscapeIndex].text = hardscapeLabelText
    
        setFloor(editedHardscapes);
      }
    
      useEffect(() => {
        localStorage.setItem('on-the-floor', JSON.stringify(floor))
        console.log(localStorage)
      }, [floor])

      useEffect(() => {
        setSelectedProduct({
          id:0,
          organic:false,
          onSale:false,
          name:'',
          tableFill: 1
        })
       }, [setSelectedProduct])

    return [
        floor, 
        updateFloor,
        addTable, 
        addPillar,
        addHardscape,
        addProductToTable,
        addLabelToHardscape,
        deleteFloor,
        setProductForTable,
        updateNewFillValue,
        selectedProduct] as const;
}
export default useUpdateProductFloor;