import { Grid } from "@mui/material";
import React, { Dispatch, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router";
import "./App.css";
import ImageCard from "./components/ImageCard";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import NoImages from "./components/NoImages";
import { images } from "./mock/data";
import NoPageFound from "./pages/NoPageFound";
import { getAllImages } from "./store/actions/actions";
import { useAppSelector } from "./store/store";
import { Images } from "./types/types";

function App() {
  const dispatch: Dispatch<any> = useDispatch();
  const { files, loading } = useAppSelector((state) => state.app);

  useEffect(() => {
    dispatch(getAllImages());
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <Grid container spacing={2} sx={{ p: 3 }}>
              {files.length <= 0 && !loading ? (
                <NoImages />
              ) : (
                files.map((el: Images) => <ImageCard key={el._id} image={el} />)
              )}
            </Grid>
          }
        />
        <Route path="*" element={<NoPageFound />} />
      </Routes>
    </>
  );
}

export default App;
