import React, {useEffect} from 'react';
import classes from './ProductSelectionModal.module.css'
import {useSelector, useDispatch} from 'react-redux'
import * as actionCreators from "../../../store/actions/index"
import ProductRows from '../../../hoc/ProductRows';

interface IProps  {

}

const ProductSelectionModal: React.FC<IProps> = ({  }) => 
{

    const dispatch = useDispatch()
    const _floorProducts = useSelector((state:any) => state.baseProducts)

    useEffect(() => {
        dispatch(actionCreators.getBaseProducts())
     }, [])

    console.log(_floorProducts)
    // var formatter = new Intl.NumberFormat('en-US', {
    //     style: 'currency',
    //     currency: 'USD',
    //   });

return (
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
            />
            </tbody>
            </div>
            </table>
    </div>
    )
}
export default ProductSelectionModal;