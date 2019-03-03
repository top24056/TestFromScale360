export default (state = 0,{type,person}) => {
  switch(type){
    case 'PERSON' :
      return person
    default:
      return state
  }
}