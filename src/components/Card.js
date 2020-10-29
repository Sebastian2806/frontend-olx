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

const Card = ({ title, place, price }) => {
  const classes = useStyles();

  return (
    <C className={classes.root} to="/signup" component={RouterLink}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
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
