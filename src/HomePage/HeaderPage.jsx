import React, {Component} from 'react';

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

export class HeaderPage extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div >
				<div style={divStyle}>
                    <div className="feature-intro">
                        <h1>Welcome to S3 Course Website</h1>
                        <p>Start learning for Better future ... Later Better Than Never</p>
                    </div>
                </div>
            </div>
        );
    }
}
     