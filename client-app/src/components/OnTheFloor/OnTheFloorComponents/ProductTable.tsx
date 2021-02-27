import React, { useRef, useEffect } from "react";
import { Label, Transformer, Text, Tag, Image, Group } from "react-konva";
import useImage from "use-image"
import cancelSymbol from "../../../assets/images/cancelSymbol.svg";
import addProduct from "../../../assets/images/addProduct.svg";
import editButton from "../../../assets/images/editButton.svg";


interface IProps {
    shapeProps:any, 
    isSelected:any, 
    onSelect:any, 
    onChange:any,
    deleteFloor: () => void;
    toggleModal: () => void;
  }

const ProductTable = ({ 
  shapeProps, 
  isSelected, 
  onSelect, 
  onChange, 
  deleteFloor, 
  toggleModal 
  }: IProps) => {

  const [deleteIcon] = useImage(cancelSymbol);
  const [addProductIcon] = useImage(addProduct);
  const [editIcon] = useImage(editButton);


  const shapeRef = useRef(null) as any;
  const trRef = useRef(null) as any;

  useEffect(() => {
    if (isSelected) {
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
          
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
         
          node.scaleX(1);
          node.scaleY(1);

          onChange({
            ...shapeProps,
            offsetX: 0,
            offsetY: 0,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
            fontSize: shapeProps.fontSize * scaleY
          });
        }}
      >

        <Tag fill={shapeProps.fill}
              stroke ={shapeProps.stroke} 
        />

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

        <Text
          text= {shapeProps.fillText}
          width={shapeProps.width}
          height={shapeProps.height}
          verticalAlign="bottom"
          align="center"
          fontSize={shapeProps.fontSize}
          fill ={shapeProps.stroke}
          wrap="char"
          padding = {25}
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
        {shapeProps.inUse === false ?
          <Image
            ref={trRef}
            image ={addProductIcon}
            onClick={toggleModal}
            offsetX = {-5}
            offsetY = {25}
            width={25}
            height={25}
            onMouseEnter={e => {
              const container = e.target.getStage()!.container();
              container.style.cursor = "pointer";
            }}
            onMouseLeave={e => {
              const container = e.target.getStage()!.container();
              container.style.cursor = "default";
            }}
            >
          </Image>
          :
          <Image
            ref={trRef}
            image ={editIcon}
            onClick={toggleModal}
            offsetX = {-5}
            offsetY = {25}
            width={25}
            height={25}
            onMouseEnter={e => {
              const container = e.target.getStage()!.container();
              container.style.cursor = "pointer";
            }}
            onMouseLeave={e => {
              const container = e.target.getStage()!.container();
              container.style.cursor = "default";
            }}
            >
          </Image>
          }
          <Image
             ref={trRef}
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
export default ProductTable;