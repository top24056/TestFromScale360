import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container,Row,Col,Button } from 'react-bootstrap'

import Fields from '../components/Fields'

import Buttons from '../components/Buttons'

class promotionPage extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      promotioncode : false,
      promotiondescription : '',
      typepromotion: 'percent',
      promotiondiscount : 0,
      promotionauto : false,
      promotionexclude : false,
      promotionconditionprice : 0,
      promotionconditionperson : -1
    }
  }

  handlechangestate = (value,type) => {
    if(value === ''){
      if(type === 'promotionconditionprice'){
        value = 0
      }
      else if(type === 'promotionconditionperson'){
        value = -1
      }
      else if(type === 'promotiondiscount'){
        value = 0
      }
      else if(type === 'promotioncode'){
        value = true
      }
    }
    this.setState({
      [type] : value
    })
  }

  saveAddCoupon = () => {
    let fromlocal = JSON.parse(localStorage.getItem('addcoupon'))
    let id = fromlocal[fromlocal.length -1].id +1
    let tempObj = {
      id : id,
      type : this.state.typepromotion,
      discount : parseInt(this.state.promotiondiscount),
      codename : this.state.promotioncode,
      auto : this.state.promotionauto,
      exclude : this.state.promotionexclude,
      checked : false,
      condition : {
        pricemore : parseInt(this.state.promotionconditionprice),
        person : parseInt(this.state.promotionconditionperson)
      },
      description : this.state.promotiondescription
    }
    fromlocal.push(tempObj)
    localStorage.setItem('addcoupon',JSON.stringify(fromlocal))
    window.location.assign("/promotion");
  }

  render() {
    return (
      <Container style ={{marginTop : '5%'}}>
        <Row>
          <Col>
            <h1>Add Promotion</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <label>Promotion Code</label>
          </Col>
          <Col>
            <Fields typeinput={'text'} type={'promotioncode'} callbackvalue = {this.handlechangestate}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <label>Promotion Description</label>
          </Col>
          <Col>
            <Fields typeinput={'text'} type={'promotiondescription'} callbackvalue = {this.handlechangestate}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <label>Promotion Type</label>
          </Col>
          <Col>
            <Fields typeinput={'dropdown'} type={'typepromotion'} callbackvalue = {this.handlechangestate} valdefault={this.state.typepromotion}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <label>Promotion Discount</label>
          </Col>
          <Col>
            <Fields typeinput={'number'} type={'promotiondiscount'} callbackvalue = {this.handlechangestate} />
          </Col>
        </Row>
        <Row>
          <Col>
            <label>Promotion Auto use ?</label>
          </Col>
          <Col>
            <Fields typeinput={'checkbox'} type={'promotionauto'} callbackvalue = {this.handlechangestate} />
          </Col>
        </Row>
        <Row>
          <Col>
            <label>Promotion exclude ?</label>
          </Col>
          <Col>
            <Fields typeinput={'checkbox'} type={'promotionexclude'} callbackvalue = {this.handlechangestate} />
          </Col>
        </Row>
        <Row>
          <h3>Condition Promotion</h3>
        </Row>
        <Row>
          <Col>
            <label>Price more than</label>
          </Col>
          <Col>
            <Fields typeinput={'number'} type={'promotionconditionprice'} callbackvalue = {this.handlechangestate} />
          </Col>
        </Row>
        <Row>
          <Col>
            <label>Person come more than</label>
          </Col>
          <Col>
            <Fields typeinput={'number'} type={'promotionconditionperson'} callbackvalue = {this.handlechangestate} />
          </Col>
        </Row>
        <Row style ={{textAlign : 'right'}}>
        <Col></Col>
        <Col>
          <Button onClick={this.saveAddCoupon}>
            Save Changes
          </Button>
        </Col>
          
        </Row>
      </Container>
    )
  }
}


const mapStateToProps = (state) => ({
  
})


const promotionPageWithConnect = connect(mapStateToProps)(promotionPage)
export default promotionPageWithConnect