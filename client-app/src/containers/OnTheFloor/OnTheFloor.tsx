import React, { useState, createRef, useEffect } from "react";
import Auxil from "../../hoc/Auxil";
import OTFHeader from "../../components/OnTheFloor/OnTheFloorHeader/OTFHeader";
import TheCanvas from '../../components/OnTheFloor/OnTheFloorComponents/TheCanvas';


const OnTheFloor = () => {

    // const [addRectangle, addPillar, undo, stageEl ] = useSetOTF

  const [tables, setTableShape] = useState([]) as any;
  const [pillars, setPillars] = useState([]) as any;
  const [selectedId, selectShape] = useState(null) as any;
  const [floor, setFloor] = useState([]) as any;
  const [selectedProduct, setSelectedProduct] = useState({}) as any; 
  const [floorType, setFloorType] = useState(null) as any;
  const [hardscapes, setHardscapes] = useState([]) as any;

    //   console.log("set selected shape: ", selectedId)

    console.log(hardscapes)
    console.log(tables)
    console.log(pillars)

  const stageEl = createRef() as any;
  const layerEl = createRef() as any;

  const setNewFloorType = (type:any) => {
    setFloorType(type);
  }

  const setSelectedShape = (selectedId:any) => {
    selectShape(selectedId);
  };

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

    adjustedTables[prodTableIndex].productId = selectedProduct.id;

      setFloor(adjustedTables);
      updateNewFillValue(1);
  }

     useEffect(() => {
      setSelectedProduct({
        id:0,
        organic:false,
        onSale:false,
        name:'',
        tableFill: 1
      })
     }, [setSelectedProduct])
 

  const setTable = (table:any) => {
    setTableShape(table);
  };

  const setPillarShape = (circle:any) => {
    setPillars(circle);
  };

  const setHardscapesShape = (hardscape:any) => {
    setHardscapes(hardscape);
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
      fillText: null,
      productId: null
    };
    const tabs = [...tables];
    setTableShape(tabs.concat([table]));;

    const flr = [...floor]
    setFloor(flr.concat([`table${tables.length + 1}`]));
  };
  
  const addPillar = (xPos:number, yPos:number) => {
    const pillar = {
      x: xPos + 50,
      y: yPos + 50,
      width: 100,
      height: 100,
      stroke: "white",
      id: `circ${pillars.length + 1}`,
    };
    const pills = [...pillars];
    setPillars(pills.concat([pillar]));

    const flr = [...floor];
    setFloor(flr.concat([`pillar${pillars.length + 1}`]));
  };
  
  const addHardscape = (xPos:number, yPos:number) => {
    const hard = {
      x: xPos,
      y: yPos,
      width: 150,
      height: 100,
      stroke: "white",
      id: `hardscape${hardscapes.length + 1}`,
    };
    const hards = [...hardscapes];
    setHardscapes(hards.concat([hard]));

    const flr = [...floor];   
    setFloor(flr.concat([`hardscape${hardscapes.length + 1}`]));
  }; 

  const deleteFloor = () => {

    let index = pillars.findIndex((pillars:any) => pillars.id === selectedId);
    if (index !== -1) {
      let pillarsSpliced = [...pillars]
      pillarsSpliced.splice(index, 1);
      setPillars(pillarsSpliced);

      const flr = [...floor]
      flr.splice(index, 1);
      setFloor(flr)
    }

    index = tables.findIndex((tables:any) => tables.id === selectedId);
    if (index !== -1) {
      let tablesSpliced = [...tables]
      tablesSpliced.splice(index, 1);
      setTableShape(tablesSpliced);

      const flr = [...floor]
      flr.splice(index, 1);
      setFloor(flr)
    }  
    
    index = hardscapes.findIndex((hardscapes:any) => hardscapes.id === selectedId);
    if (index !== -1) {
      let hardscapesSpliced = [...hardscapes]
      hardscapesSpliced.splice(index, 1);
      setHardscapes(hardscapesSpliced);

      const flr = [...floor]
      flr.splice(index, 1);
      setFloor(flr)
    }  
  }
  
    return (
        <Auxil>
        <OTFHeader
            // addRectangle = {addRectangle}
            tables = {tables}
            pillars = {pillars}
            setNewFloorType = {setNewFloorType}
            hardscapes = {hardscapes}

            // undo = {undo}
        />
        <TheCanvas 
            stageEl = {stageEl}
            layerEl = {layerEl}
            tables = {tables}
            pillars = {pillars}
            selectedId = {selectedId}
            setSelectedShape = {setSelectedShape}
            setTable = {setTable}
            setPillarShape = {setPillarShape}
            deleteFloor = {deleteFloor}
            addTable = {addTable}
            setProductForTable = {setProductForTable}
            selectedProduct={selectedProduct}
            addProductToTable = {addProductToTable}
            updateNewFillValue = {updateNewFillValue}
            floorType = {floorType}
            addPillar= {addPillar}
            hardscapes ={hardscapes}
            addHardscape = {addHardscape}
            setHardscapesShape = {setHardscapesShape}
        />
        </Auxil>
)
}

export default OnTheFloor; 