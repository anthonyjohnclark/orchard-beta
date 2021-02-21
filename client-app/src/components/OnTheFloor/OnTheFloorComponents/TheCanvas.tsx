import React, { useEffect,useState } from "react";
import { Stage, Layer } from "react-konva";
import ProductTable from "./ProductTable";
import Circle from "./Circle";
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
    circles: any; 
    selectedId: any;
    selectedProduct: any;
    setSelectedShape: (shape: any) => void; 
    setTable: (table: any) => void; 
    setCircleShape: (circle: any) => void; 
    addTable: (x:number, y:number) => void;
    deleteFloor: () => void; 
    setProductForTable: (id: number, organic: boolean, onSale: boolean, name: string) => void;
    addProductToTable: () => void;
    updateNewFillValue: (newFillValue: any) => void
 }

const TheCanvas:React.FC<IProps> = (
    {stageEl, 
    layerEl,
    tables, 
    circles, 
    selectedId,
    setSelectedShape,
    selectedProduct, 
    setTable, 
    setCircleShape,
    deleteFloor,
    addTable,
    setProductForTable,
    addProductToTable,
    updateNewFillValue
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
            addTable(x,y);
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
          {tables.map((rect:any, i:any) => {
            return (
              <ProductTable
                key={i}
                deleteFloor={deleteFloor}
                toggleModal={toggleModal}
                shapeProps={rect}
                isSelected={rect.id === selectedId}
                onSelect={() => {
                setSelectedShape(rect.id);
                }}
                onChange={(newAttrs:any) => {
                  const rects = tables.slice();
                  rects[i] = newAttrs;
                  setTable(rects);
                }}
              />
            );
          })}
          {circles.map((circle:any, i:any) => {
            return (
              <Circle
                key={i}
                shapeProps={circle}
                isSelected={circle.id === selectedId}
                onSelect={() => {
                setSelectedShape(circle.id);
                }}
                onChange={(newAttrs:any) => {
                  const circs = circles.slice();
                  circs[i] = newAttrs;
                  setCircleShape(circs);
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
