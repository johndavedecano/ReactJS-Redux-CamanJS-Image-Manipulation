import {
	IMAGE_LOADED,
	IMAGE_FILTERS,
	IMAGE_OBJECT_SAVED
} from './constants';

export function loadImage(loaded) {
	return {
		type : IMAGE_LOADED
		, loaded
	}
}

export function updateFilters(filters) {
	return {
		type : IMAGE_FILTERS
		, filters
	}
}

export function saveImageObject(imageObject) {
	return {
		type : IMAGE_OBJECT_SAVED
		, imageObject
	}
}