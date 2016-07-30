import {
	IMAGE_LOADED,
	IMAGE_FILTERS,
	IMAGE_OBJECT_SAVED
} from './../constants';

const imageState = {
	loaded : false,
	imageObject : null,
	filters : {
		hue      : 0,
		contrast : 0,
		vibrance : 0,
		sepia    : 0,
		saturation : 0,
		brightness : 0
	}
};

function image(state = imageState, action) {
	switch(action.type)  {
		case IMAGE_LOADED:
			return Object.assign({}, state, {
				loaded : action.loaded
			});
		break;
		case IMAGE_OBJECT_SAVED:
			return {
				...state,
				imageObject : action.imageObject
			}
		break;
		case IMAGE_FILTERS:
			return {
				...state,
				filters : Object.assign({}, state.filters, action.filters)
			}
		break;
		default:
			return state;
		break;
	}
}

export default image;