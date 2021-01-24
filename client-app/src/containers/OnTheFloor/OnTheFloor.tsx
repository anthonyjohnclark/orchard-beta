import React, { useState, createRef } from "react";
import Auxil from "../../hoc/Auxil";
import OTFHeader from "../../components/OnTheFloor/OnTheFloorHeader/OTFHeader";
import TheCanvas from '../../components/OnTheFloor/OnTheFloorComponents/TheCanvas';


const OnTheFloor = () => {

    // const [addRectangle, addCircle, undo, stageEl ] = useSetOTF

  const [rectangles, setRectangles] = useState([]) as any;
  const [circles, setCircles] = useState([]) as any;
  const [selectedId, selectShape] = useState(null) as any;
  const [shapes, setShapes] = useState([]) as any;

    //   console.log("set selected shape: ", selectedId)

  const stageEl = createRef() as any;
  const layerEl = createRef() as any;


  const setShapeArray = (shapes:any) => {
        setShapes(shapes)
  }

  const setSelectedShape = (selectedId:any) => {
    selectShape(selectedId);
  };

  const setRectangleShape = (rectangle:any) => {
    setRectangles(rectangle);
  };

  const setCircleShape = (circle:any) => {
    setCircles(circle);
  };

  const getRandomInt = (max:number) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  const addRectangle = () => {
    const rect = {
      x: getRandomInt(100),
      y: getRandomInt(100),
      width: 100,
      height: 100,
      stroke: "white",
      id: `rect${rectangles.length + 1}`,
    };
    const rects = [...rectangles];
    setRectangles(rects.concat([rect]));

    const shs = [...shapes]
    setShapes(shs.concat([`rect${rectangles.length + 1}`]));
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

    const shs = [...shapes];
    setShapes(shs.concat([`circ${circles.length + 1}`]));
  }; 



    return (
        <Auxil>
        <OTFHeader
            addRectangle = {addRectangle}
            addCircle = {addCircle}
            // undo = {undo}
        />
        <TheCanvas 
            stageEl = {stageEl}
            layerEl = {layerEl}
            rectangles = {rectangles}
            circles = {circles}
            selectedId = {selectedId}
            setSelectedShape = {setSelectedShape}
            setRectangleShape = {setRectangleShape}
            setCircleShape = {setCircleShape}
            setShapeArray = {setShapeArray}
            shapes = {shapes}
        />
        </Auxil>
)
}

export default OnTheFloor; 