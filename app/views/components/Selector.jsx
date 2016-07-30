import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadImage, saveImageObject } from './../../actions';

/**
 * Selector - Handle the file selection and preview process.
 */
class Selector extends Component {
	/**
	 * constructor.
	 */
	constructor(props, context) {
		super(props, context);
		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.types = ['image/png', 'image/jpg', 'image/gif', 'image/jpeg'];
	}
	/**
	 * isValidFile - Checks wether the file is an image
	 * @param  {string}  mime
	 * @return {Boolean}
	 */
	isValidFile(mime) {
		return (this.types.indexOf(mime) !== -1) ? true : false;
	}
	/**
	 * onChangeHandler - Handles the on change event of the file input.
	 * @param  {object} - Event object passed from dom
	 * @return {boolean}
	 */
	onChangeHandler(e) {
		const file = e.target.files[0];
		if (this.isValidFile(file.type)) {
			const reader = new FileReader();
			reader.addEventListener("load", () => {
				this.props.dispatch(loadImage(true));
				this.renderImageOnCanvas(reader.result);
			});
			reader.readAsDataURL(file);
			return true;
		}
		alert("Invalid mime type!");
		return false;
	}
	renderImageOnCanvas(data) {
		let canvas = document.getElementById('canvas');
		let ctx = canvas.getContext('2d');
		const parent = document.getElementById('canvas-inner');
		const padding = 100;
		let img = new Image();
		img.src = data;
		if (parent.offsetWidth < img.width) {
			let percentage = ((img.width - parent.offsetWidth) / img.width) * 100;
			img.width = (img.width - ((percentage / 100) * img.height)) - padding;
			img.height = (img.height - ((percentage / 100) * img.height)) - padding;
		}
		// Save Image Object to State
		img.onload = () => {
			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0, img.width, img.height);
			this.props.dispatch(saveImageObject(img));
			Caman(canvas, function() {
				this.replaceCanvas(canvas);
				this.render();
			});
		}
	}
	render() {
		return (
			<div className="row">
				<div className="col-md-12 form-group">
					<label>Select an Image</label>
					<input type="file" ref="file" onChange={this.onChangeHandler} />
				</div>	
			</div>
		);
	}
}

export default connect(function(state) {
  return {
    ...state
  }
})(Selector);