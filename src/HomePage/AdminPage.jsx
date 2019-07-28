import React, {Component} from 'react';
import {TabMenu} from 'primereact/tabmenu';
import {Reduxe} from '../redux/Reduxe.jsx';
import Student from '../models/Student.jsx';
import Course from '../models/Course.jsx';
import Category from '../models/Category.jsx';
import LogInPage from '../LoginPage/LoginPage.jsx';
import { HeaderPage } from '../HomePage/HeaderPage.jsx';
import { createLogger } from 'redux-logger';
import { Link } from 'react-router-dom'
import 'primeflex/primeflex.css';
import {Button} from 'primereact/button';
import {connect} from 'react-redux';  
import * as sessionActions from '../actions/sessionActions';
import { bindActionCreators } from 'redux';
import './AdminPage.css';

const divStyle = {
  margin: '50px',
  border: '5px solid pink',
  textAlign: 'center'
};

const divlogin = {
  margin: '1px',
  textAlign: 'center'
};


const bodyStyle = {
  align: 'center'
};

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                {label: 'Catagory Management', icon: 'pi pi-fw pi-pencil'},
                {label: 'Course Management', icon: 'pi pi-fw pi-file'},
				{label: 'Student Management', icon: 'pi pi-fw pi-file'}
            ],
			activeItem : {}
        };
		this.handleChange = this.handleChange.bind(this); 
		this.renderSwitch = this.renderSwitch.bind(this); 
		this.logout = this.logout.bind(this); 
    }

		
    handleChange(e) {
		console.log(e)
		this.setState({activeItem: e.value})
    }
	
	renderSwitch(items) {
		return (
			<div>
			  {(function() {
				switch(items) {
				  case 'Course Management':
					return <Course/>;
				  case 'Student Management':
					return  <Student/>;
				  default:
					return <Category/>;}
			  })()}
			</div>
		  );
	}
	
	logout() {
		this.props.actions.logOutUser();
		this.props.history.push('/login') 
	}
	
    render() {
		let userMessage
		if (this.props.actions.isAdminAuthen()) {
		userMessage = (
				<div>
				<Button label="Log out" onClick={this.logout} className="p-button-info" />
				</div>
			)
		} else {
			console.log("boa  " , this.props.jwt)
			userMessage = (
				<div className="p-col-2" > <Link className="login" to="/login" style={divlogin}> Log out </Link> </div>
			)
		}
        return (
            <div >
						<HeaderPage />
						<div className="p-grid">
							<div className="p-col-2"></div>
							<div className="p-col-8">
								<div className="p-grid">
									<div className="p-col-10">
									<TabMenu model={this.state.items} activeItem={this.state.activeItem} onTabChange={this.handleChange}/>
									</div>
									<div className="p-col-2">{userMessage}</div>
								</div>	
								{this.renderSwitch(this.state.activeItem.label)}
							</div>
							<div className="p-col-2"></div>				
							</div>
						</div>
				
        );
    }
}
 
function mapDispatchToProps(dispatch) {  
  return { actions: bindActionCreators(sessionActions, dispatch)}
}
export default connect(null, mapDispatchToProps)(AdminPage);