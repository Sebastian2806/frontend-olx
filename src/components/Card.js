import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import { Card as C, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: 280,
    textDecoration: 'none',
    margin: 10,
  },
  media: {
    height: 140,
  },
});

const Card = ({ _id, title, place, price, photo }) => {
  const classes = useStyles();

  return (
    <C className={classes.root} to={`/getAnnoucement/${_id}`} component={RouterLink}>
      <CardActionArea>
        <img src={`http://localhost:8080/${photo}`} alt={title} style={{ height: 150 }} />
        {/* <CardMedia className={classes.media} image={photo} title="Contemplative Reptile" /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography gutterBottom variant="body2" color="textSecondary" component="p">
            {place}
          </Typography>
          <Typography variant="button" color="textSecondary" component="p">
            {price}zł
          </Typography>
        </CardContent>
      </CardActionArea>
    </C>
  );
};

export default Card;
