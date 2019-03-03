import React from 'react'
import { connect } from 'react-redux'
import { InputGroup,FormControl } from 'react-bootstrap'
import styled from 'styled-components'

import { pricediscount } from '../actions/pricediscount'

const Label = styled.h1.attrs({
  color : props => props.color,
  textAlign : props => props.textAlign
})`
  font-size: 1.5em;
  text-align: center;
  color: ${props => props.color};
  text-align : ${props => props.textAlign};
`;

class Labels extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      price : 0
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const {dispatch} = this.props
    let price = nextProps.pricefull
    let listcoupon = nextProps.listcoupon
    let person = nextProps.person
    for(let i=0;i<listcoupon.length;i++){
      let info = listcoupon[i]
      if(info.exclude && listcoupon.length === 1){
        if(info.checked && info.condition.pricemore <= price && (info.condition.person === person || info.condition.person === -1)){
          if(info.type === 'percent'){
            price = ((100-info.discount)/100)* price
          }
          else if(info.type === 'person'){
            price = price - (459*info.discount)
          }
        }
      }
      else{
        if(!info.exclude && info.checked && info.condition.pricemore <= price && (info.condition.person === person || info.condition.person === -1)){
          if(info.type === 'percent'){
            price = ((100-info.discount)/100)* price
          }
          else if(info.type === 'person'){
            price = price - (459*info.discount)
          }
        }
      }
    }
    dispatch(pricediscount(parseFloat(price).toFixed(2)))
  }
  

  render() {
    let label
    if(this.props.type === 'price'){
      label = 
        <Label 
          color = {this.props.color} 
          textAlign = {this.props.textAlign}
        >
          {this.props.pricefull}
        </Label>
    }
    else if(this.props.type === 'pricedis'){
      label = 
        <Label 
          color = {this.props.color} 
          textAlign = {this.props.textAlign}
        >
          {this.props.pricediscount}
        </Label>
    }
    else{
      label = 
        <Label 
          color = {this.props.color} 
          textAlign = {this.props.textAlign}
        >
          {this.props.label}
        </Label>
    }
    return (
      <div>
        {label}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  listcoupon : state.addcoupon,
  pricefull : state.pricefull,
  pricediscount : state.pricediscount,
  person : state.person
})


const LabelWithConnect = connect(mapStateToProps)(Labels)
export default LabelWithConnect
