import { Alert, CircularProgress, Container } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "85vh",
      }}
    >
      <CircularProgress />
    </Container>
  );
};

export default Loading;
