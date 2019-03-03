export default (state = 0,{type,pricefull}) => {
  switch(type){
    case 'PRICEFULL' :
      return pricefull
    default:
      return state
  }
}