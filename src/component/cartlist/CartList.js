import React from 'react';
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { Layout , Icon, List, Row, Col, Divider, Button } from 'antd'
import './cartlist.css'


const { Content } = Layout

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);
const Status= 0
class CartList extends React.Component {
    constructor(props){
        super(props);
        this.toClass = this.toClass.bind(this);
    }
    toCheckout(){
        this.props.history.push(`/checkout`)
    }
    state = { 
        shoppingcart:[]
    }
    toClass(classid){
        this.props.history.push(`/class/${classid}`)
    }
    removeCart(CustomerId, OrderId){
        this.props.RemoveCart(CustomerId,OrderId, Status)
    }
    render() {
        const gridStyle = {
            width: '100%',
            textAlign: 'center',
        };
        const { header, user, order, Login, Register, ChangeHeader, SearchItem } = this.props
        header.currect = ['']
        const price = () => {
            let count = 0 
            for (let i = 0; i < order.shoppingcart.length; i++) {
                count = count + order.shoppingcart[i].CoursePrice
            }
            return count
          };
        return (
            <Layout className="layout">
            <Header header={header} user={user} ChangeHeader={ChangeHeader} Login={Login} Register={Register} SearchItem={SearchItem} />
            <Content style={{ boxShadow: '0 2px 8px 0 rgba(7,17,27,.06)', padding: '25px 50px' }}>
                <div style={{ background: '#fff', padding: 24, boxShadow: '0 2px 8px 0 rgba(7,17,27,.66)' }}>
                    <Row style={{ height: '100%', width: "100%" }}>
                        <Col span={9} offset={6}>
                            <Divider orientation="left">Have {order.shoppingcart.length} course in cart</Divider>
                        </Col>
                        <Col span={9} offset={6}>
                            <List
                                itemLayout="vertical"
                                size="default"
                                dataSource={order.shoppingcart}
                                renderItem={item => (
                                    <List.Item
                                    actions={[<a onClick={()=> this.removeCart(user.CustomerId,item.OrderId)}>Remove</a>, <a>Move to wishlist</a>]}
                                        key={item.CourseId}
                                        style={{ cursor:'pointer' }}
                                    >
                                        <Row type="flex" justify="left" align="top">
                                            <Col span={6}>
                                                    <img onClick={()=>(this.toClass(item.CourseId))} width={272} alt="logo" src={"/images/course/" + item.CourseImage} style={{height:'121px', width:'121px'}}/>
                                            </Col>
                                            <Col span={12}>
                                                <List.Item.Meta
                                                    onClick={()=>(this.toClass(item.CourseId))}    
                                                    title={item.CourseName} 
                                                />      
                                            </Col>
                                            <Col span={4}>
                                                <h2 data-scrollama-index="1" style={{float:"right"}}>
                                                    <span>${item.CoursePrice}</span>
                                                </h2>
                                            </Col>
                                        </Row>
                                    </List.Item>
                                )}
                            />
                        </Col>
                        <Col span={4}>
                            <p>Total:</p>
                            <h1><span>${price()}</span></h1>  <br />
                            <Button type="danger" onClick={()=> this.toCheckout()}>Checkout</Button>       
                        </Col>
                  </Row>
                </div>
            </Content>
            <Footer />
          </Layout>
        )
    }
}

export default CartList;