import React  from "react"
import Auxil from "../../../hoc/Auxil"
import classes from "./OnTheFloorHeader.module.css"

interface IProps  {
     addRectangle: () => void; 
     addCircle: () => void; 
    //  undo: any; 
  }

const OnTheFloorHeader: React.FC<IProps> = ({addRectangle, addCircle}) => {

    return (
        <Auxil>
        <div className = {classes.OTFHeaderWrapper}>
        <div className = {classes.TopHeader}>
        <h1>Current Floor</h1>
        <button className = {classes.Button}>Clear</button>
        <button className = {classes.Button}>Save</button>
        <button className = {classes.Button} onClick={addRectangle}>
          Rectangle
        </button>
        <button className = {classes.Button}  onClick={addCircle}>
          Circle
        </button>
        </div>
        <div className = {classes.BottomHeader}>
            <h3>Template:</h3>
        </div>
        </div>
        </Auxil>
        )
}

export default OnTheFloorHeader; 