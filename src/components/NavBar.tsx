import { Dispatch, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ScrollTop from "./ScrollTop";
import { useDispatch } from "react-redux";
import { CLEAN_UPLOAD_STATE, uploadImage } from "../store/actions/actions";
import { useAppSelector } from "../store/store";
import { Alert } from "@mui/material";

const Input = styled("input")({
  display: "none",
});

const NavBar = (props: any) => {
  const dispatch: Dispatch<any> = useDispatch();
  const { uploadLoading, uploadError, files, uploadSuccess } = useAppSelector(
    (state) => state.app
  );
  console.log(uploadSuccess);

  const uploadChangedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    dispatch(uploadImage(files));
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout | null;
    if (uploadError || uploadSuccess) {
      timeout = setTimeout(() => {
        dispatch({ type: CLEAN_UPLOAD_STATE });
      }, 5000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [uploadError, uploadSuccess]);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar id="back-to-top-anchor">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Upload Images App
            </Typography>
            {(uploadError || uploadSuccess) && (
              <Alert
                severity={uploadSuccess ? "success" : "error"}
                sx={{ mr: 3, ml: 3 }}
              >
                {uploadSuccess
                  ? "File uploaded successfully"
                  : uploadError.message}
              </Alert>
            )}
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                type="file"
                name="image"
                onChange={uploadChangedHandler}
                disabled={uploadLoading}
              />
              {uploadLoading ? (
                <CircularProgress color="inherit" size={13} />
              ) : (
                <Button
                  color="inherit"
                  component="span"
                  startIcon={<UploadFileIcon />}
                  disabled={uploadLoading}
                >
                  Upload
                </Button>
              )}
            </label>
          </Toolbar>
        </AppBar>
      </Box>
      <ScrollTop {...props}>
        <Fab color="secondary" size="medium" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
};

export default NavBar;
