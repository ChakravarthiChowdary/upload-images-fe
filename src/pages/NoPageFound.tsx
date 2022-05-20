import { Alert, Container } from "@mui/material";
import React from "react";

const NoPageFound = () => {
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
      <Alert severity="error">Oops ! Page not found (404).</Alert>
    </Container>
  );
};

export default NoPageFound;
