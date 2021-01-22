import React, { useState, createRef, useCallback } from "react";
import { Stage, Layer } from "react-konva";
import Rectangle from "./Rectangle";
import Circle from "./Circle";

const TheCanvas = () => {

  const [rectangles, setRectangles] = useState([]) as any;
  const [circles, setCircles] = useState([]) as any;
  const [images, setImages] = useState([]) as any;
  const [selectedId, selectShape] = useState(null) as any;
  const [shapes, setShapes] = useState([]) as any;
  const [, updateState] = useState() as any;

  const stageEl = createRef() as any;
  const layerEl = createRef() as any;

  const getRandomInt = (max:number) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  const addRectangle = () => {
    const rect = {
      x: getRandomInt(100),
      y: getRandomInt(100),
      width: 100,
      height: 100,
      fill: "red",
      id: `rect${rectangles.length + 1}`,
    };
    const rects = rectangles.concat([rect]);
    setRectangles(rects);
    const shs = shapes.concat([`rect${rectangles.length + 1}`]);
    setShapes(shs);
  };


  const addCircle = () => {
    const circ = {
      x: getRandomInt(100),
      y: getRandomInt(100),
      width: 100,
      height: 100,
      fill: "red",
      id: `circ${circles.length + 1}`,
    };
    const circs = circles.concat([circ]);
    setCircles(circs);
    const shs = shapes.concat([`circ${circles.length + 1}`]);
    setShapes(shs);
  };

  const forceUpdate = useCallback(() => updateState({}), []);

  
  const Undo = () => {
    const lastId = shapes[shapes.length - 1];
    let index = circles.findIndex((c:any) => c.id === lastId);
    if (index !== -1) {
      circles.splice(index, 1);
      setCircles(circles);
    }
    index = rectangles.findIndex((r:any) => r.id === lastId);
    if (index !== -1) {
      rectangles.splice(index, 1);
      setRectangles(rectangles);
    }
}
  document.addEventListener("keydown", ev => {
    if (ev.code === "Delete") {
      let index = circles.findIndex((c:any) => c.id === selectedId);
      if (index !== -1) {
        circles.splice(index, 1);
        setCircles(circles);
      }
      index = rectangles.findIndex((r:any) => r.id === selectedId);
      if (index !== -1) {
        rectangles.splice(index, 1);
        setRectangles(rectangles);
      }
      index = images.findIndex((r:any) => r.id === selectedId);
      if (index !== -1) {
        images.splice(index, 1);
        setImages(images);
      }
      forceUpdate();
    }
  });

  return (
    <div>
      <h1>Whiteboard</h1>
        <div  onClick={addRectangle}>
          Rectangle
        </div>
        <div  onClick={addCircle}>
          Circle
        </div>
        <div  onClick={Undo}>
          Undo
        </div>
     
      <Stage
        width={window.innerWidth * 0.9}
        height={window.innerHeight - 150}
        ref={stageEl}
        onMouseDown={e => {
          // deselect when clicked on empty area
          const clickedOnEmpty = e.target === e.target.getStage();
          if (clickedOnEmpty) {
            selectShape(null);
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
                  selectShape(rect.id);
                }}
                onChange={(newAttrs:any) => {
                  const rects = rectangles.slice();
                  rects[i] = newAttrs;
                  setRectangles(rects);
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
                  selectShape(circle.id);
                }}
                onChange={(newAttrs:any) => {
                  const circs = circles.slice();
                  circs[i] = newAttrs;
                  setCircles(circs);
                }}
              />
            );
          })}
            </Layer>
      </Stage>
    </div>
  );
}
export default TheCanvas;
