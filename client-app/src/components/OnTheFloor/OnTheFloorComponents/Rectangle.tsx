import React, { useRef, useEffect } from "react";
import { Label, Transformer, Text, Tag } from "react-konva";

interface IProps {
    shapeProps:any, 
    isSelected:any, 
    onSelect:any, 
    onChange:any,

}

const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }: IProps) => {

  const shapeRef = useRef() as any;
  const trRef = useRef() as any;

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Label
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        { ...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y()
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
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
         
          // const fontSize = node.Text;


          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);

          onChange({
            ...shapeProps,
            offsetX: 0,
            offsetY: 0,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
            fontSize: shapeProps.fontSize * scaleX
          });
        }}
      >

        <Tag fill={shapeProps.fill}
              stroke ={shapeProps.stroke} />

        <Text
          text={shapeProps.text}
          width={shapeProps.width}
          height={shapeProps.height}
          verticalAlign="middle"
          align="center"
          fontSize={shapeProps.fontSize}
          fill ={shapeProps.stroke}
          wrap="char"
        />

      </Label>
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};
export default Rectangle;