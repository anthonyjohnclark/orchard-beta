import React from 'react'
import Auxil from "../../hoc/Auxil";
import OTFHeader from "../../components/OnTheFloor/OnTheFloorHeader/OTFHeader";
import TheCanvas from '../../components/OnTheFloor/OnTheFloorComponents/TheCanvas';


const onTheFloor = () => {

    // const [ ] = useSetOTF

    return (
        <Auxil>
        <OTFHeader/>
        <TheCanvas />
        </Auxil>
)
}

export default onTheFloor; 