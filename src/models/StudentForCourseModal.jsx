import React, {Component} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { connect } from "react-redux";
import { fetchStudentByCourseID } from "../services/StudentService";
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Link } from "react-router-dom";

class StudentForCourseModal extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.dispatch(fetchStudentByCourseID(this.props.CourseID));
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
       
		console.log(this.props.students)
	    var eCount = this.props.students.items ? this.props.students.items.length: 0;
        var header = <div className="p-clearfix" style={{'lineHeight':'1.87em'}}>List Students have joined {this.props.CourseName} course</div>;
        var footer = "There are " + eCount + ' Students';
	
    return (
		<div>
			<DataTable value={this.props.students.items} style={{width: '600px'}} header={header} footer={footer}>
				<Column field="StudentName" header="Student Name"  style={{width:'150px', textAlign:'center'}} />
				<Column field="Email" header="Email" style={{width:'200px', textAlign:'center'}}/>
				<Column field="Status" header="Status"  body={this.renderSwitch} style={{width:'200px', textAlign:'center'}} />
			</DataTable>
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
export default connect(mapStateToProps)(StudentForCourseModal);
