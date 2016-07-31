import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadImage, updateFilters } from './../../actions';

class Settings extends Component {
	constructor(props, context) {
		super(props, context);
		this.onClearImage = this.onClearImage.bind(this);
		this.onChangeFilter = this.onChangeFilter.bind(this);
		this.onResetCanvas = this.onResetCanvas.bind(this);
		this.resetCanvas = this.resetCanvas.bind(this);
		this.onSaveCanvas = this.onSaveCanvas.bind(this);
		this.applyPresetFilter = this.applyPresetFilter.bind(this);
	}
	componentDidMount() {
		this.regiterCustomFilters();
	}
	/**
	 * Register some preset filters
	 * @return {void}
	 */
	regiterCustomFilters() {
		Caman.Filter.register("emboss", function (adjust) {
			return this.processKernel("Emboss", [-2, -1, 0, -1, 1, 1, 0, 1, 2]);
		});
		Caman.Filter.register("vintage", function (adjust) {
	        if (adjust == null) {
	            adjust = true
	        }
	        this.greyscale();
	        this.contrast(5);
	        this.noise(3);
	        this.sepia(100);
	        this.channels({
	            red: 8,
	            blue: 2,
	            green: 4
	        });
	        this.gamma(0.87);
	        if (adjust) {
	            return this.vignette("40%", 30);
	        }
		});
		Caman.Filter.register("lomo", function (adjust) {
	        if (adjust == null) {
	            adjust = true
	        }
	        this.brightness(15);
	        this.exposure(15);
	        this.curves("rgb", [0, 0], [200, 0], [155, 255], [255, 255]);
	        this.saturation(-20);
	        this.gamma(1.8);
	        if (adjust) {
	            this.vignette("50%", 60);
	        }
	        return this.brightness(5);
		});
	}
	/**
	 * Apply preset handler.
	 * @param  {Event} e
	 * @return {void}
	 */
	applyPresetFilter(e) {
		e.preventDefault();
		const filter = e.target.getAttribute('data-filter');
		let canvas = document.getElementById('canvas');
		this.resetCanvas(canvas);
		Caman('#canvas', function() {
			this.replaceCanvas(canvas);
			this[filter]().render();
		});
	}
	/**
	 * Save handler for canvas.
	 * @param  {Event} e
	 * @return {mixed}
	 */
	onSaveCanvas(e) {
		e.preventDefault();
		const canvas = document.getElementById('canvas');
		const dataURL = canvas.toDataURL('image/png');
		let downloadWindow = window.open('about:blank','image from canvas');
		downloadWindow.document.write("<img src='"+  dataURL +"' alt='from canvas'/>");
	}
	/**
	 * Triggers when filter gets updated.
	 * @param  {Event} e
	 * @return {mixed}
	 */
	onChangeFilter(e) {
		e.preventDefault();
		const name = e.target.getAttribute('name');
		const value = e.target.value;
		this.props.dispatch(
			updateFilters({
				[name] : value
			})
		);
		return this.updateCanvasFilters(name, value);
	}
	/**
	 * updateCanvasFilters
	 * @param  {string} name
	 * @param  {number} value
	 */
	updateCanvasFilters(name, value) {
		let filters = this.props.image.filters;
		filters[name] = value;
		let canvas = document.getElementById('canvas');
		this.resetCanvas(canvas);
		Caman('#canvas', function () {
			this.replaceCanvas(canvas);
			this.hue(filters.hue)
				.contrast(filters.contrast)
				.saturation(filters.saturation)
				.brightness(filters.brightness)
				.vibrance(filters.vibrance)
				.sepia(filters.sepia)
				.render();
		});
	}
	/**
	 * Event handler for resetting canvas
	 * @param  {Event}
	 * @return {void}
	 */
	onResetCanvas(e) {
		e.preventDefault();
		this.resetFilters();
		return this.resetCanvas(
			document.getElementById('canvas')
		);
	}
	/**
	 * Resets the canvas to previous image saved
	 * @param  {Canvas}
	 * @return {void}
	 */
	resetCanvas(canvas) {
		let ctx = canvas.getContext('2d');
		let img = this.props.image.imageObject;
		canvas.width = img.width;
		canvas.height = img.height;
		ctx.drawImage(img, 0, 0, img.width, img.height);
	}
	/**
	 * Resets all filter settings
	 * @return {void}
	 */
	resetFilters() {
		this.props.dispatch(updateFilters({
			hue      : 0,
			contrast : 0,
			vibrance : 0,
			sepia    : 0,
			saturation : 0,
			brightness : 0
		}));
	}
	/**
	 * onClearImage - Clears the image canvas.
	 * @param  {object} e [description]
	 * @return {mixed}
	 */
	onClearImage(e) {
		e.preventDefault();
		let canvas = document.getElementById('canvas');
		this.resetCanvas(canvas);
		this.resetFilters();
		this.props.dispatch(loadImage(false));
		Caman(canvas, function() {
			this.replaceCanvas(canvas);
			this.render();
		});
	}
	render() {
		return (
			<div ref="settings" id="settings">
				<h3>Filters</h3>
				<div className="row">
					<div className="col-md-12 form-group">
						<label>Presets</label>
						<button className="btn btn-small btn-block btn-default" 
							data-filter="vintage"
							onClick={this.applyPresetFilter}>Vintage</button>
						<button className="btn btn-small btn-block btn-default" 
							data-filter="emboss"
							onClick={this.applyPresetFilter}>Emboss</button>
						<button className="btn btn-small btn-block btn-default" 
							data-filter="lomo"
							onClick={this.applyPresetFilter}>Lomo</button>
					</div>
					<div className="col-md-12 form-group">
						<label>Hue</label>
				    	<input id="hue"
		    				name="hue"
		    				onChange={this.onChangeFilter}
		    				type="range"
		    				min="0"
		    				step="1"
		    				max="100"
		    				value={this.props.image.filters.hue} 
		    			/>
		    			<p className="help-block">Value: ({this.props.image.filters.hue})</p>
					</div>
					<div className="col-md-12 form-group">
						<label>Contrast</label>
						<input id="contrast"
							name="contrast"
							onChange={this.onChangeFilter}
							type="range"
							step="1"
							min="-100"
							max="100"
							value={this.props.image.filters.contrast}
						/>
						<p className="help-block">Value: ({this.props.image.filters.contrast})</p>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12 form-group">
						<label>Saturation</label>
				    	<input id="saturation"
				    		name="saturation"
				    		onChange={this.onChangeFilter}
				    		type="range"
				    		step="1"
				    		min="-100"
				    		max="100"
				    		value={this.props.image.filters.saturation}
				    	/>
				    	<p className="help-block">Value: ({this.props.image.filters.saturation})</p>
					</div>
					<div className="col-md-12 form-group">
						<label>Brightness</label>
						<input id="brightness"
							name="brightness"
							onChange={this.onChangeFilter}
							type="range"
							step="1"
							min="-100" max="100"
							value={this.props.image.filters.brightness}
						/>
						<p className="help-block">Value: ({this.props.image.filters.brightness})</p>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12 form-group">
						<label>Vibrance</label>
				    	<input id="vibrance"
				    		name="vibrance"
				    		onChange={this.onChangeFilter}
				    		type="range"
				    		step="1"
				    		min="0"
				    		max="300"
				    		value={this.props.image.filters.vibrance}
				    	/>
				    	<p className="help-block">Value: ({this.props.image.filters.vibrance})</p>
					</div>
					<div className="col-md-12 form-group">
						<label>Sepia</label>
						<input id="sepia"
							name="sepia"
							onChange={this.onChangeFilter}
							type="range"
							step="1"
							min="-20"
							max="20"
							value={this.props.image.filters.sepia}
						/>
						<p className="help-block">Value: ({this.props.image.filters.sepia})</p>
					</div>
				</div>
				<hr />
				<button className="btn btn-success btn-large btn-block" onClick={this.onSaveCanvas}>Save</button>
				<button className="btn btn-warning btn-large btn-block" onClick={this.onResetCanvas}>Reset</button>
				<button className="btn btn-danger btn-large btn-block" onClick={this.onClearImage}>Clear</button>
			</div>
		);
	}
}

export default connect(function(state) {
	return {
		image : state.image
	}
})(Settings);