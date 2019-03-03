import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container,Row,Col } from 'react-bootstrap'

import Buttons from '../components/Buttons'
import Tables from '../components/Tables'

class promotionPage extends Component {
  
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <Container style ={{marginTop : '5%'}}>
        <Row>
          <Col>
            <h1>Management Promotion</h1>
          </Col>
          <Col style={{textAlign:'right'}}>
            <Buttons/>
          </Col>
        </Row>
        <Row>
          <Tables info = {JSON.parse(localStorage.getItem('addcoupon'))}/>
        </Row>
      </Container>
    )
  }
}


const mapStateToProps = (state) => ({
  
})


const promotionPageWithConnect = connect(mapStateToProps)(promotionPage)
export default promotionPageWithConnect