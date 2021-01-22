import React from 'react'
import Auxil from "../../hoc/Auxil";
import OnTheFloorHeader from "../../components/OnTheFloor/OnTheFloorHeader/OnTheFloorHeader";
import TheCanvas from '../../components/OnTheFloor/OnTheFloorComponents/TheCanvas';


const onTheFloor = () => {
    return (
        <Auxil>
        <OnTheFloorHeader/>
        <TheCanvas />
        </Auxil>
)
}

export default onTheFloor; 