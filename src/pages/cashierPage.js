import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container,Row,Col } from 'react-bootstrap'

import Fields from '../components/Fields'
import Labels from '../components/Labels'
import Buttons from '../components/Buttons'
import Modals from '../components/Modals'
import Lists from '../components/Lists'

import bg from '../asset/bg.png'

class cashierPage extends Component {
  
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Col md = {3} sm ={3}>
            <h1 className = {'label-cashpage'} style ={{color : 'grey'}}>Person</h1>
          </Col>
          <Col md = {5} sm ={5}>
            <Fields type={'person'} typeinput={'number'}/>
          </Col>
          <Col md = {2} sm={2}>
            <Labels type = {'price'} label = {this.props.pricefull} color = {'black'} textAlign = {'right'}/>
          </Col>
          <Col md = {2} sm={2}>
            <h1 className = {'label-cashpage'} style ={{textAlign : 'right'}}>Bath</h1>
          </Col>
        </Row>
        
        <Row style={{marginLeft:'5%'}}>
          <Col md = {10} sm = {7}>
            <Fields type={'addcoupon'} typeinput={'button'}/>
          </Col>
          <Col md = {2} sm = {5}>
            <Modals labelbutton = {'Suggest Coupon'} labelmodal ={'You can use these coupons.'}/>
            {/* <Buttons label = {'Suggest'} theme = {'primary'} show={this.showModal}/> */}
          </Col>
        </Row>

        
        <Lists/>

        
        <Row>
          <Col md = {3} sm={3}>
            <h1 className = {'label-cashpage'}>Total</h1>
          </Col>
          <Col md = {6} sm={6}>
            <Labels type = {'pricedis'} color = {'black'} textAlign = {'right'}/>
          </Col>
          <Col md = {3} sm={3}>
            <h1 className = {'label-cashpage'}>Bath</h1>
          </Col>
        </Row>

        
      </Container>
    )
  }
}


const mapStateToProps = (state) => ({
  pricefull : state.pricefull
})


const cashierPageWithConnect = connect(mapStateToProps)(cashierPage)
export default cashierPageWithConnect