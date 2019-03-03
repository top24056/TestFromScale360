import React from 'react'
import { connect } from 'react-redux'
import { Modal,Button,Col,Row,FormControl  } from 'react-bootstrap'
import swal from 'sweetalert';

import {addcoupon} from '../actions/addcoupon'
import {pricediscount} from '../actions/pricediscount'


class Modals extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showmodal : false,
      listcoupon : [],
    }
  }

  handleClose = () => {
    this.setState({
      showmodal : false
    })
  }

  handleShow = () => {
    let templist = []
    let coupon = JSON.parse(localStorage.getItem('addcoupon'))
    for(let i=0;i<coupon.length;i++){
      let info = coupon[i]
      if(info.condition.pricemore <= this.props.pricefull && info.condition.person === -1 || info.condition.person === this.props.person){
        templist.push(info)
      }
    }
    this.setState({
      showmodal : true,
      listcoupon : templist,
    })
  }

  handleField = (e,info) => {
    info['checked'] = e.target.checked
    let temp = this.state.listcoupon
    for(let i=0;i<temp.length;i++){
      if(temp.id === info.id ){
        temp[i] = info
      }
    }
    this.setState({
      listcoupon : temp
    })
  }

  saveCoupon = () => {
    const {dispatch} = this.props
    let exclude = false
    let temp = []
    temp = temp.concat(this.props.couponlist)
    for(let i=0;i<this.state.listcoupon.length;i++){
      if(this.state.listcoupon[i].checked){
        exclude = this.state.listcoupon[i].exclude
        temp = temp.concat(this.state.listcoupon[i])
      }
    }
    
    if(exclude && temp.length !== 1){
      swal({
        title: "Warning",
        icon: "warning",
        text: "You choose coupon exclude",
        type: "warning",
        showCancelButton: false,
        confirmButtonColor: "#D43E38",
        confirmButtonText: "OK",
        closeOnConfirm: true
      })
    }
    else{
      dispatch(addcoupon(temp))
      this.setState({
        showmodal : false
      })
    }
  }

  render() {
    let listrender = []
    if(this.state.listcoupon !== undefined){
      for(let i=0;i<this.state.listcoupon.length;i++){
        let info = this.state.listcoupon[i]
        let label = [info.description] 
        let exclude = <label key={i} style={{color:'red'}}>Can't use other with coupon</label>
        if(info.exclude){
          label.push(exclude)
        }
        listrender.push(
          <Row key = {info.id}>
            <Col md = {9} sm = {7}>
              {label}
            </Col>
            <Col md = {3} sm = {5} style = {{textAlign:'center',display:'inline-block'}}>
              <label className="label-checkbox">
                <input type="checkbox" className="check" onChange={e => this.handleField(e,info)}/>
                <span className="check-box-effect"></span>
              </label>
            </Col>
          </Row>
        )
      }
    }
    
    return (
      <div>
        <Button variant = {this.props.theme} onClick = {this.handleShow}>
          {this.props.labelbutton}
        </Button>


        <Modal size={"lg"} show={this.state.showmodal} onHide={this.handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.labelmodal}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md = {9} sm = {7}>
                <h3>Description</h3>
              </Col>
              <Col md = {3} sm = {5} style={{textAlign:'center'}}>
                <h3>You have ?</h3>
              </Col>
            </Row>

            {listrender}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick = {e => this.saveCoupon(e)}>Save coupon</Button>
          </Modal.Footer>
        </Modal>
      </div>
      
    )
  }
}

const mapStateToProps = (state) => ({
  person : state.person,
  pricefull : state.pricefull,
  pricediscount : state.pricediscount,
  couponlist :state.addcoupon
})


const ModalWithConnect = connect(mapStateToProps)(Modals)
export default ModalWithConnect
