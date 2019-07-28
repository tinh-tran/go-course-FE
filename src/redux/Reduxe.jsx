import React, {Component} from 'react';
import Counter from '../containers/Counter';
import AddCounter from '../containers/AddCounter';
import RemoveCounter from '../containers/RemoveCounter';

export class Reduxe extends Component {
    render() {
        return (
           <div className="container">
				<Counter></Counter><br />
				<div className="columns">
					<div className="column is-11">
						<AddCounter></AddCounter>
					</div>
					<div className="column auto">
						<RemoveCounter></RemoveCounter>
					</div>
				</div>
			</div>
        )
    }
}
