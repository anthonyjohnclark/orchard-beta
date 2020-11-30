import React, {useState} from "react";
import classes from "../InvOrderSummaryComponents/InvOrderButton.module.css"
import Modal from "../../../../hoc/Modal";
import Auxil from "../../../../hoc/Auxil";
import InvPreviewModal from "./InvPreviewModal";

const InvOrderButton = () => {

const [isShowing, setIsShowing] = useState(false);

const toggleModal = () => {
  setIsShowing(!isShowing);
  console.log(isShowing)
}


return(
    <Auxil>
    <button className = {classes.InvOrderButton} onClick={()=>toggleModal()}>Order</button>
    <Modal show = {isShowing} modalClosed = {toggleModal}>
    <InvPreviewModal></InvPreviewModal>
    </Modal>
    </Auxil>
)

}

export default InvOrderButton;