import React, { Component } from 'react'
import {Navbar,Nav} from 'react-bootstrap'


class Navbars extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Resturant</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Cashier</Nav.Link>
          <Nav.Link href="/promotion">Promotion</Nav.Link>
        </Nav>
      </Navbar>
    )
  }
}


export default Navbars;