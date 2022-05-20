import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, Grid } from "@mui/material";

import { Images } from "../types/types";

interface IImageCardProps {
  image: Images;
}

const ImageCard: React.FC<IImageCardProps> = ({ image }) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ maxWidth: 400 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="400"
            image={image.photoUrl}
            alt={image.title}
          />
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ImageCard;
