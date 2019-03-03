import React, { Component } from 'react';
import { Route } from 'react-router-dom'
// import logo from './logo.svg';
import './App.css';
import Navbars from './components/Navbars'

import cashierPage from './pages/cashierPage'
import promotionPage from './pages/promotionPage'
import addPromotionPage from './pages/addPromotionPage'
import editPromotionPage from './pages/editPromotionPage'


class App extends Component {

  componentWillMount(){
    let coupon = [
      {
        id : 1,
        type : 'percent',
        discount : 15,
        codename : 'LUCKY ONE',
        auto : true,
        exclude : false,
        checked : false,
        condition : {
          pricemore : 1000,
          person : -1
        },
        description : 'Discount 15% for coupon code "LUCKY ONE" or bill is more than 1,000 bath'
      },
      {
        id : 2,
        type : 'person',
        discount : 1,
        codename : '4 PAY 3',
        auto : false,
        exclude : false,
        checked : false,
        condition : {
          pricemore : 0,
          person : 4
        },
        description : 'Come 4 pay 3 when they present coupon code as "4 PAY 3"'
      },
      {
        id : 3,
        type : 'percent',
        discount : 20,
        codename : 'LUCKY TWO',
        auto : false,
        exclude : false,
        checked : false,
        condition : {
          pricemore : 0,
          person : 2
        },
        description : 'Discount 20% for 2 customer when they present coupon code as "LUCKY TWO"'
      },
      {
        id : 4,
        type : 'percent',
        discount : 25,
        codename : false,
        auto : true,
        exclude : true,
        checked : false,
        condition : {
          pricemore : 6000,
          person : -1
        },
        description : 'Discount 25% when the bill is over 6000 bath but it exclude all promotion'
      }
    ]
    if(localStorage.getItem('addcoupon') === undefined || localStorage.getItem('addcoupon') === null){
      localStorage.setItem('addcoupon' ,JSON.stringify(coupon))
    }
  }


  render() {
    return (
      <div>
        <Navbars/>
        <Route exact path="/" component={cashierPage} />
        <Route path="/promotion" component={promotionPage} />
        <Route path="/addpromotion" component={addPromotionPage}/>
        <Route path="/editpromotion" component={editPromotionPage}/>
      </div>
    );
  }
}

export default App;
