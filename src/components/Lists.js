import React from 'react'
import { connect } from 'react-redux'
import { InputGroup,FormControl,Col,Row,Button } from 'react-bootstrap'

import {addcoupon} from '../actions/addcoupon'

class Lists extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      couponlist: []
    }
  }

  deleteCoupon = (e,info) => {
    const {dispatch} = this.props
    let templist = this.state.couponlist
    let temp = []
    for(let i=0;i<this.state.couponlist.length;i++){
      if(i !== info){
        temp.push(templist[i])
      }
    }
    dispatch(addcoupon(temp))
  }

  
  componentWillReceiveProps = (nextProps) => {
    const {dispatch} = this.props
    
    
    //auto
    if(this.props.person !== nextProps.person){
      let temp = []
      let infocoupon = JSON.parse(localStorage.getItem('addcoupon'))
      for(let i=0;i<infocoupon.length;i++){
        if(infocoupon[i].auto && infocoupon[i].condition.pricemore <= nextProps.pricefull  && (infocoupon[i].condition.person === nextProps.person || infocoupon[i].condition.person === -1)){
          infocoupon[i].checked = true
          temp = temp.concat(infocoupon[i])
        }
      }
      dispatch(addcoupon(temp))
      this.setState({
        couponlist : temp
      })
    }
    else{
      this.setState({
        couponlist : nextProps.couponlist
      })
    }
  }
  
 


  render() {
    let temprender = []
    let couponlist = this.state.couponlist
    let exclude = <label style={{color:'red',fontWeight :'bold'}}>&nbsp;**Can't use</label>
    for(let i=0;i<couponlist.length;i++){
      let label = [couponlist[i].description]
      if(couponlist[i].exclude){
        label.push(exclude)
      }
      temprender.push(
        <Row key={i}>
          <Col md={10} sm={7}>{label}</Col>
          <Col md={2} sm={5} style={{textAlign : 'right'}}>
            <Button variant="danger" onClick = {e => this.deleteCoupon(e,i)}>X</Button>
          </Col>
        </Row>
      )
    }
    return (
      <div>
        {temprender}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  person : state.person,
  pricefull : state.pricefull,
  couponlist : state.addcoupon
})


const ListWithConnect = connect(mapStateToProps)(Lists)
export default ListWithConnect