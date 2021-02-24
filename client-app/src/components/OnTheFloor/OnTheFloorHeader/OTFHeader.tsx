import React  from "react"
import Auxil from "../../../hoc/Auxil"
import classes from "./OnTheFloorHeader.module.css"

interface IProps  {
    //  addRectangle: () => void; 
     tables: any; 
     pillars:any;
     setNewFloorType: (type:any) => void;
     hardscapes:any;
    //  undo: any; 
  }

const OnTheFloorHeader: React.FC<IProps> = ({ tables, pillars,setNewFloorType,hardscapes}) => {


    return (
        <Auxil>
        <div className = {classes.OTFHeaderWrapper}>
        <div className = {classes.TopHeader}>
          <div className={classes.HeaderFloorTitle}> 
          <h1>Current Floor: </h1><select></select>
          </div>
        <button className = {classes.Button}>Save</button>
        <button className = {classes.Button}>Save As</button>
        </div>
        <div className = {classes.BottomHeader}>
        <div className = {classes.ProductTable}
          draggable="true"
          onDragStart={(e) => {
            tables.id = e.currentTarget.id;
            setNewFloorType("product")
          }}>
          <p>Product Table</p>
        </div>
        <div className = {classes.Pillar}  draggable="true"
          onDragStart={(e) => {
            pillars.id = e.currentTarget.id;
            setNewFloorType("pillar")
          }}>
          <p>Add Pillar</p>
        </div>
        <div className = {classes.Hardscaping}  draggable="true"
          onDragStart={(e) => {
            hardscapes.id = e.currentTarget.id;
            setNewFloorType("hardscaping")
          }}>
          <p>Add Hardscaping</p>
        </div>
        </div>
        </div>
        </Auxil>
        )
}

export default OnTheFloorHeader; 