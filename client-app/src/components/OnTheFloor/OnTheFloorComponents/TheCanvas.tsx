import React, { useEffect,useState } from "react";
import { Stage, Layer } from "react-konva";
import Rectangle from "./Rectangle";
import Circle from "./Circle";
import classes from "./TheCanvas.module.css"
import Auxil from "../../../hoc/Auxil";
import Modal from "../../../../src/hoc/Modal";


interface IProps  {
    stageEl: any; 
    layerEl: any; 
    rectangles: any; 
    circles: any; 
    selectedId: any;
    setSelectedShape: (shape: any) => void; 
    setRectangleShape: (rectangle: any) => void; 
    setCircleShape: (rectangle: any) => void; 
    addRectangle: (x:number, y:number) => void;
    deleteFloor: () => void; 
 }

const TheCanvas:React.FC<IProps> = (
    {stageEl, 
    layerEl,
    rectangles, 
    circles, 
    selectedId,
    setSelectedShape, 
    setRectangleShape, 
    setCircleShape,
    deleteFloor,
    addRectangle
  }) => {


    const [isShowing, setIsShowing] = useState(false);

    const toggleModal = () => {
      setIsShowing(!isShowing);
      console.log(isShowing)}

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
            addRectangle(x,y);
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
          {rectangles.map((rect:any, i:any) => {
            return (
              <Rectangle
                key={i}
                deleteFloor={deleteFloor}
                toggleModal={toggleModal}
                shapeProps={rect}
                isSelected={rect.id === selectedId}
                onSelect={() => {
                setSelectedShape(rect.id);
                }}
                onChange={(newAttrs:any) => {
                  const rects = rectangles.slice();
                  rects[i] = newAttrs;
                  setRectangleShape(rects);
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
      <Modal show = {isShowing} modalClosed = {toggleModal}/>

    </Auxil>
  );
}
export default TheCanvas;
