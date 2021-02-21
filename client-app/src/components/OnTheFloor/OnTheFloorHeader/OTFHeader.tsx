import React  from "react"
import Auxil from "../../../hoc/Auxil"
import classes from "./OnTheFloorHeader.module.css"

interface IProps  {
    //  addRectangle: () => void; 
     addCircle: () => void;
     tables: any; 
 
    //  undo: any; 
  }

const OnTheFloorHeader: React.FC<IProps> = ({addCircle, tables}) => {

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
          }}
        // onClick={addRectangle}
        >
          <p>Product Table</p>
        </div>
        <button className = {classes.Button}  onClick={addCircle}>
          Add Hardscaping
        </button>
        </div>
        </div>
        </Auxil>
        )
}

export default OnTheFloorHeader; 