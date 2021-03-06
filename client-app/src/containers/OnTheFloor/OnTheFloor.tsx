import React, { useState, createRef } from "react";
import Auxil from "../../hoc/Auxil";
import OTFHeader from "../../components/OnTheFloor/OnTheFloorHeader/OTFHeader";
import TheCanvas from '../../components/OnTheFloor/OnTheFloorComponents/TheCanvas';
import useUpdateProductFloor from "./../../hooks/OnTheFloorHooks/useUpdateProductFloor";

const OnTheFloor = () => {

  const [selectedId, selectShape] = useState(null) as any;
  const [floorType, setFloorType] = useState(null) as any;
  const [hardscapeLabelText, updateHardscapeLabelText] = useState(null) as any;

  const stageEl = createRef() as any;
  const layerEl = createRef() as any;

  const setNewFloorType = (type:any) => {
    setFloorType(type);
  }

  const setSelectedShape = (selectedId:any) => {
    selectShape(selectedId);
  };

  const setHardscapeLabelText = (text:any) => {
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