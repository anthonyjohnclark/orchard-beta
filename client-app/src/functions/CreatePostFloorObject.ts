import { IFloorObjects } from "../models/OnTheFloorModels/FloorObjects";

const createPostFloorObject = (floor:any) => { 

    var date = new Date();
    var todaysDate = date.toISOString();

    let floorObject = JSON.stringify(floor);

    let postFloorObject = {
        floorObject : floorObject,
        dateCreated : todaysDate,
        floorName : "placeholder"
    }

    return postFloorObject;
}

export default createPostFloorObject;