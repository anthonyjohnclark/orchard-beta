class FloorObjectCreator {

public static AddTable = (floor:any, xPos:any, yPos:any) => {
    const table = {
        type: "table",
        x: xPos,
        y: yPos,
        width: 100,
        height: 100,
        stroke: "white",
        id: `emptyTable${floor.length + 1}`, 
        text: "Product Table",
        fontSize: 14,
        fill: null,
        fillText: null,
        productId: null,
        inUse: false,
      };
      const flr = [...floor]
      const newFloor = flr.concat([table])

        return newFloor;
}

public static AddPillar = (floor:any, xPos:any, yPos:any) => {
    const pillar = {
        type: "pillar",
        x: xPos + 50,
        y: yPos + 50,
        width: 100,
        height: 100,
        stroke: "white",
        id: `circ${floor.length + 1}`,
      };
      const flr = [...floor];
      const newFloor = flr.concat([pillar]);

      return newFloor;
}

public static AddHardscape = (floor:any, xPos:any, yPos:any) => {
    const hard = {
        type: "hardscape",
        x: xPos,
        y: yPos,
        width: 150,
        height: 100,
        stroke: "white",
        id: `hardscape${floor.length + 1}`,
        text: null,
        fontSize: 14,
      };
      const flr = [...floor]; 
      const newFloor = flr.concat([hard]);
        
      return newFloor;
}}
export default FloorObjectCreator;