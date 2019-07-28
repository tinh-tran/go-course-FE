import React, { Component } from 'react';
import { Router, Route,Switch, Redirect } from 'react-router-dom';
import HomeContain from './HomeContain';
import ClassContain from './ClassContain';
import DataContain from './DataContain';
import CourseContain from './CourseContain';
import UserContain from './UserContain';
import OrderContain from './OrderContain';
import CheckoutContain from './CheckoutContain'
import { Elements, StripeProvider } from "react-stripe-elements";
import {STRIPE_KEY} from '.././config'
import history from '../history/history.js';

class Main extends Component {
    render() {
        return (
			<Router exact history={history} >
				<div>
                
                    <Route path='/' exact component={ClassContain} />
                    <Route path='/class/:id' component={CourseContain} />
                    {/* <Route path='/class' exact component={HomeContain} /> 
                    <Route path='/bigdata' exact component={DataContain} /> */}
                    <Route path='/cart' exact component={OrderContain} />
                    <StripeProvider apiKey={STRIPE_KEY}>
                        <Elements>
                            <Route path='/checkout' exact component={CheckoutContain} />
                        </Elements>
                    </StripeProvider>
                    <Route path='/user' exact component={UserContain} />
				</div>
			 </Router>

        )
    }
    
}
export default Main;