import React, { useRef, useEffect } from "react";
import { Circle, Transformer,Group,Image } from "react-konva";
import useImage from "use-image"
import cancelSymbol from "../../../assets/images/cancelSymbol.svg";

interface IProps {
    shapeProps:any, 
    isSelected:any, 
    onSelect:any, 
    onChange:any,
    deleteFloor: () => void
}

const Pillar = ({ 
  shapeProps, 
  isSelected, 
  onSelect, 
  onChange,
  deleteFloor }: IProps) => {

  const shapeRef = useRef(null) as any;
  const trRef = useRef(null) as any;

  const [deleteIcon] = useImage(cancelSymbol);


    useEffect(() => {
    if (isSelected) {
      trRef.current.setNode(shapeRef.current);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected, shapeRef, trRef]);

  return (
    <React.Fragment>
      <Circle
        onClick={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e:any) => {
          onChange({
            ...shapeProps,
            offsetX: 0,
            offsetY: 0,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e:any) => {
          // transformer is changing scale
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);
          
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: node.width() * scaleX,
            height: node.height() * scaleY,
          });
        }}
        onMouseEnter={e => {
          // style stage container:
          const container = e.target.getStage()!.container();
          container.style.cursor = "pointer";
        }}
        onMouseLeave={e => {
          const container = e.target.getStage()!.container();
          container.style.cursor = "default";
        }}
      />
{isSelected && (
        <Group>
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        >
          <Image
             ref={trRef}
              //  x = {shapeProps.x + shapeProps.width}
              //  y = {shapeProps.y + shapeProps.height}
              offsetX = {-shapeProps.width + 25}
              offsetY = {25}
              image ={deleteIcon}
              width={25}
              height={25}
              onClick={deleteFloor}
              onMouseEnter={e => {
                // style stage container:
                const container = e.target.getStage()!.container();
                container.style.cursor = "pointer";
              }}
              onMouseLeave={e => {
                const container = e.target.getStage()!.container();
                container.style.cursor = "default";
              }}
              onMouseDown={e => {
                const container = e.target.getStage()!.container();
                container.style.cursor = "default";
              }}
            >
            </Image>
        </Transformer>
        </Group>
  )}
       </React.Fragment>
  )};
  
export default Pillar;
