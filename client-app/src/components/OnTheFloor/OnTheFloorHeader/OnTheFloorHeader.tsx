import React, {useRef} from "react"
import OTFSideBar from "../OnTheFloorComponents/OTFSideBar"
import Auxil from "../../../hoc/Auxil"
import classes from "./OnTheFloorHeader.module.css"
import TheCanvas from "../OnTheFloorComponents/TheCanvas"

const OnTheFloorHeader = () => {

    return (
        <Auxil>
        <div className = {classes.OTFWrapper}>
        <div className = {classes.TopHeader}>
        <h1>Current Floor</h1>
        <button className = {classes.Button}>Clear</button>
        <button className = {classes.Button}>Undo</button>
        </div>
        <OTFSideBar />
        </div>
        <TheCanvas />
        </Auxil>
        )
}

export default OnTheFloorHeader; 