import React from 'react';
import { Card } from 'antd';
import ListCourseItem from '../listcourseitem/ListCourseItem';
import './listcourse.css';

class ListCourse extends React.Component {
    render() {
        const gridStyle = {
            width: '33,33%',
            textAlign: 'center',
        };
        const hotClassListItem = this.props.courseList || [''];
        const courseList = hotClassListItem.map((v,index)=>(
            <Card.Grid style={gridStyle} key={index}>
                <ListCourseItem 
                    CourseId={v.CourseId}
                    CourseImage={v.CourseImage} 
                    CourseName={v.CourseName} 
                    CoursePrice={v.CoursePrice} 
                    SlotAvailable={v.SlotAvailable} 
                    SlotRegistered={v.SlotRegistered} 
                    CategoryName={v.CategoryName}
                />
            </Card.Grid>
        ))
        return (
            <div style={{ background: '#fff' , padding: 24 ,boxShadow:'0 2px 8px 0 rgba(7,17,27,.66)' }}>
                <div style={{ textAlign:'center',margin:'10px 0 30px 0' }}>
                    <span className='hotclassicon-left'></span>
                    <div className='hotclasstext-center'>
                        <em>List</em>
                        /
                        <em>Course</em>
                        /
                    </div>
                    <span className='hotclassicon-right'></span>
                </div>
                <Card id='hotclasscard' style={{ border:'0' }}>
                    {courseList}  
                </Card>
            </div>
        )
    }
}

export default ListCourse;