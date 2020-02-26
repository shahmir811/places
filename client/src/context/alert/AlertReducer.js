import { SET_ALERT, REMOVE_ALERT } from '../types';

export default (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case SET_ALERT:
			return { ...state, type: payload.type, message: payload.message };

		case REMOVE_ALERT:
			return { ...state, message: null };

		default:
			return state;
	}
};
