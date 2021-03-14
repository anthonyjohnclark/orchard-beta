import  { useState,  useEffect } from "react";
import FloorObjectManipulator from "../../functions/ProductTableManipulator";
import FloorObjectCreator from "../../functions/FloorObjectCreator";
import { ISelectedProduct } from "../../models/OnTheFloorModels/FloorObjects"
import { IFloorObjects } from "../../models/OnTheFloorModels/FloorObjects"

const useUpdateProductFloor = (selectedId:string, hardscapeLabelText:string ) => {

    // const localFloor = localStorage.getItem('on-the-floor');

    // const userJson:string = localFloor !== null ? JSON.parse(localFloor) : null;
  
    const [floor, setFloor] = useState<IFloorObjects[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<ISelectedProduct>({
        id: "",
        organic: false,
        onSale: false,
        name: "",
        tableFill: 1 }); 

    const setProductForTable =  (id:string, organic:boolean, onSale:boolean, name:string) => {
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

    const updateFloor = (floor:IFloorObjects[]) => {
        setFloor(floor);
      }
    
      const addProductToTable = () => {
          setFloor(FloorObjectManipulator.AddProductToTable(floor, selectedId, selectedProduct));
          updateNewFillValue(1);
      }
      
      const addTable = (xPos:number, yPos:number) => {
        setFloor(FloorObjectCreator.AddTable(floor, xPos, yPos));
      };
      
      const addPillar = (xPos:number, yPos:number) => {
        setFloor(FloorObjectCreator.AddPillar(floor, xPos, yPos));
      };
      
      const addHardscape = (xPos:number, yPos:number) => {
        setFloor(FloorObjectCreator.AddHardscape(floor, xPos, yPos));
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
          id:"",
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