
const CalculateSuggestedValue = 
( onTheFloorValue: number,
  intheBackValue: number,
  sellingValue:number,
  sellValue: number,
  fillValue: number,
  parValue:number ) => { 
  if (sellingValue){
  let neededValue = (sellValue + sellingValue)
  let onHand = (onTheFloorValue + intheBackValue)
  
  let suggestedValue = Math.max(0,(neededValue - onHand))

  return suggestedValue
}
return 0
  }
  export default CalculateSuggestedValue;
