import React from "react"; 
import {Button, Card, Popover} from 'antd';
import axios from 'axios'
import { withRouter } from 'react-router-dom';
import { StripeProvider, Elements } from 'react-stripe-elements';
import ShoppingCartItem from './ShoppingCartItem'

import InjectedCheckoutForm from './CheckoutForm'; // must be a child of Elements wrapper

const config = {
    headers: {
      'Content-Type': 'application/json',
//      'Content-Type': 'multipart/form-data',
      'Content-Type': 'application/x-www-form-urlencoded'
    }  
  }
class ShoppingCart extends React.Component{   
    constructor(props){
        super(props);
        this.toCart = this.toCart.bind(this);
    }
    state = {
        shoppingcart: [],
        price:0
    }
    toCart(){
        this.props.history.push(`/cart`)
    }
    showChildrenDrawer = () => {
        this.setState({
          childrenDrawer: true,
        });
      };
    
      onChildrenDrawerClose = () => {
        this.setState({
          childrenDrawer: false,
        });
      };
    componentWillReceiveProps(nextProps) {
            this.props = nextProps
            this.fecthData()
        }
    fecthData(){
            const  CustomerId = this.props.user.CustomerId
            axios.post("/api/order/getcartbyid", { CustomerId }, config).then(res => {
                this.setState({
                    shoppingcart: res.data,
            })
            })
        }
 render() {
    const {shoppingcart} = this.state
    const price = () => {
        let count = 0 
        for (let i = 0; i < shoppingcart.length; i++) {
            count = count + shoppingcart[i].CoursePrice
        }
        return count
      };
     const allCart= shoppingcart.map((v,index)=>(
        <Card  style={{ width: "100%", marginTop: 16 }} key={index}>
            <ShoppingCartItem
                OrderId={v.OrderId}
                CourseId={v.CourseId}  
                CourseName={v.CourseName} 
                OrderDate={v.OrderDate} 
                CoursePrice = {v.CoursePrice}
                CourseImage = {v.CourseImage}
            />
        </Card>
     ))
    return (
            <Popover content={<div>{allCart} <p>Total : <b>{price()}$</b></p></div>} placement="bottomLeft">
                <Button type="dashed" shape="circle" icon="shopping-cart" style={{marginTop: '5px'}}
                onClick= {this.toCart}></Button>
            </Popover>
        )
     }
}
export default withRouter(ShoppingCart);