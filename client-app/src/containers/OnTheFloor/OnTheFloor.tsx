import React, { useState, createRef, useEffect } from "react";
import Auxil from "../../hoc/Auxil";
import OTFHeader from "../../components/OnTheFloor/OnTheFloorHeader/OTFHeader";
import TheCanvas from '../../components/OnTheFloor/OnTheFloorComponents/TheCanvas';


const OnTheFloor = () => {

    // const [addRectangle, addCircle, undo, stageEl ] = useSetOTF

  const [tables, setTableShape] = useState([]) as any;
  const [circles, setCircles] = useState([]) as any;
  const [selectedId, selectShape] = useState(null) as any;
  const [floor, setFloor] = useState([]) as any;
  const [selectedProduct, setSelectedProduct] = useState({}) as any; 

    console.log(selectedProduct)
    //   console.log("set selected shape: ", selectedId)

    console.log(tables)

  const stageEl = createRef() as any;
  const layerEl = createRef() as any;

  const setSelectedShape = (selectedId:any) => {
    selectShape(selectedId);
  };

  const setProductForTable =  (id:number, organic:boolean, onSale:boolean, name:string) => {
    setSelectedProduct({
      id: id,
      organic: organic,
      onSale: onSale,
      name: name,
      tableFill: null    
    });
  }

  //fill value here needs to be different from fill value derived from baseProduct state because that Fill 
  //value is the cumulative total of all Fill values from the floor products. this is the fill value we 
  //set for each individual tables. 

  const updateNewFillValue = (newFillValue:any) => {
    setSelectedProduct({
      ...selectedProduct, 
      tableFill: newFillValue
    })
  }

  const addProductToTable = () => {
    const adjustedTables = [...tables]

    const prodTableIndex = adjustedTables.findIndex(( tables:any ) => tables.id === selectedId);

    adjustedTables[prodTableIndex].text = selectedProduct.name;

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

      setFloor(adjustedTables)
  }

     useEffect(() => {
      setSelectedProduct({
        id:0,
        organic:false,
        onSale:false,
        name:'',
        tableFill: null
      })
     }, [setSelectedProduct])
 

  const setTable = (table:any) => {
    setTableShape(table);
  };

  const setCircleShape = (circle:any) => {
    setCircles(circle);
  };

  const getRandomInt = (max:number) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  const addTable = (xPos:number, yPos:number) => {
    const table = {
      x: xPos,
      y: yPos,
      width: 100,
      height: 100,
      stroke: "white",
      id: `emptyTable${tables.length + 1}`, 
      text: "Product Table",
      fontSize: 14,
      fill: null,
      fillText: null
    };
    const rects = [...tables];
    setTableShape(rects.concat([table]));;

    const shs = [...floor]
    setFloor(shs.concat([`table${tables.length + 1}`]));
  };
  
  const addCircle = () => {
    const circ = {
      x: getRandomInt(100),
      y: getRandomInt(100),
      width: 100,
      height: 100,
      stroke: "white",
      id: `circ${circles.length + 1}`,
    };
    const circs = [...circles];
    setCircles(circs.concat([circ]));

    const shs = [...floor];
    setFloor(shs.concat([`circ${circles.length + 1}`]));
  }; 

  const deleteFloor = () => {

    let index = circles.findIndex((circles:any) => circles.id === selectedId);
    if (index !== -1) {
      let circlesSpliced = [...circles]
      circlesSpliced.splice(index, 1);
      setCircles(circlesSpliced);

      const shs = [...floor]
      shs.splice(index, 1);
      setFloor(shs)
    }

    index = tables.findIndex((tables:any) => tables.id === selectedId);
    if (index !== -1) {
      let tablesSpliced = [...tables]
      tablesSpliced.splice(index, 1);
      setTableShape(tablesSpliced);

      const shs = [...floor]
      shs.splice(index, 1);
      setFloor(shs)
    }   
  }
  
    return (
        <Auxil>
        <OTFHeader
            // addRectangle = {addRectangle}
            addCircle = {addCircle}
            tables = {tables}

            // undo = {undo}
        />
        <TheCanvas 
            stageEl = {stageEl}
            layerEl = {layerEl}
            tables = {tables}
            circles = {circles}
            selectedId = {selectedId}
            setSelectedShape = {setSelectedShape}
            setTable = {setTable}
            setCircleShape = {setCircleShape}
            deleteFloor = {deleteFloor}
            addTable = {addTable}
            setProductForTable = {setProductForTable}
            selectedProduct={selectedProduct}
            addProductToTable = {addProductToTable}
            updateNewFillValue = {updateNewFillValue}
        />
        </Auxil>
)
}

export default OnTheFloor; 