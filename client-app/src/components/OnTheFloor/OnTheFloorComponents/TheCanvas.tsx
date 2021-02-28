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


interface IProps  {
    stageEl: any; 
    layerEl: any; 
    // tables: any; 
    // pillars: any; 
    selectedId: any;
    selectedProduct: any;
    floorType:any;
    // hardscapes:any;
    hardscapeLabelText: any;
    floor: any;

    setSelectedShape: (shape: any) => void; 
    // setTable: (table: any) => void; 
    // setPillarShape: (circle: any) => void; 
    addTable: (x:number, y:number) => void;
    deleteFloor: () => void; 
    setProductForTable: (id: number, organic: boolean, onSale: boolean, name: string) => void;
    addProductToTable: () => void;
    updateNewFillValue: (newFillValue: any) => void
    addPillar: (x:number, y:number) => void;
    addHardscape: (xPos: number, yPos: number) => void;
    // setHardscapesShape: (hardscape:any) => void;
    addLabelToHardscape: () => void;
    setHardscapeLabelText: (text:string) => void;
    updateFloor: (floor: any) => void;
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




      // const forceUpdate = React.useCallback(() => setSelectedShape(selectedId), []);
    const handleKeyDown = (ev:any) => {
      if (ev.code === "Delete" || ev.code ==="Backspace") {
        if ((alertIsShowing || namingModalIsShowing || isShowing) === false) {
          deleteFloor();
      }
      else if (namingModalIsShowing === true){
        return;
            }
    }
    if (ev.code === "Enter") {
      if (alertIsShowing === true) {
        closeBothModals(); 
        addProductToTable();
      }
      else if (namingModalIsShowing === true){
        toggleNamingModal(); 
        addLabelToHardscape(); 
      }
      else {
        ev.preventDefault();
      }
  }}

      
    useEffect(() => {
      document.addEventListener("keydown", handleKeyDown)
        // forceUpdate()
        
     return () => {
      document.removeEventListener('keydown', handleKeyDown);
     };
        
    }, [selectedId,namingModalIsShowing,alertIsShowing,isShowing,setHardscapeLabelText]);

  
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
            setSelectedShape(null);
          }
        }}
      >
        <Layer ref={layerEl}>
           {floor.filter((floorObjects:any) => floorObjects.type === 'table')
            .map((table:any, i:any) => {
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
                  const tabls = floor.slice();
                  console.log(tabls)
                  console.log(newAttrs)

                  tabls[i] = newAttrs;
                  console.log(tabls[i])

                  updateFloor(tabls);
                }}
              />
            );
          })}
          {floor.filter((floorObjects:any) => floorObjects.type === 'pillar')
          .map((pillar:any, i:any) => {
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
                  const pills = floor.slice();
                  pills[i] = newAttrs;
                  updateFloor(pills);
                }}
              />
            );
          })}
          {floor.filter((floorObjects:any) => floorObjects.type === 'hardscape')
          .map((hard:any, i:any) => {
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
                  const hards = floor.slice();
                  hards[i] = newAttrs;
                  updateFloor(hards);
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
