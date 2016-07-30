import React, { Component } from 'react';
import { connect } from 'react-redux';
import Canvas from './components/Canvas';
import Controls from './components/Controls';

class Main extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<div className="wrapper">
				<div className="row">
					<Controls/>
					<Canvas/>
				</div>
			</div>
		)
	}
}

Main.contextTypes = {
    router  : React.PropTypes.object.isRequired
};

export default connect(function(state) {
	return {

	};
})(Main);