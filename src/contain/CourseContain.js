import React from 'react';
import Course from './../component/course/Course';
import TopLeftBar from './../component/topleftbar/TopLeftBar';
import { connect } from 'react-redux'
import { ChangeHeader , Login , SearchItem , LoadCourse , IsSelect , LoadChapter , LoadSection , SelectCourse, Register } from '../actions';
import { getCourseInfo } from '../selecter';

class CourseContain extends React.Component{
    componentWillMount(){
        this.props.LoadChapter(parseInt(this.props.match.params.id));
        this.props.LoadSection(parseInt(this.props.match.params.id));
        this.props.IsSelect(parseInt(this.props.user.CustomerId),parseInt(this.props.match.params.id));
        this.props.LoadCourse(parseInt(this.props.match.params.id));
    }
    render(){
        return(
            <Course {...this.props} />
        )
    }
}

const mapStateToProps = state=>({
    courseInfo:getCourseInfo(state.course.classchapter,state.course.classsection),
    course:state.course,
    header:state.header,
    user:state.user
})


export default connect(mapStateToProps , { ChangeHeader , Login , SearchItem , LoadCourse , IsSelect , LoadChapter , LoadSection , SelectCourse, Register })(CourseContain);