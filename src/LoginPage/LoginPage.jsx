import React, {PropTypes} from 'react';  
import {bindActionCreators} from 'redux';  
import {connect} from 'react-redux';  
import * as sessionActions from '../actions/sessionActions';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import { HeaderPage } from '../HomePage/HeaderPage.jsx';
import { Redirect } from 'react-router-dom';


class LogInPage extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
		value: null,
		}
    this.login = this.login.bind(this);
	this.logout = this.logout.bind(this);
  }

  
  login() {
	var user = this.state.value1
	var password = this.state.value2
	var user =	JSON.stringify({user,password})
    this.props.actions.Login(user);
	
  }
  
  logout() {
	 this.props.actions.logOutUser();
	 this.props.history.push('/login') 
  }
  
  render() {
	let userMessage
		if (this.props.actions.isAdminAuthen()) {
			 console.log("moa  " , this.props.jwt)
		userMessage = (
				<div>
				<h2>Welcome {sessionStorage.user } ! you're loged in under {sessionStorage.role} role </h2>
				<Button label="Log out" onClick={this.logout} className="p-button-secondary" />
				</div>
			)
		} else {
			console.log("boa  " , this.props.jwt)
			userMessage = (
			<div class="login-form">
				<h2 style={{textAlign:'center'}}> Please log in before going to the course: </h2> 
				<br/>
				<div class="p-grid">
					<div class="p-col-4">
					</div>
					<div class="p-col-8">
							<p>User Name: </p><InputText value={this.state.value1} onChange={(e) => this.setState({value1: e.target.value})} />
							<br/>
							<p>PassWord: </p><InputText value={this.state.value2} onChange={(e) => this.setState({value2: e.target.value})} />
							<br/>
							<div class="clear-fix">
							<Button label="Log In" onClick={this.login} className="p-button-success"  />
					</div>
				</div>
			
			</div>
			</div>
				
			)
		}
		
    return (
		    
		<div>
			<HeaderPage />
					<div className="p-grid">
					<div className="p-col-2"></div>
					<div className="p-col-8">
					{userMessage}

					</div>
					<div className="p-col-2"></div>
							
				</div>

		</div>
  );
  }
}
const mapStateToProps = state => ({
	 jwt: sessionStorage.jwt
});
function mapDispatchToProps(dispatch) {  
  return { actions: bindActionCreators(sessionActions, dispatch)}
}
export default connect(mapStateToProps, mapDispatchToProps)(LogInPage);