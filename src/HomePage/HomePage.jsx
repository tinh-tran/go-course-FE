import React, {Component} from 'react';
import { HeaderPage } from '../HomePage/HeaderPage.jsx';
class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div >
						<HeaderPage />
						<div className="p-grid">
							<div className="p-col-2"></div>
							<div className="p-col-8">
								HomePage
							</div>
							<div className="p-col-2"></div>				
							</div>
						</div>
				
        );
    }
}
export default HomePage;