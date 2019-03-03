export default (state = [],{type,list}) => {
  switch (type) {
    case 'ADDCOUPON':
      {
        return list
      }
    default:
      return state
  }
}