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
import HardscapeNameModal from "./HardscapeNameModal";
import { ISelectedProduct } from "../../../models/OnTheFloorModels/FloorObjects"
import { IFloorObjects } from "../../../models/OnTheFloorModels/FloorObjects"

interface IProps  {
    stageEl: any; 
    layerEl: any; 
    selectedId: string;
    selectedProduct: ISelectedProduct;
    floorType:string;
    hardscapeLabelText: string;
    floor: IFloorObjects[];
    setSelectedShape: (shape: string) => void; 
    addTable: (x:number, y:number) => void;
    deleteFloor: () => void; 
    setProductForTable: (id: string, organic: boolean, onSale: boolean, name: string) => void;
    addProductToTable: () => void;
    updateNewFillValue: (newFillValue: number) => void
    addPillar: (x:number, y:number) => void;
    addHardscape: (xPos: number, yPos: number) => void;
    addLabelToHardscape: () => void;
    setHardscapeLabelText: (text:string) => void;
    updateFloor: (floorObject:any) => void;
 }

const TheCanvas:React.FC<IProps> = (
    {stageEl, 
    layerEl,
    selectedId,
    setSelectedShape,
    selectedProduct,
    deleteFloor,
    addTable,
    setProductForTable,
    addProductToTable,
    updateNewFillValue,
    floorType,
    addPillar,
    addHardscape,
    addLabelToHardscape,
    setHardscapeLabelText,
    hardscapeLabelText,
    floor,
    updateFloor
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

    const [namingModalIsShowing, setNamingModal] = useState(false);

    const toggleNamingModal = () => {
        setNamingModal(!namingModalIsShowing);
    }

    const handleKeyDown = (event:KeyboardEvent) => {
      if (event.key === "Delete" || event.key ==="Backspace") {
        if ((alertIsShowing || namingModalIsShowing || isShowing) === false) {
          deleteFloor();
      }
      else if (namingModalIsShowing === true){
        return;
            }
    }
    if (event.key === "Enter") {
      if (alertIsShowing === true) {
        closeBothModals(); 
        addProductToTable();
      }
      else if (namingModalIsShowing === true){
        toggleNamingModal(); 
        addLabelToHardscape(); 
      }
      else {
        event.preventDefault();
      }
  }}
      
    useEffect(() => {
      const canvas = document.getElementById("canvas")
      console.log(canvas)
      canvas ?
      canvas.addEventListener('keydown', handleKeyDown) : 
      document.addEventListener('keydown', handleKeyDown);
              
     return () => {
       canvas ?
      canvas.removeEventListener('keydown', handleKeyDown) :
      document.removeEventListener('keydown', handleKeyDown);
     };
        
      }, [
        selectedId,
        namingModalIsShowing,
        alertIsShowing,
        isShowing,
        setHardscapeLabelText
      ]);
  
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
          onDragOver={(e) => e.preventDefault() }
         >  

      <Stage
        width={1300}
        height={750}        
        ref={stageEl}
        onMouseDown={(e:any) => {
          // deselect when clicked on empty area
          const clickedOnEmpty = e.target === e.target.getStage();
          if (clickedOnEmpty) {
            setSelectedShape("");
          }
        }}
      >
        <Layer ref={layerEl}>
           {floor.filter((floorObjects:IFloorObjects) => floorObjects.type === 'table')
            .map((table:IFloorObjects, i:number) => {
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
                  const flr = [...floor]
                  var indexOfFloor = flr.findIndex((i:any) => i.id === table.id)
                  flr[indexOfFloor] = newAttrs;
                  updateFloor(flr);
                }}
              />
            );
          })}
          {floor.filter((floorObjects:IFloorObjects) => floorObjects.type === 'pillar')
          .map((pillar:IFloorObjects, i:number) => {
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
                  const flr = [...floor]
                  var indexOfFloor = flr.findIndex((i:any) => i.id === pillar.id)
                  flr[indexOfFloor] = newAttrs;
                  updateFloor(flr);
                }}
              />
            );
          })}
          {floor.filter((floorObjects:IFloorObjects) => floorObjects.type === 'hardscape')
          .map((hard:IFloorObjects, i:number) => {
            return (
              <Hardscape
                key={i}
                toggleNamingModal = {toggleNamingModal}
                shapeProps={hard}
                isSelected={hard.id === selectedId}
                deleteFloor={deleteFloor}
                onSelect={() => {
                setSelectedShape(hard.id);
                }}
                onChange={(newAttrs:any) => {
                  const flr = [...floor]
                  var indexOfFloor = flr.findIndex((i:any) => i.id === hard.id)
                  flr[indexOfFloor] = newAttrs;
                  updateFloor(flr);
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
      <AlertModal show = {namingModalIsShowing} modalClosed = {toggleNamingModal}>
        <HardscapeNameModal
             addLabelToHardscape = {addLabelToHardscape}
             toggleNamingModal = {toggleNamingModal}
             setHardscapeLabelText = {setHardscapeLabelText}
             hardscapeLabelText = {hardscapeLabelText}
        ></HardscapeNameModal>
        </AlertModal>
    </Auxil>
  );
}
export default TheCanvas;
