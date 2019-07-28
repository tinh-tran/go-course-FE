import React, {Component} from 'react';
import { Table } from 'antd';
import { connect } from "react-redux";
import { fetchStudentByCourseID } from "./../../services/StudentService";
import { bindActionCreators } from 'redux';

class StudentJoin extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.dispatch(fetchStudentByCourseID(this.props.classinfo.CourseId));
	}
	
    render() {
        let cols = [
            { title: 'Student Name',
            dataIndex: 'CustomerName',
            width: 150,},
            { 
            title: 'Email',
            dataIndex: 'Email',
            width: 150,},
            {title: 'Status',
            dataIndex: 'Status',
            width: 150,}]
    return (
			<div>
				<Table columns={cols} dataSource={this.props.students.items} pagination={{ pageSize: 50 }} ></Table>
			</div>
			);
    }
}
const mapStateToProps = state => ({
	 students: state.studentReducer
});
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(fetchStudentByCourseID, dispatch) }
}
export default connect(mapStateToProps)(StudentJoin);
