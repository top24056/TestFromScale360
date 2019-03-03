import React from 'react'
import { connect } from 'react-redux'
import { Button,Table,ButtonGroup,ButtonToolbar  } from 'react-bootstrap'
import SweetAlert from 'react-bootstrap-sweetalert'

import {Link} from "react-router-dom";
import imgDelete from '../asset/delete@2x.png'
import imgEdit from '../asset/edit@2x.png'
// import swal from 'sweetalert';


import { withRouter } from "react-router";

class Tables extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      info : this.props.info
    }
  }

  canclehideAlert = () => {
    this.setState({
      alert: null
    });
  }

  confirmhideAlert = (infocoupon) => {
    let temp = []
    for(let i=0;i<this.state.info.length;i++){
      if(infocoupon !== this.state.info[i].id){
        temp.push(this.state.info[i])
      }
    }
    localStorage.setItem('addcoupon',JSON.stringify(temp))
    this.setState({
      info : temp,
      alert: null
    })
  }

  deleteCoupon = (infocoupon) => {
    const getAlert = () => (
      <SweetAlert 
        warning 
        showCancel
        cancelBtnBsStyle="danger"
        title="Delete Coupon" 
        confirmBtnText="Yes, delete it!"
        onConfirm={() => this.confirmhideAlert(infocoupon)}
        onCancel={() => this.canclehideAlert()}
      >
        Are you sure?
      </SweetAlert>
    );
    this.setState({
      alert : getAlert()
    })

  }

  editCoupon = (infocoupon) => {

  }
  
  render() {
    let listtable = []
    let infocoupon = this.state.info
    for(let i=0;i<infocoupon.length;i++){
      let info = infocoupon[i]
      listtable.push(
        <tr key = {i}>
          <td style = {{width : '5%',textAlign:'center'}}>{i}</td>
          <td style = {{width : '10%',textAlign:'center'}}>{infocoupon[i].id}</td>
          <td style = {{width : '70%'}}>{infocoupon[i].description}</td>
          <td style = {{width : '20%',textAlign:'center'}}>
          <ButtonGroup>
            <Link to={{ pathname: '/editpromotion', info:{info} }}>
              <Button variant='success' onClick={e => this.editCoupon(infocoupon[i],e)}>
                <img src={imgEdit} alt={"edit"}/>
              </Button>
            </Link>
            <Button variant='danger' onClick={e => this.deleteCoupon(infocoupon[i].id,e)}>
              <img src={imgDelete} alt={"delete"}/>
            </Button>
          </ButtonGroup>
          </td>
        </tr>
      )
    }
    return (
      <div style={{width:'100%'}}>
        <Table>
          <thead>
            <tr>
              <th style = {{width : '5%',textAlign:'center'}}>#</th>
              <th style = {{width : '10%',textAlign:'center'}}>Id</th>
              <th style = {{width : '70%'}}>Description</th>
              <th style = {{width : '20%',textAlign:'center'}}>Action</th>
            </tr>
          </thead>
          <tbody>
            {listtable}
          </tbody>
        </Table>
        {this.state.alert}
      </div>
      
    )
  }
}

const mapStateToProps = (state) => ({
})


const TablesWithConnect = connect(mapStateToProps)(Tables)
export default withRouter(TablesWithConnect)
