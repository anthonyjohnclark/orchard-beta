import React, { useRef, useEffect } from "react";
import { Circle, Transformer } from "react-konva";

interface IProps {
    shapeProps:any, 
    isSelected:any, 
    onSelect:any, 
    onChange:any
}

const Circ = ({ shapeProps, isSelected, onSelect, onChange }: IProps) => {
  const shapeRef = useRef(null) as any;
  const trRef = useRef(null) as any;

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
      />
      {isSelected && <Transformer ref={trRef} />}
    </React.Fragment>
  );
};;
export default Circ;
