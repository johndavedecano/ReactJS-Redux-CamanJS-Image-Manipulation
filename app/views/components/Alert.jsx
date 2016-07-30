import React, { Component } from 'react';
import { connect } from 'react-redux';

class Alert extends Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		const alertClass = 'alert ' + this.props.type;

		return (
			<div className={alertClass}
			    role="alert">{this.props.message}
			</div>
		);
	}
}

Alert.defaultProps = {
	type    : 'alert-info',
	message : ''
};

Alert.propTypes = {
	type    : React.PropTypes.string,
	message : React.PropTypes.string
};

export default Alert;