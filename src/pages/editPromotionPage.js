import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container,Row,Col,Button } from 'react-bootstrap'

import Fields from '../components/Fields'

import Buttons from '../components/Buttons'

class editpromotionPage extends Component {
  
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
  

  componentWillMount(){
    this.setState({
      promotionid : this.props.location.info.info.id,
      promotioncode : this.props.location.info.info.codename,
      promotiondescription : this.props.location.info.info.description,
      typepromotion: this.props.location.info.info.type,
      promotiondiscount : this.props.location.info.info.discount,
      promotionauto : this.props.location.info.info.auto,
      promotionexclude : this.props.location.info.info.exclude,
      promotionconditionprice : this.props.location.info.info.condition.pricemore,
      promotionconditionperson : this.props.location.info.info.condition.person
    })
  }

  saveEditCoupon = () => {
    let temparray = []
    let fromlocal = JSON.parse(localStorage.getItem('addcoupon'))
    let id = this.state.promotionid
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
    for(let i=0;i<fromlocal.length;i++){
      if(id === fromlocal[i].id){
        temparray.push(tempObj)
      }
      else{
        temparray.push(fromlocal[i])
      }
    }
    localStorage.setItem('addcoupon',JSON.stringify(temparray))
    window.location.assign("/promotion");
  }

  render() {
    return (
      <Container style ={{marginTop : '5%'}}>
        <Row>
          <Col>
            <h1>Edit Promotion</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <label>Promotion Code</label>
          </Col>
          <Col>
            <Fields page={'edit'} typeinput={'text'} type={'promotioncode'} callbackvalue = {this.handlechangestate} valdefault={this.state.promotioncode}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <label>Promotion Description</label>
          </Col>
          <Col>
            <Fields typeinput={'text'} type={'promotiondescription'} callbackvalue = {this.handlechangestate} valdefault={this.state.promotiondescription}/>
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
            <Fields typeinput={'number'} type={'promotiondiscount'} callbackvalue = {this.handlechangestate} valdefault={this.state.promotiondiscount}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <label>Promotion Auto use ?</label>
          </Col>
          <Col>
            <Fields typeinput={'checkbox'} type={'promotionauto'} callbackvalue = {this.handlechangestate} valdefault={this.state.promotionauto}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <label>Promotion exclude ?</label>
          </Col>
          <Col>
            <Fields typeinput={'checkbox'} type={'promotionexclude'} callbackvalue = {this.handlechangestate} valdefault={this.state.promotionexclude}/>
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
            <Fields typeinput={'number'} type={'promotionconditionprice'} callbackvalue = {this.handlechangestate} valdefault={this.state.promotionconditionprice}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <label>Person come more than (-1 is mean don't use person)</label>
          </Col>
          <Col>
            <Fields typeinput={'number'} type={'promotionconditionperson'} callbackvalue = {this.handlechangestate} valdefault={this.state.promotionconditionperson}/>
          </Col>
        </Row>
        <Row style ={{textAlign : 'right'}}>
        <Col></Col>
        <Col>
          <Button onClick={this.saveEditCoupon}>
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


const editpromotionPageWithConnect = connect(mapStateToProps)(editpromotionPage)
export default editpromotionPageWithConnect