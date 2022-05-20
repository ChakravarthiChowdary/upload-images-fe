import { AnyAction } from "redux";
import { ReducerType } from "../../types/types";
import {
  CLEAN_UPLOAD_STATE,
  GET_IMAGES_FAIL,
  GET_IMAGES_START,
  GET_IMAGES_SUCCESS,
  UPLOAD_IMAGE_FAIL,
  UPLOAD_IMAGE_START,
  UPLOAD_IMAGE_SUCCESS,
} from "../actions/actions";

const initialState: ReducerType = {
  files: [],
  loading: false,
  error: null,
  uploadError: null,
  uploadLoading: false,
  uploadSuccess: false,
};

export const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case UPLOAD_IMAGE_START:
      return {
        ...state,
        uploadLoading: true,
        uploadError: null,
      };
    case UPLOAD_IMAGE_SUCCESS:
      const oldFiles = state.files;
      oldFiles.push(action.payload);
      console.log(oldFiles);
      return {
        ...state,
        uploadLoading: false,
        files: oldFiles,
        uploadError: null,
        uploadSuccess: true,
      };
    case UPLOAD_IMAGE_FAIL:
      return {
        ...state,
        uploadLoading: false,
        uploadError: action.payload,
      };
    case GET_IMAGES_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_IMAGES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_IMAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        files: action.payload,
      };
    case CLEAN_UPLOAD_STATE:
      return {
        ...state,
        uploadLoading: false,
        uploadSuccess: false,
        uploadError: null,
      };
    default:
      return state;
  }
};
