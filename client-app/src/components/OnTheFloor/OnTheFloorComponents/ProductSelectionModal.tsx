import React, {useEffect} from 'react';
import classes from './ProductSelectionModal.module.css'
import {useSelector, useDispatch} from 'react-redux'
import * as actionCreators from "../../../store/actions/index"
import ProductRows from '../../../hoc/ProductRows';

interface IProps  {
    toggleAlertModal: () => void;
    setProductForTable: (id: number, organic: boolean, onSale: boolean, name: string) => void;
}

const ProductSelectionModal: React.FC<IProps> = ({ toggleAlertModal,setProductForTable }) => 
{
    const dispatch = useDispatch()
    const _floorProducts = useSelector((state:any) => state.baseProducts)

    useEffect(() => {
        dispatch(actionCreators.getBaseProducts())
     }, [])

return (
    <React.Fragment>
    <div className={classes.ProdSelModal}>
        <table>
            <thead>
                <tr style={{backgroundColor: "#221d23"}}>
                <h3>Select a Product for the Table:</h3>
                </tr>
            <tr style={{width: 472}}>
                <th>VIN</th>
                <th>Name</th>
            </tr>
        </thead> 
        <div className = {classes.ScrollWrap}>
        <tbody>
        <ProductRows
        productArray = {_floorProducts} 
        rowsType = {"selectProduct"}
        toggleAlertModal = {toggleAlertModal}
        setProductForTable = {setProductForTable}
        />
        </tbody>
        </div>
        </table>
    </div>
          </React.Fragment>
    )
}
export default ProductSelectionModal;