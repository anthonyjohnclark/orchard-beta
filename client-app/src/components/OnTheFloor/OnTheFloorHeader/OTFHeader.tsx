import React, { useState }  from "react"
import AlertModal from "../../../hoc/AlertModal"
import Auxil from "../../../hoc/Auxil"
import FloorCreationModal from "./FloorCreationModal"
import classes from "./OnTheFloorHeader.module.css"

interface IProps  {
     setFloorName: (name: string) => void,
     setNewFloorType: (type:any) => void;
     floor: any;
     floorName: string;
     postFloorObject: any;
     selectShape: React.Dispatch<React.SetStateAction<string>>
  }

const OnTheFloorHeader: React.FC<IProps> = ({ 
    setNewFloorType, 
    floor,
    setFloorName,
    floorName,
    postFloorObject,
    selectShape
    }) => {

  const [alertIsShowing, setAlertIsShowing] = useState(false);

  console.log(alertIsShowing)

  const toggleAlertModal = () => {
    setAlertIsShowing(!alertIsShowing);    
    }

    return (
        <Auxil>
        <div className = {classes.OTFHeaderWrapper}>
        <div className = {classes.TopHeader}>
          <div className={classes.HeaderFloorTitle}> 
          <h1>Current Floor: </h1><select></select>
          </div>
        <button className = {classes.Button}>Save</button>
        <button className = {classes.Button} onClick = {() => {toggleAlertModal(); selectShape("")}}>Save As</button>
        </div>
        <div className = {classes.BottomHeader}>
        <div className = {classes.ProductTable}
          draggable="true"
          onDragStart={(e) => {
            floor.id = e.currentTarget.id;
            setNewFloorType("product")
          }}>
          <p>Product Table</p>
        </div>
        <div className = {classes.Pillar}  draggable="true"
          onDragStart={(e) => {
            floor.id = e.currentTarget.id;
            setNewFloorType("pillar")
          }}>
          <p>Add Pillar</p>
        </div>
        <div className = {classes.Hardscaping}  draggable="true"
          onDragStart={(e) => {
            floor.id = e.currentTarget.id;
            setNewFloorType("hardscaping")
          }}>
          <p>Add Hardscaping</p>
        </div>
        </div>
        </div>
        <AlertModal show = {alertIsShowing}  backdropClicked = {toggleAlertModal}>
          <FloorCreationModal
            postFloorObject = {postFloorObject}
            setFloorName = {setFloorName}
            floorName = {floorName}
            toggleAlertModal = {toggleAlertModal}
          />
        </AlertModal>
        </Auxil>
  )}
  
export default OnTheFloorHeader; 