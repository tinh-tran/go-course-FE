import React, {Component} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { connect } from "react-redux";
import { fetchEmployes } from "../services/EmployeeService";
import { bindActionCreators } from 'redux';
import NewEmployee from './NewEmployee.jsx';
import { BrowserRouter as Router, Link } from "react-router-dom";

class Employee extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		 console.log("ite")
		this.props.dispatch(fetchEmployes());
	}

    render() {
        let cols = [
        {field: 'Id', header: 'Id'},
        {field: 'Name', header: 'Name'},
        {field: 'City', header: 'City'}
    ]; 

    let dynamicColumns = cols.map((col,i) => {
        return <Column key={col.field} field={col.field} header={col.header} />;
    });
		console.log(this.props.employees)
	    var eCount = this.props.employees.items ? this.props.employees.items.length: 0;
        var header = <div className="p-clearfix" style={{'lineHeight':'1.87em'}}>List of Employee </div>;
        var footer = "There are " + eCount + ' Employee';
	
    return (
		<div>
       <DataTable value={this.props.employees.items} style={{width: '600px'}} header={header} footer={footer}>
            {dynamicColumns}
        </DataTable>
		
		<NewEmployee/>
		</div>
    );
    }
}


const mapStateToProps = state => ({
	 employees: state.employeeReducer
});
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(fetchEmployes, dispatch) }
}
export default connect(mapStateToProps)(Employee);
