import React, {Component} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { connect } from "react-redux";
import { fetchEmployes,saveEmployee } from "../services/EmployeeService";
import { bindActionCreators } from 'redux';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';

class NewEmployee extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            value: null
        };
		this.saveHandle = this.saveHandle.bind(this);
		
    }
	
    saveHandle() {
		var name = this.state.value1
		var city = this.state.value2
		var employee =	JSON.stringify({name,city})
		this.props.dispatch(saveEmployee(employee));
		this.state.value1 = "";
		this.state.value2 = "";
    }
	
    render() {
		
        return (
            <div>
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>New Employee : </h1>
                    </div>
					
                </div>
				<div>
					Name: <InputText value={this.state.value1} onChange={(e) => this.setState({value1: e.target.value})} />
					<br/>
					City: <InputText value={this.state.value2} onChange={(e) => this.setState({value2: e.target.value})} />
					<br/>
					<Button label="Save" onClick={this.saveHandle} className="p-button-secondary" />
				</div>
            </div>
        )
    }
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(fetchEmployes, dispatch) }
}

export default connect(mapDispatchToProps)(NewEmployee);


