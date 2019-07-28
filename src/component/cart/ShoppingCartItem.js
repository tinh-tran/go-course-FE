import React from 'react';
import { Icon , Row , Col, Button } from 'antd';
import { withRouter } from 'react-router-dom'

class ShoppingCartItem extends React.Component{
    render(){
        const {CoursePrice , CourseName, CourseImage } = this.props
        var src = "/images/course/" + CourseImage;
        return(
            <div style={{ width:'250px',margin:'0 auto',cursor:'pointer' }}>  
                <div style={{ padding:'12px 8px' }}>
                <Row>
                    <Col span={4}><img src={src} alt='List Course' style={{height:'50px', width:'50px'}} /></Col>
                    <Col span={8} offset={8}>
                        <div className='hotclassitem-classname' style={{fontSize:'16px' , fontWeight:'500' , width:'150px',wordWrap:'break-word',textAlign:'left',height:'46px',overflow:'hidden' }}>
                            <h3 style={{  lineHeight:'24px' }}>{CourseName}</h3>
                        </div>
                        <div className='hotclassitem-classinfo' style={{ width:'150px',height:'24px' }}>
                            <Row>
                                <span style={{ float:'left' }}><b>Price: </b>{CoursePrice}$</span> 
                            </Row>                           
                        </div>
                    </Col>       
                </Row>
                </div>
            </div>
        )
    }
}

export default withRouter(ShoppingCartItem);