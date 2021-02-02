import React, { useState, createRef } from "react";
import Auxil from "../../hoc/Auxil";
import OTFHeader from "../../components/OnTheFloor/OnTheFloorHeader/OTFHeader";
import TheCanvas from '../../components/OnTheFloor/OnTheFloorComponents/TheCanvas';


const OnTheFloor = () => {

    // const [addRectangle, addCircle, undo, stageEl ] = useSetOTF

  const [rectangles, setRectangles] = useState([]) as any;
  const [circles, setCircles] = useState([]) as any;
  const [selectedId, selectShape] = useState(null) as any;
  const [floor, setfloor] = useState([]) as any;

    //   console.log("set selected shape: ", selectedId)

    console.log(floor)
    console.log(rectangles)

  const stageEl = createRef() as any;
  const layerEl = createRef() as any;

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

  const addRectangle = (xPos:number, yPos:number) => {
    const rect = {
      x: xPos,
      y: yPos,
      width: 100,
      height: 100,
      stroke: "white",
      id: `rect${rectangles.length + 1}`, 
      text: "Product Table",
      fontSize: 14
    };
    const rects = [...rectangles];
    setRectangles(rects.concat([rect]));

    const shs = [...floor]
    setfloor(shs.concat([`rect${rectangles.length + 1}`]));
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
    setfloor(shs.concat([`circ${circles.length + 1}`]));
  }; 

  const deleteFloor = () => {

    let index = circles.findIndex((circles:any) => circles.id === selectedId);
    if (index !== -1) {
      let circlesSpliced = [...circles]
      circlesSpliced.splice(index, 1);
      setCircles(circlesSpliced);

      const shs = [...floor]
      shs.splice(index, 1);
      setfloor(shs)
    }

    index = rectangles.findIndex((rectangles:any) => rectangles.id === selectedId);
    if (index !== -1) {
      let rectanglesSpliced = [...rectangles]
      rectanglesSpliced.splice(index, 1);
      setRectangles(rectanglesSpliced);

      const shs = [...floor]
      shs.splice(index, 1);
      setfloor(shs)
    }   
  }



    return (
        <Auxil>
        <OTFHeader
            // addRectangle = {addRectangle}
            addCircle = {addCircle}
            rectangles = {rectangles}

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
            deleteFloor = {deleteFloor}
            addRectangle = {addRectangle}
        />
        </Auxil>
)
}

export default OnTheFloor; 