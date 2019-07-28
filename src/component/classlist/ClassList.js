import React from 'react';
import './classlist.css';
import { withRouter } from 'react-router-dom';
import { List , Icon , Pagination, Card, Row, Col } from 'antd';


const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);

class ClassList extends React.Component {
    constructor(props){
        super(props);
        this.ChangeClasspage = this.ChangeClasspage.bind(this);
        this.toClass = this.toClass.bind(this);
    }
    toClass(classid){
        this.props.history.push(`/class/${classid}`)
    }
    ChangeClasspage(v){
        let info = {
            CategoryID:this.props.classnum.CategoryID,
            Page:v
        }
        console.log("ChangeClasspage:" + this.props.classnum.classtype)
        this.props.LoadClass(info);
    }
    render() {
        const gridStyle = {
            width: '100%',
            textAlign: 'center',
            float:'left'
        };
        const { classlist , classnum } = this.props;
        const listData = classlist.classdata;
        return (
            <div>
                <List
                    grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
                    itemLayout="vertical"
                    size="large" 
                    dataSource={listData}
                    renderItem={item => (
                        <List.Item
                            key={item.CourseId}
                            style={{ cursor:'pointer' }}
                            onClick={()=>(this.toClass(item.CourseId))}
                        >
                        <Card.Grid  style={gridStyle}>
                        <div style={{ width:'100%',margin:'0 auto',cursor:'pointer'}}>
                            <img src={"/images/course/" + item.CourseImage} alt='List Course' style={{height:'121px', width:'215px'}} />
                                <div style={{ padding:'12px 8px' }}>
                                    <div className='hotclassitem-classname' style={{fontSize:'16px' , fontWeight:'500' , width:'200px',wordWrap:'break-word',textAlign:'left',height:'46px',overflow:'hidden' }}>
                                        <p style={{  lineHeight:'24px' }}>{item.CourseName}</p>
                                    </div>
                                    <div className='hotclassitem-classinfo' style={{ width:'200px',height:'24px' }}>
                                        <Row>
                                            <Col span={17} >
                                                <span style={{ float:'left' }}><Icon type="profile" />{item.CoursePrice}</span> 
                                            </Col>
                                            <Col span={7}>
                                                <span style={{ float:'right' }}><Icon type="solution"/>{item.SlotAvailable}</span> 
                                            </Col>     
                                        </Row>                           
                                    </div>
                                    <div className='hotclassitem-classinfo' style={{ width:'200px',height:'24px',marginTop:'5px' }}>
                                        <Row>
                                            <Col span={10} >
                                                <span style={{ float:'left' }}><Icon type="book" />{item.CategoryName}</span> 
                                            </Col>
                                            <Col span={14}>
                                                <span style={{ float:'right' }}><Icon type="usergroup-add" />{item.SlotRegistered}</span> 
                                            </Col>     
                                        </Row>                           
                                    </div>
                                </div>
                            </div>
                        </Card.Grid>
                        </List.Item>
                    )}
                />
                <Pagination defaultCurrent={classlist.Page} total={ classnum.Num } pageSize={6} style={{  textAlign:'center' , marginTop:'10px' }} onChange={v=>this.ChangeClasspage(v)}/>
            </div>
        )
    }
}

export default withRouter(ClassList);