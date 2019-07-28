import * as actionType from '../actions/ActionType';

const initialState = {
  imageName: "",
  loading: false,
  error: null
};

export const imageReducer = (state = initialState, action) => {

  switch(action.type) {
    case actionType.UPLOAD_IMAGE_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
	  return {
        ...state,
        loading: true,
        error: null
      };

    case actionType.UPLOAD_IMAGE_SUCCESS:
		console.log("action",action.payload.image)
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        imageName: action.payload.image
      };

    case actionType.UPLOAD_IMAGE_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have items to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the items
      // around! Do whatever seems right.
	   console.log("imageName", action.payload.error)
      return {
        ...state,
        loading: false,
        imageName: action.payload.error
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

