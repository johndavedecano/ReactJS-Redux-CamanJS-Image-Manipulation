import React, { Component } from 'react';
import { connect } from 'react-redux';
import Alert from './Alert';
import Selector from './Selector';
import Settings from './Settings';

class Controls extends Component {
	constructor(props, context) {
		super(props, context);
		this.onSubmitHandler = this.onSubmitHandler.bind(this);
	}
	/**
	 * Prevents from from being submitted.
	 * @param  {object} e
	 * @return {boolean}
	 */
	onSubmitHandler(e) {
		e.preventDefault();
		return false;
	}
	render() {
		return (
			<div className="col-md-3" id="controls">
				<div className="controls-wrapper">
					<h2>Image Manipulation</h2>
					<hr/>
					<form onSubmit={this.onSubmitHandler}>
					{ this.props.image.loaded == false ? <Selector /> : <Settings /> }
					</form>
				</div>
			</div>
		);
	}
}

export default connect(function(state) {
	return {
		image : state.image
	}
})(Controls);