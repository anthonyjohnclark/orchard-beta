import React, { useEffect } from "react";
import { Stage, Layer } from "react-konva";
import Rectangle from "./Rectangle";
import Circle from "./Circle";
import classes from "./TheCanvas.module.css"
import Auxil from "../../../hoc/Auxil";

interface IProps  {
    stageEl: any; 
    layerEl: any; 
    rectangles: any; 
    circles: any; 
    selectedId: any;
    shapes:any;
    setSelectedShape: (shape: any) => void; 
    setRectangleShape: (rectangle: any) => void; 
    setCircleShape: (rectangle: any) => void; 
    setShapeArray: (shapes: any) => void; 
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
    setShapeArray,
    shapes
  }) => {

      // const forceUpdate = React.useCallback(() => setSelectedShape(selectedId), []);
    const handleKeyDown = (ev:any) => {
      if (ev.code === "Delete"|| "Backspace") {

        let index = circles.findIndex((circles:any) => circles.id === selectedId);
        if (index !== -1) {
          let circlesSpliced = [...circles]
          circlesSpliced.splice(index, 1);
          setCircleShape(circlesSpliced);

          const shs = [...shapes]
          shs.splice(index, 1);
          setShapeArray(shs)
        }

        index = rectangles.findIndex((rectangles:any) => rectangles.id === selectedId);
        if (index !== -1) {
          let rectanglesSpliced = [...rectangles]
          rectanglesSpliced.splice(index, 1);
          setRectangleShape(rectanglesSpliced);

          const shs = [...shapes]
          shs.splice(index, 1);
          setShapeArray(shs)
        }        }
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
          <div className = {classes.TheCanvas}>
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
    </Auxil>
  );
}
export default TheCanvas;
