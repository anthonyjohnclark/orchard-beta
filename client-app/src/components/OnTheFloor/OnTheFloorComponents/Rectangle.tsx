import React, { useRef, useEffect, useState } from "react";
import { Label, Transformer, Text, Tag, Image, Group } from "react-konva";
import useImage from "use-image"
import cancelSymbol from "../../../assets/images/cancelSymbol.svg";
import addProduct from "../../../assets/images/addProduct.svg";

interface IProps {
    shapeProps:any, 
    isSelected:any, 
    onSelect:any, 
    onChange:any,
    deleteFloor: () => void;
    toggleModal: () => void;
  }

const Rectangle = ({ shapeProps, isSelected, onSelect, onChange, deleteFloor, toggleModal }: IProps) => {

  const [deleteIcon] = useImage(cancelSymbol);
  const [addProductIcon] = useImage(addProduct);

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
      <Group>
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
         
          // const fontSize = node.Tex
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
            fontSize: shapeProps.fontSize * scaleY
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
      </Group>
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
            // x = {shapeProps.x + shapeProps.width}
            // y = {shapeProps.y + shapeProps.height}
            image ={addProductIcon}
            onClick={toggleModal}
            offsetX = {-5}
            offsetY = {25}
            width={25}
            height={25}
            // onClick={}
            onMouseEnter={e => {
              // style stage container:
              const container = e.target.getStage()!.container();
              container.style.cursor = "pointer";
            }}
            onMouseLeave={e => {
              const container = e.target.getStage()!.container();
              container.style.cursor = "default";
            }}
            >
          </Image>
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
            >
            </Image>
        </Transformer>
            </Group>
            )     
    }
    </React.Fragment>
  );
};
export default Rectangle;