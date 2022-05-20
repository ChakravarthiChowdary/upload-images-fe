import { Alert, Container } from "@mui/material";
import React from "react";

const NoImages = () => {
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
      <Alert severity="info">No images found. Please add some.</Alert>
    </Container>
  );
};

export default NoImages;
