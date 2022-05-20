import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { resourceLimits } from "worker_threads";
import { RootState } from "../store";

export const SET_UPLOADED_FILES = "SET_UPLOADED_FILES";

export const UPLOAD_IMAGE_START = "UPLOAD_IMAGE_START";
export const UPLOAD_IMAGE_SUCCESS = "UPLOAD_IMAGE_SUCCESS";
export const UPLOAD_IMAGE_FAIL = "UPLOAD_IMAGE_FAIL";

export const GET_IMAGES_START = "GET_IMAGES_START";
export const GET_IMAGES_FAIL = "GET_IMAGES_FAIL";
export const GET_IMAGES_SUCCESS = "GET_IMAGES_SUCCESS";

export const CLEAN_UPLOAD_STATE = "CLEAN_UPLOAD_STATE";

export const uploadImage = (
  files: FileList | null
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      dispatch({ type: UPLOAD_IMAGE_START });

      if (files && files.length > 0) {
        const formData = new FormData();
        formData.append("image", files[0]);

        const res = await fetch("http://localhost:5000/app/v1/image/upload", {
          method: "POST",
          body: formData,
        });

        const result = await res.json();

        if (result.errors || result.error) {
          dispatch({
            type: UPLOAD_IMAGE_FAIL,
            payload: result.errors
              ? {
                  message: result.errors[0].msg,
                  statusCode: 500,
                  requestStatus: "Fail",
                }
              : result.error,
          });
          return;
        }
        dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: result });
      } else {
        dispatch({
          type: UPLOAD_IMAGE_FAIL,
          payload: {
            message: "No files selected.",
            statusCode: 400,
            requestStatus: "Fail",
          },
        });
      }
    } catch (error) {
      dispatch({ type: UPLOAD_IMAGE_FAIL, payload: error });
    }
  };
};

export const getAllImages = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_IMAGES_START });

      const response = await fetch(
        "http://localhost:5000/app/v1/image/getallimages",
        {
          method: "GET",
        }
      );

      const result = await response.json();

      if (result.errors || result.error) {
        dispatch({
          type: GET_IMAGES_FAIL,
          payload: result.errors
            ? {
                message: result.errors[0].msg,
                statusCode: 500,
                requestStatus: "Fail",
              }
            : result.error,
        });
        return;
      }

      dispatch({ type: GET_IMAGES_SUCCESS, payload: result.images });
    } catch (error) {
      dispatch({ type: GET_IMAGES_FAIL, payload: error });
    }
  };
};
