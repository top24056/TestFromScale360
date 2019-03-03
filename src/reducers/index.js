import {combineReducers} from 'redux'
import person from './person'
import pricefull from './pricefull'
import addcoupon from './addcoupon'
import pricediscount from './pricediscount'


export default combineReducers({
  person,
  pricefull,
  addcoupon,
  pricediscount
})