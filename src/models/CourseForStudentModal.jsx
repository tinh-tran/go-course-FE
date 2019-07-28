import React, {Component} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { connect } from "react-redux";
import { fetchCoursesByStudentId } from "../services/CourseService";
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Link } from "react-router-dom";

class CourseForStudentModal extends Component {
	constructor(props) {
		super(props);
		console.log("-----------",this.props)
	}

	componentDidMount() {
		this.props.dispatch(fetchCoursesByStudentId(this.props.StudentID));
	}
	
	renderSwitch(rowData, column) {
		var status = rowData.Status
		return (
			<div>
			  {(function() {
				switch(status) {
					case 3:
						return "Done";
					case 1:
						return  "Start Learning";
					case 2:
						return  "In progress";
					default:
						return "Enroll";}
			  })()}
			</div>
		  );
	}
	
    render() {
		console.log("--------+++++++++---------",this.props.courses)
	    var eCount = this.props.courses.items ? this.props.courses.items.length: 0;
        var header = <div className="p-clearfix" style={{'lineHeight':'1.87em'}}>List courses that {this.props.StudentName} has joined: </div>;
        var footer = "There are " + eCount + ' Courses';
	
    return (
		<div>
			<DataTable value={this.props.courses.items} style={{width: '700px'}} header={header} footer={footer}>
				<Column field="CourseName" header="Course Name"  style={{width:'150px', textAlign:'center'}} />
				<Column field="CategoryName" header="Category Name" style={{width:'200px', textAlign:'center'}}/>
				<Column field="JoinDate" header="Joined Date" style={{width:'150px', textAlign:'center'}}/>
				<Column field="Status" header="Status"  body={this.renderSwitch} style={{width:'150px', textAlign:'center'}} />
			</DataTable>
		</div>
    );
    }
}


const mapStateToProps = state => ({
	 courses: state.courseReducer
});
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(fetchCoursesByStudentId, dispatch) }
}
export default connect(mapStateToProps)(CourseForStudentModal);
