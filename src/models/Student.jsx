import React, {Component} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { connect } from "react-redux";
import { fetchStudent } from "../services/StudentService";
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Link } from "react-router-dom";
import Modal from 'react-modal';
import CourseForStudentModal from './CourseForStudentModal.jsx';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
  

class Student extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showcourse: false,
			StudentID: "",
			StudentName: "",
        };
		this.CourseJoinedLink = this.CourseJoinedLink.bind(this);
		this.openCourses = this.openCourses.bind(this);
		this.closeCourses = this.closeCourses.bind(this);
		this.showCourses = this.showCourses.bind(this);
	}

	componentDidMount() {
		 console.log("ite")
		this.props.dispatch(fetchStudent());
	}

	
	openCourses(StudentID,StudentName) {
		this.state.StudentID=StudentID
		this.state.StudentName=StudentName
		this.setState({showcourse: true});
	}
	closeCourses() {
		this.setState({showcourse: false});
	}
		
	showCourses() {
        return <div>
				<Modal
				  isOpen={this.state.showcourse}
				  onHide={this.closeCourses}
				  style={customStyles}
				  contentLabel="Number of student joined" 
				>
				<CourseForStudentModal StudentID={this.state.StudentID} StudentName={this.state.StudentName}  />
				<button className="btn btn-info btn-block close-button" onClick={this.closeCourses}></button>
				</Modal >			
        </div>;
				
    }	
	
	CourseJoinedLink(rowData, column) {
		console.log("---------------",rowData)
        let CourseJoined = 0;
		if(rowData.CourseJoined)
			CourseJoined = rowData.CourseJoined
		let StudentId = rowData.StudentId;
		let StudentName = rowData.StudentName;
		console.log(StudentId,StudentName)
        return <div>
				<button id="thinh" value="thinh" onClick={() => this.openCourses(StudentId,StudentName)}>{CourseJoined}</button>
        </div>;
				
    }
	
    render() {

		console.log(this.props.students)
	    var eCount = this.props.students.items ? this.props.students.items.length: 0;
        var header = <div className="p-clearfix" style={{'lineHeight':'1.87em'}}>List of Students </div>;
        var footer = "There are " + eCount + ' Students';
	
    return (
		<div>
			<DataTable value={this.props.students.items} style={{width: '800px'}} header={header} footer={footer}>
				<Column field="StudentId" header="Id" style={{width:'50px', textAlign:'center'}}/>
				<Column field="StudentName" header="Student Name"  style={{width:'150px', textAlign:'center'}} />
				<Column field="Phone" header="Phone" style={{width:'100px', textAlign:'center'}}/>
				<Column field="Email" header="Email" style={{width:'200px', textAlign:'center'}}/>
				<Column field="Address" header="Address" style={{width:'150px', textAlign:'center'}} />
				<Column field="CourseJoined" header="Courses Joined" body={this.CourseJoinedLink} style={{width:'150px', textAlign:'center'}} />
			</DataTable>
			{this.showCourses()}
		</div>
    );
    }
}


const mapStateToProps = state => ({
	 students: state.studentReducer
});
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(fetchStudent, dispatch) }
}
export default connect(mapStateToProps)(Student);
