import axios from 'axios';

export const FETCH_PROVIDENCE_DATA = 'FETCH_PROVIDENCE_DATA';
export const FETCH_PROVIDENCE_DATA_RECEIVED = 'FETCH_PROVIDENCE_DATA_RECEIVED';
export const FETCH_PROVIDENCE_DATA_ERROR = 'FETCH_PROVIDENCE_DATA_ERROR';
export const DATA_LOADING = 'DATA_LOADING';

export const dataLoading = (isLoading) => ({ type: DATA_LOADING, isLoading });
export const fetchDataSuccess = (data) => ({
  type: FETCH_PROVIDENCE_DATA_RECEIVED,
  data
})

export const getRandomColor = () => {
  function c() {
    var hex = Math.floor(Math.random()*256).toString(16);
    return ("0"+String(hex)).substr(-2); // pad with zero
  }
  return "#"+c()+c()+c();
}

export const fetchDataError = (error) => ({ type: FETCH_PROVIDENCE_DATA_ERROR, error });

export const fetchProvidenceData = () => {
  let url = `https://data.providenceri.gov/resource/r6n7-qjr6.json?$$app_token=TGY2oohpiSXAhxdqaVKbDEvP6`
  return (dispatch) => {
    dispatch(dataLoading(true));
    axios.get(url)
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }

        dispatch(dataLoading(false));

        return response;
      })
      .then((response) => dispatch(fetchDataSuccess(response.data)))
      .catch(() => dispatch(fetchDataError(true)));
  };
}

const defaultState = {
  loading: false,
  data: []
}

export const providenceReducer = (state=defaultState, action) => {
  switch (action.type) {
    case FETCH_PROVIDENCE_DATA_RECEIVED:
      return {
        ...state,
        data: action.data
      }
    case DATA_LOADING:
      return {
        ...state,
        loading: action.isLoading,
      }
    default:
      return state;
  }
}