import React, {useState} from "react";
import classes from "../InvOrderSummaryComponents/InvOrderButton.module.css"
import Modal from "../../../../hoc/Modal";
import Auxil from "../../../../hoc/Auxil";
import InvPreviewModal from "./InvPreviewModal";
import { IOrderedProducts } from "../../../../models/InvOrderModels/IProducts";

interface IProps  {
  todaysSales: number; 
  salesPrediction: number; 
  orderedProducts: IOrderedProducts[]; 
  totalCost: string; 
  totalPieces: number;
  orderSubmitObject:any;
}

const InvOrderButton:React.FC<IProps>  = ({
  orderedProducts,
  totalCost,
  totalPieces,
  orderSubmitObject
   }) => {

const [isShowing, setIsShowing] = useState(false);

const toggleModal = () => {
  setIsShowing(!isShowing);
}

return(
    <Auxil>
    <button className = {classes.InvOrderButton} onClick={()=>toggleModal()}>Order</button>
    <Modal show = {isShowing} modalClosed = {toggleModal}>
    <InvPreviewModal
    orderedProducts = {orderedProducts}
    totalPieces = {totalPieces}
    totalCost = {totalCost}
    orderSubmitObject= {orderSubmitObject}
    ></InvPreviewModal>
    </Modal>
    </Auxil>
)

}

export default InvOrderButton;