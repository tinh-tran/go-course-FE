import React, {Component} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { connect } from "react-redux";
import { fetchCourses, removeCourse } from "../services/CourseService";
import { fetchCategory} from "../services/CategoryService";
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Link } from "react-router-dom";
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import NewCourse from './NewCourse.jsx';
import StudentForCourseModal from './StudentForCourseModal.jsx';
import Modal from 'react-modal';
import {ContextMenu} from 'primereact/contextmenu';

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
  
class Course extends Component {
	constructor(props) {
        super(props);
		this.state = {
            listCate: null,
            showModal: false,
			showStudent: false,
			StudentCourseName: "",
			StudentCourseID: 	"",
        };
        this.removeHandle = this.removeHandle.bind(this)
        this.openNew = this.openNew.bind(this)
		this.openModal = this.openModal.bind(this);
		this.onEditCour = this.onEditCour.bind(this);
		this.onNewCour = this.onNewCour.bind(this);
        this.closeModal = this.closeModal.bind(this);
		this.openStudents = this.openStudents.bind(this);
		this.closeStudents = this.closeStudents.bind(this);
		this.StudentJoinedLink = this.StudentJoinedLink.bind(this);
		this.showStudents = this.showStudents.bind(this);
        this.export = this.export.bind(this);
    }
    courseImg(rowData,column) {
        var src = "/images/course/" + rowData.CourseImage;
		console.log ("src " ,src)
        return <img src={src} alt={rowData.CourseImage} width="48px" />;
    }
    courseCateName(rowData,column) {
        var cateName = rowData.CourseImage;
    }
    removeHandle(e) {
		var id = this.state.selected.CourseId;
        this.props.dispatch(removeCourse(id));
    }
	componentDidMount() {
		this.props.dispatch(fetchCourses());
    }
    actionCategory() {
        return <NewCourse modalIsOpen={true}/>;
    }
    openNew(e) {
		console.log(" ediItem: ",  this.ediItem)
        return <div>
				<Modal
				  isOpen={this.state.modalIsOpen}
				  onHide={this.closeModal}
				  style={customStyles}
				  contentLabel="New Course" 
				>
				<button className="btn btn-info btn-block close-button" onClick={this.closeModal}></button>
				<NewCourse course={this.ediItem} onClose={this.closeModal} />
				</Modal >			
        </div>;
    }
    rowExpansionTemplate(data) {
        const src = "/images/course/" + data.CourseImage;
        return  (
            
            <div className="p-grid p-fluid" style={{padding: '1em'}}>
                <div className="p-col-12 p-md-8" style={{textAlign:'center'}}>
                <img src={src} alt={data.CourseImage}/>
                </div>
                    <div className="p-col-12 p-md-4">
                    <div className="p-grid">
                        <div className="p-md-4">Start Date: </div>
                        <div className="p-md-8" style={{fontWeight:'bold'}}>{data.StartDate}</div>

                        <div className="p-md-4">End Date: </div>
                        <div className="p-md-8" style={{fontWeight:'bold'}}>{data.EndDate}</div>

                        <div className="p-md-4">Slot Available: </div>
                        <div className="p-md-8" style={{fontWeight:'bold'}}>{data.SlotAvailable}</div>

                        <div className="p-md-4">Slot Registered: </div>
                        <div className="p-md-8" style={{fontWeight:'bold'}}>{data.SlotRegistered}</div>
                    </div>
                </div>
            </div>
        );
    }

	openModal() {
		this.setState({modalIsOpen: true});
	}

	onEditCour(e) {
		this.ediItem = e.data
		this.openModal();
	}
	onNewCour() {
		this.ediItem = "";
		this.openModal();
	}
	
	closeModal() {
		this.setState({modalIsOpen: false});
    }
    export() {
        this.dt.exportCSV();
    }
	
	openStudents(CourseID,CourseName) {
		this.state.StudentCourseID=CourseID
		this.state.StudentCourseName=CourseName
		this.setState({showStudent: true});
	}
	closeStudents() {
		this.setState({showStudent: false});
	}
	StudentJoinedLink(rowData, column) {
		let StudentJoined = 0;
		if(rowData.StudentJoined)
			StudentJoined = rowData.StudentJoined;
		let CourseName = rowData.CourseName;
		let CourseID = rowData.CourseId;
		console.log("rowData",rowData)
        return <div>
				<button id="thinh" value="thinh" onClick={() => this.openStudents(CourseID,CourseName)}>{StudentJoined}</button>
        </div>;
				
    }
	showStudents() {
        return <div>
				<Modal
				  isOpen={this.state.showStudent}
				  onHide={this.closeStudents}
				  style={customStyles}
				  contentLabel="Number of student joined" 
				>
				<StudentForCourseModal CourseID={this.state.StudentCourseID} CourseName={this.state.StudentCourseName}  />
				<button className="btn btn-info btn-block close-button" onClick={this.closeStudents}></button>
				</Modal >			
        </div>;
				
    }
    render() {  
        console.log(JSON.stringify(this.props.courses.items));
	    var eCount = this.props.courses.items ? this.props.courses.items.length: 0;
        var header = <div style={{textAlign:'left'}}><Button  onClick={this.onNewCour} type="button" label="New Course" className="p-button-info"  style={{marginRight: '.5em'}} >
        </Button><Button type="button" icon="pi pi-external-link" iconPos="left" label="CSV" onClick={this.export}></Button></div>;
        var footer = "There are " + eCount + ' Courses';
        let paginatorLeft = <Button icon="pi pi-refresh"/>;
        let paginatorRight = <Button icon="pi pi-cloud-upload"/>;
        let items = [
            {label: 'Delete', icon: 'pi pi-fw pi-times', command: (event) => this.removeHandle(this.state.selected)}
        ];

        return (
        <div className="content-section implementation">
          <div className="content-section">
                    <div className="feature-intro">
                        <h1>Course Management Page</h1>
                        <p>List Of Course.</p>
                    </div>
                </div>
        <ContextMenu model={items} ref={el => this.cm = el}/>
        <DataTable selectionMode="single" onRowDoubleClick={this.onEditCour} value={this.props.courses.items} style={{width: '780px;'}} header={header} footer={footer} onSelectionChange={(e) => this.setState({selected: e.data})} ref={(el) => { this.dt = el; }} paginatorLeft={paginatorLeft} paginatorRight={paginatorRight} 
            rows={10} rowsPerPageOptions={[5,10,20]} paginator={true} contextMenu={this.cm} resizableColumns={true}
            expandedRows={this.state.expandedRows} onRowToggle={(e) => this.setState({expandedRows:e.data})} rowExpansionTemplate={this.rowExpansionTemplate}
        >	
            <Column expander={true} style={{width: '60px'}} />
            <Column field="CourseName" header="Name"  style={{width:'150px', textAlign:'center'}} />
            <Column field="CategoryName" header="Category Name" filter={true} style={{width:'200px', textAlign:'center'}}/>
            <Column field="CourseDescription" header="Description" style={{width:'200px', textAlign:'center'}} />
            <Column field="StudentJoined" header="Student Joined" body={this.StudentJoinedLink} style={{width:'150px', textAlign:'center'}} />
        </DataTable>
            {this.openNew()}
			{this.showStudents()}
        </div>
    );
    }
}

const mapStateToProps = state => ({
	 courses: state.courseReducer
});
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(fetchCourses,dispatch) }
}
export default connect(mapStateToProps)(Course);
