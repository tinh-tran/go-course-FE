import React, { Component } from "react";
import CheckoutForm from "./CheckoutForm";
import {Layout, Col, Card, Row} from 'antd'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import CartSummary from './CartSummary'
const Content= Layout.Content;
class Checkout extends Component {
    
  render() {
    const {header , user , ChangeHeader, Login , Register, SearchItem, shoppingcart, SelectCourse} = this.props
    header.currect = ['']
    const cartlist = shoppingcart || [''];
    const allCart= cartlist.map((v,index)=>(
        <Card  style={{ width: "100%", marginTop: 16 }} key={index}>
            <CartSummary
                OrderId={v.OrderId}
                CourseId={v.CourseId}  
                CourseName={v.CourseName} 
                OrderDate={v.OrderDate} 
                CoursePrice = {v.CoursePrice}
                CourseImage = {v.CourseImage}
            />
        </Card>
    ))
    const price = () => {
        let count = 0 
        for (let i = 0; i < shoppingcart.length; i++) {
            count = count + shoppingcart[i].CoursePrice
        }
        return count
      };
    return (
      <React.Fragment>
    <Layout className="layout">
        <Header header={header} user={user} ChangeHeader={ChangeHeader} Login={Login} Register={Register} SearchItem={SearchItem} />
            <Content style={{ boxShadow: '0 2px 8px 0 rgba(7,17,27,.06)', padding: '25px 50px' }}>
                <div style={{ background: '#fff', padding: 24, boxShadow: '0 2px 8px 0 rgba(7,17,27,.66)' }}>
                    {shoppingcart.length === 0 ? (
                         <Row style={{ height: '100%', width: "100%" }}>
                            <Col span={18} offset={6}>
                                    Cart is empty
                            </Col>
                        </Row>
                        ) : (
                        <Row style={{ height: '100%', width: "100%" }}>
                            <Col span={18} offset={6}>
                                <Col span={6}>
                                    Your item
                                    <hr />
                                    {allCart}
                                </Col>
                                <Col span={12}>
                                <CheckoutForm
                                    onFullName={this.handleFullName}
                                    onCreditCard={this.handleCreditCard}
                                    onExpMonth={this.handleExpMonth}
                                    onExpYear={this.handleExpYear}
                                    total = {price()}
                                    SelectCourse={SelectCourse}
                                    shoppingcart={shoppingcart}
                                    user = {this.props.user}
                                    />
                                </Col>
                            </Col>
                        </Row>
                    )}
                </div>    
        </Content>
         <Footer />
    </Layout>
    </React.Fragment>       
    ); 
  }
  
}

export default Checkout;