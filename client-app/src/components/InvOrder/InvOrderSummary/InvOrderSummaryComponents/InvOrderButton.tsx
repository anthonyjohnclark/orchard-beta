import React, {useState} from "react";
import classes from "../InvOrderSummaryComponents/InvOrderButton.module.css"
import Modal from "../../../../hoc/Modal";
import Auxil from "../../../../hoc/Auxil";
import InvPreviewModal from "./InvPreviewModal";
import { IOrderedProducts } from "../../../../models/InvOrderModels/IProducts";
import AlertModal from '../../../../hoc/AlertModal';
import OrderSubmitConfirmationModal from './OrderSubmitConfirmationModal';

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
  
      const [alertIsShowing, setAlertIsShowing] = useState(false);
  
      const toggleAlertModal = () => {
        setAlertIsShowing(!alertIsShowing);    
        setIsShowing(!isShowing);
        }
  
      const closeBothModals = () => {
        setAlertIsShowing(false);    
        setIsShowing(false);
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
    closeBothModals = {closeBothModals}
    toggleAlertModal = {toggleAlertModal}
    alertIsShowing = {alertIsShowing}
    toggleModal = {toggleModal}
    ></InvPreviewModal>
    </Modal>
    <AlertModal show = {alertIsShowing} modalClosed = {toggleAlertModal}>
      <OrderSubmitConfirmationModal
      orderSubmitObject= {orderSubmitObject}
      toggleAlertModal = {toggleAlertModal}
      ></OrderSubmitConfirmationModal>
    </AlertModal>
    </Auxil>
)

}

export default InvOrderButton;