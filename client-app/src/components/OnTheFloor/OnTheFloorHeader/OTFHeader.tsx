import React  from "react"
import Auxil from "../../../hoc/Auxil"
import classes from "./OnTheFloorHeader.module.css"

const OnTheFloorHeader = () => {

    return (
        <Auxil>
        <div className = {classes.OTFWrapper}>
        <div className = {classes.TopHeader}>
        <h1>Current Floor</h1>
        <button className = {classes.Button}>Clear</button>
        <button className = {classes.Button}>Undo</button>
        <button className = {classes.Button}>Save</button>
        </div>
        <button className = {classes.Button}>Rectangle</button>
        <button className = {classes.Button}>Circle</button>
        </div>        
        </Auxil>
        )
}

export default OnTheFloorHeader; 