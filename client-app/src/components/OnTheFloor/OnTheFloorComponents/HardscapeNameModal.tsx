import React from 'react';
import classes from './HardscapeNameModal.module.css'


interface IProps  {
    hardscapeLabelText?: any;
    setHardscapeLabelText: (text: string) => void;
    addLabelToHardscape: () => void; 
    toggleNamingModal: () => void;
}

const HardscapeNameModal: React.FC<IProps> = ({
    addLabelToHardscape,
    toggleNamingModal,
    setHardscapeLabelText,
    hardscapeLabelText
     }) => 
{
return (
    <React.Fragment>
        <div className = {classes.HardscapeNameModal}>
            <h3>
               Enter a name for the hardscape object:
            </h3>
            <input max-length = {200} type = "text" value = {hardscapeLabelText ? hardscapeLabelText:""} onChange={(e) => {setHardscapeLabelText(e.target.value)}}></input>
            <button 
            className = {classes.HardscapeNameEnterButton}
            onClick = {() => {addLabelToHardscape(); toggleNamingModal() }}
            > Enter </button>
        </div>
    </React.Fragment>
    )
}
export default HardscapeNameModal;