import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import {Link} from "react-router-dom";

class Buttons extends React.Component {

  constructor(props){
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <Link to='/addpromotion'>
        <Button variant = {this.props.theme} onClick = {this.addCoupon} >
          Add Promotion
        </Button>
      </Link>
    )
  }
}

const mapStateToProps = (state) => ({
})


const ButtonWithConnect = connect(mapStateToProps)(Buttons)
export default ButtonWithConnect
