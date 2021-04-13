import React, { useState, createRef } from "react";
import Auxil from "../../hoc/Auxil";
import OTFHeader from "../../components/OnTheFloor/OnTheFloorHeader/OTFHeader";
import TheCanvas from '../../components/OnTheFloor/OnTheFloorComponents/TheCanvas';
import useUpdateProductFloor from "./../../hooks/OnTheFloorHooks/useUpdateProductFloor";
import CreatePostFloorObject from "../../functions/CreatePostFloorObject";
import * as Konva from "react-konva";

const OnTheFloor = () => {

  const [selectedId, selectShape] = useState(String);
  const [floorType, setFloorType] = useState(String);
  const [hardscapeLabelText, updateHardscapeLabelText] = useState(String);

  const stageEl = createRef<typeof Konva.Stage>();
  const layerEl = createRef<typeof Konva.Layer>();

  const setNewFloorType = (type:string) => {
    setFloorType(type);
  }

  const setSelectedShape = (selectedId:string) => {
    selectShape(selectedId);
  };

  const setHardscapeLabelText = (text:string) => {
    updateHardscapeLabelText(text);
  }
 
  const [
    floor, 
    updateFloor,
    addTable, 
    addPillar,
    addHardscape,
    addProductToTable,
    addLabelToHardscape,
    deleteFloor,
    setProductForTable,
    updateNewFillValue,
    selectedProduct
      ] =  useUpdateProductFloor(selectedId, hardscapeLabelText);

      console.log(floor)

    let postFloorObject = CreatePostFloorObject(floor); 

    console.log(postFloorObject)

    return (
        <Auxil>
        <OTFHeader
            setNewFloorType = {setNewFloorType}
            floor = {floor}
        />
        <TheCanvas 
            stageEl = {stageEl}
            layerEl = {layerEl}
            selectedId = {selectedId}
            setSelectedShape = {setSelectedShape}
            deleteFloor = {deleteFloor}
            addTable = {addTable}
            setProductForTable = {setProductForTable}
            selectedProduct={selectedProduct}
            addProductToTable = {addProductToTable}
            updateNewFillValue = {updateNewFillValue}
            floorType = {floorType}
            addPillar= {addPillar}
            addHardscape = {addHardscape}
            addLabelToHardscape = {addLabelToHardscape}
            setHardscapeLabelText = {setHardscapeLabelText}
            hardscapeLabelText = {hardscapeLabelText}
            floor = {floor}
            updateFloor = {updateFloor}
        />
        </Auxil>
)}
export default OnTheFloor; 