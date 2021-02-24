import React, { useEffect,useState } from "react";
import { Stage, Layer } from "react-konva";
import ProductTable from "./ProductTable";
import Pillar from "./Pillar";
import Hardscape from "./Hardscape";
import classes from "./TheCanvas.module.css"
import Auxil from "../../../hoc/Auxil";
import Modal from "../../../../src/hoc/Modal";
import ProductSelectionModal from "./ProductSelectionModal";
import AlertModal from "../../../hoc/AlertModal";
import ProductFillModal from "./ProductFillModal";


interface IProps  {
    stageEl: any; 
    layerEl: any; 
    tables: any; 
    pillars: any; 
    selectedId: any;
    selectedProduct: any;
    floorType:any;
    hardscapes:any;
    setSelectedShape: (shape: any) => void; 
    setTable: (table: any) => void; 
    setPillarShape: (circle: any) => void; 
    addTable: (x:number, y:number) => void;
    deleteFloor: () => void; 
    setProductForTable: (id: number, organic: boolean, onSale: boolean, name: string) => void;
    addProductToTable: () => void;
    updateNewFillValue: (newFillValue: any) => void
    addPillar: (x:number, y:number) => void;
    addHardscape: (xPos: number, yPos: number) => void;
    setHardscapesShape: (hardscape:any) => void;
 }

const TheCanvas:React.FC<IProps> = (
    {stageEl, 
    layerEl,
    tables, 
    pillars, 
    selectedId,
    setSelectedShape,
    selectedProduct, 
    setTable, 
    setPillarShape,
    deleteFloor,
    addTable,
    setProductForTable,
    addProductToTable,
    updateNewFillValue,
    floorType,
    addPillar,
    hardscapes,
    addHardscape,
    setHardscapesShape
  }) => {


    const [isShowing, setIsShowing] = useState(false);

    const toggleModal = () => {
      setIsShowing(!isShowing);
     }

      const [alertIsShowing, setAlertIsShowing] = useState(false);

      const toggleAlertModal = () => {
        setAlertIsShowing(!alertIsShowing);    
        setIsShowing(!isShowing);
        }

      const closeBothModals = () => {
        setAlertIsShowing(false);    
        setIsShowing(false);
      }

      // const forceUpdate = React.useCallback(() => setSelectedShape(selectedId), []);
    const handleKeyDown = (ev:any) => {
      if (ev.code === "Delete" || ev.code ==="Backspace") 
      {        deleteFloor()
      }
      }

      
    useEffect(() => {
      document.addEventListener("keydown", handleKeyDown)
        // forceUpdate()
        
     return () => {
      document.removeEventListener('keydown', handleKeyDown);
     };
        
    }, [selectedId]);

  
  return (
  <Auxil>      
  <div className = {classes.TheCanvas}
          onDrop={(e) => {
            e.preventDefault();
            // register event position
            stageEl.current.setPointersPositions(e);
            const x = stageEl.current.getPointerPosition().x-50
            const y = stageEl.current.getPointerPosition().y-50
            // add image
            console.log(floorType)
            if(floorType ==='product'){
            addTable(x,y);
            }
            else if(floorType ==='pillar'){
            addPillar(x,y)
            }
            else if(floorType ==='hardscaping'){
            addHardscape(x,y)
            }
          }}
          onDragOver={(e) => e.preventDefault() }>  

      <Stage
        width={1300}
        height={750}        
        ref={stageEl}
        onMouseDown={(e:any) => {
          // deselect when clicked on empty area
          const clickedOnEmpty = e.target === e.target.getStage();
          if (clickedOnEmpty) {
            setSelectedShape(null);
          }
        }}
      >
        <Layer ref={layerEl}>
           {tables.map((table:any, i:any) => {
            return (
              <ProductTable
                key={i}
                deleteFloor={deleteFloor}
                toggleModal={toggleModal}
                shapeProps={table}
                isSelected={table.id === selectedId}
                onSelect={() => {
                setSelectedShape(table.id);
                }}
                onChange={(newAttrs:any) => {
                  const tabls = tables.slice();
                  tabls[i] = newAttrs;
                  setTable(tabls);
                }}
              />
            );
          })}
          {pillars.map((pillar:any, i:any) => {
            return (
              <Pillar
                key={i}
                shapeProps={pillar}
                isSelected={pillar.id === selectedId}
                deleteFloor={deleteFloor}
                onSelect={() => {
                setSelectedShape(pillar.id);
                }}
                onChange={(newAttrs:any) => {
                  const pills = pillars.slice();
                  pills[i] = newAttrs;
                  setPillarShape(pills);
                }}
              />
            );
          })}
          {hardscapes.map((hard:any, i:any) => {
            return (
              <Hardscape
                key={i}
                shapeProps={hard}
                isSelected={hard.id === selectedId}
                deleteFloor={deleteFloor}
                onSelect={() => {
                setSelectedShape(hard.id);
                }}
                onChange={(newAttrs:any) => {
                  const hards = hardscapes.slice();
                  hards[i] = newAttrs;
                  setHardscapesShape(hards);
                }}
              />  
            );
          })}
      </Layer>
      </Stage>
      </div>
      <Modal show = {isShowing} modalClosed = {toggleModal}>
        <ProductSelectionModal
        toggleAlertModal = {toggleAlertModal}
        setProductForTable = {setProductForTable}
        />
      </Modal>
      <AlertModal show = {alertIsShowing} modalClosed = {toggleAlertModal}>
        <ProductFillModal
          closeBothModals = {closeBothModals}
          toggleAlertModal = {toggleAlertModal}
          selectedProduct = {selectedProduct}
          addProductToTable = {addProductToTable}
          updateNewFillValue = {updateNewFillValue}
        />
      </AlertModal>
    </Auxil>
  );
}
export default TheCanvas;
