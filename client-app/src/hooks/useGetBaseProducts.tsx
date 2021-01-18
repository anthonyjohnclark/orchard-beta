import { useEffect, useCallback } from "react"
import * as actionCreators from "../store/actions/index"
import { useDispatch, useSelector } from "react-redux"

const useGetBaseProducts = (todaysSales:number,salesPrediction:number) => {
  const dispatch = useDispatch()
// const [ baseProducts, setProductInput ] = useState<IProductsWithInput[]>([]);

  const  _baseProducts  = useSelector((state:any) => state.baseProducts)

  useEffect(() => {
     dispatch(actionCreators.getBaseProducts())
  }, [dispatch])
  
  const _updateInputChanged = useCallback(
     (id: number) => (e: React.ChangeEvent<HTMLInputElement>) => 
     dispatch(actionCreators.updateInputChanged(id,e)), 
     [dispatch])

  const _updateSellSelling = useCallback(
    (name: string) => 
    dispatch(actionCreators.updateSellSelling(name,todaysSales,salesPrediction)), 
    [dispatch,todaysSales,salesPrediction])
  
    const _setOrderToSuggested = useCallback(
      (roundingDirection:boolean, e:React.MouseEvent<HTMLDivElement, MouseEvent>) => 
      dispatch(actionCreators.setOrderToSuggested(roundingDirection,e)), 
      [dispatch])

   useEffect(() => {
      _updateSellSelling("TodaysSales");
      _updateSellSelling("SalesPrediction");
    }, [ salesPrediction, todaysSales, _updateSellSelling ]);
 

  return  [ _baseProducts, _updateInputChanged, _updateSellSelling, _setOrderToSuggested ] as const;
}

export default useGetBaseProducts;