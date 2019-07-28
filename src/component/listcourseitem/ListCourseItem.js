import React from 'react';
import { Icon , Row , Col } from 'antd';
import { withRouter } from 'react-router-dom'
import { courseReducer } from '../../reducers/courseReducer';

class ListCoureItem extends React.Component{
    toClass(CourseId){
        this.props.history.push(`/class/${CourseId}`)   
    }
    render(){
        const {CourseImage , CoursePrice , CourseName , SlotAvailable , SlotRegistered , CategoryName } = this.props
        var src = "/images/course/" + CourseImage;
        return(
            <div style={{ width:'216px',margin:'0 auto',cursor:'pointer' }} onClick={()=>(this.toClass(this.props.CourseId))}>
                <img src={src} alt='List Course' style={{height:'121px', width:'215px'}} />
                <div style={{ padding:'12px 8px' }}>
                    <div className='hotclassitem-classname' style={{fontSize:'16px' , fontWeight:'500' , width:'200px',wordWrap:'break-word',textAlign:'left',height:'46px',overflow:'hidden' }}>
                        <p style={{  lineHeight:'24px' }}>{CourseName}</p>
                    </div>
                    <div className='hotclassitem-classinfo' style={{ width:'200px',height:'24px' }}>
                        <Row>
                            <Col span={17} >
                                <span style={{ float:'left' }}><Icon type="profile" />{CoursePrice}</span> 
                            </Col>
                            <Col span={7}>
                                <span style={{ float:'right' }}><Icon type="solution"/>{SlotAvailable}</span> 
                            </Col>     
                        </Row>                           
                    </div>
                    <div className='hotclassitem-classinfo' style={{ width:'200px',height:'24px',marginTop:'5px' }}>
                        <Row>
                            <Col span={10} >
                                <span style={{ float:'left' }}><Icon type="book" />{CategoryName}</span> 
                            </Col>
                            <Col span={14}>
                                <span style={{ float:'right' }}><Icon type="usergroup-add" />{SlotRegistered}</span> 
                            </Col>     
                        </Row>                           
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ListCoureItem);