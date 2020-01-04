import axios from 'axios';
import {
	FETCH_TOEIC,
	FETCH_TOEIC_SUCCESS,
	FETCH_TOEIC_ERROR,
	FETCH_TOEIC_DETAIL,
	FETCH_TOEIC_DETAIL_SUCCESS,
	FETCH_TOEIC_DETAIL_ERROR
} from '../Cons/toeic';

export function fetchToeic() {
	return {
		type: FETCH_TOEIC,
	}
}

export function fetchToeicSuccess(data) {
	return {
		type: FETCH_TOEIC_SUCCESS,
		payload: {
			data
		}
	}
}

export function fetchToeicError(error) {
	return {
		type: FETCH_TOEIC_ERROR,
		payload: {
			error
		}
	}
}
export function fetchToeicDetail() {
	return {
		type: FETCH_TOEIC_DETAIL,
	}
}

export function fetchToeicDetailSuccess(data) {
	return {
		type: FETCH_TOEIC_DETAIL_SUCCESS,
		payload: {
			data
		}
	}
}

export function fetchToeicDetailError(error) {
	return {
		type: FETCH_TOEIC_DETAIL_ERROR,
		payload: {
			error
		}
	}
}

export const fetchToeicRequet = () => (dispatch) => {
	dispatch(fetchToeic());
	axios.get('/toeics/getAll')
		.then(res => {
			dispatch(fetchToeicSuccess(res.data.Data));
		})
		.catch(error => {
			console.log(error);
			dispatch(fetchToeicError(error));
		})
}
export const fetchToeicDetailRequet = (id, idPart) => (dispatch) => {
	dispatch(fetchToeicDetail());
	axios.get(`/toeics/${id}/parts/${idPart}`)
		.then(res => {
			console.log(res);
			dispatch(fetchToeicDetailSuccess(res.data.Data));
		})
		.catch(error => {
			console.log(error);
			dispatch(fetchToeicDetailError(error));
		})
}
