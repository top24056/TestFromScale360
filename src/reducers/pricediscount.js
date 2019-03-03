export default (state = 0,{type,pricediscount}) => {
  switch(type){
    case 'PRICEDISCOUNT' :
      return pricediscount
    default:
      return state
  }
}