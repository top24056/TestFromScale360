import React from 'react'
import { connect } from 'react-redux'
import { InputGroup,FormControl,Form,Button } from 'react-bootstrap'
import {person} from '../actions/person'
import {pricefull} from '../actions/pricefull'
import {pricediscount} from '../actions/pricediscount'

import {addcoupon} from '../actions/addcoupon'


class Fields extends React.Component {

  constructor(props){
    super(props)
    this.state = {
    }
  }


  handleChange = (e) => {
    const {dispatch} = this.props
    if(this.props.type === 'person'){
      let persons = e.target.value
      if(persons === '' || persons <= 0){
        persons = 0
      }
      else{
        persons = parseInt(e.target.value)
      }
      dispatch(person(persons))
      dispatch(pricefull(persons * 459))
      dispatch(pricediscount(persons * 459))
    }
    else if(this.props.type === 'typepromotion'){
      this.props.callbackvalue(e.target.value,this.props.type)
      this.setState({
        typepromotion : e.target.value
      })
    }
    else if(this.props.type === 'promotionauto' || this.props.type === 'promotionexclude'){
      this.props.callbackvalue(e.target.checked,this.props.type)
    }
    else if(this.props.type === 'addcoupon'){
      this.setState({
        addcoupon : e.target.value
      })
    }
    else{
      this.props.callbackvalue(e.target.value,this.props.type)
    }
  }

  componentWillMount(){
    if(this.props.type === 'typepromotion'){
      this.setState({
        typepromotion : this.props.valdefault
      })
    }
  }

  clickAddCoupon = () => {
    const {dispatch} = this.props
    let temp = []
    temp = temp.concat(this.props.couponlist)
    let infocoupon = JSON.parse(localStorage.getItem('addcoupon'))
    for(let i=0;i<infocoupon.length;i++){
      if(infocoupon[i].codename === this.state.addcoupon){
        infocoupon[i].checked = true
        let temparr = []
        temparr.push(infocoupon[i])
        temp = temp.concat(temparr)
      }
    }
    dispatch(addcoupon(temp))
  }


  render() {
    let field = []
    if(this.props.typeinput === 'dropdown'){
      field.push(
        <Form.Group controlId="typepromotion" key={1} >
          <Form.Control as="select" value={this.state.typepromotion}  onChange={this.handleChange}>
            <option value = 'percent'>percent</option>
            <option value = 'person'>person</option>
          </Form.Control>
        </Form.Group>
      )
    }
    else if(this.props.typeinput === 'checkbox'){
      field.push(
        <label className="label-checkbox" key={1} >
          <input type="checkbox" className="check" onChange={e => this.handleChange(e)} checked={this.props.valdefault}/>
          <span className="check-box-effect"></span>
        </label>
      )
    }
    else if(this.props.typeinput === 'button'){
      field.push(
        <InputGroup key={1}>
          <FormControl
            placeholder="Coupon Code"
            aria-label="Coupon Code"
            aria-describedby="basic-addon2"
            onChange = {this.handleChange}
          />
          <InputGroup.Append>
            <Button variant="success" onClick={e => this.clickAddCoupon(e)}>Add coupon</Button>
          </InputGroup.Append>
        </InputGroup>
      )
    }
    else{
      field.push(
        <InputGroup size="lg" key = {1}>
          <FormControl 
            aria-label="Large" 
            aria-describedby="inputGroup-sizing-sm" 
            type = {this.props.typeinput}
            onChange = {this.handleChange}
            style = {{textAlign : 'right'}}
            value = {this.props.valdefault}
          />
        </InputGroup>
      )
    }
    return (
      <div>
        {field}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  couponlist :state.addcoupon
})


const FieldWithConnect = connect(mapStateToProps)(Fields)
export default FieldWithConnect