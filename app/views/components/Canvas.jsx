import React, { Component } from 'react';
import { connect } from 'react-redux';

class Canvas extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const canvasStyles = {
			margin: 'auto',
			position:'absolute',
			left:0,
			right:0
		}
		return (
			<div className="col-md-9" ref="canvasWrapper" id="canvas-wrapper">
				<div id="canvas-inner">
					<canvas ref="canvas" id="canvas" style={canvasStyles}></canvas>
				</div>
			</div>
		);
	}
}

export default connect(function(state) {
	return {
		...state
	}
})(Canvas);