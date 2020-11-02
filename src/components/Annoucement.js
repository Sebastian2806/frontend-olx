import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 280,
    textDecoration: 'none',
    margin: 10,
  },
  card: {
    textDecoration: 'none',
  },
  media: {
    height: 150,
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    flexGrow: 1,
  },
  price: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

const Annoucement = ({ _id, title, place, price, photo }) => {
  const classes = useStyles();

  return (
    <Grid item xs={9} sm={6} md={4} lg={3}>
      <Paper component="section">
        <Card className={classes.card} to={`/annoucementDetails/${_id}`} component={RouterLink}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              component="img"
              image={`http://localhost:8080/${photo}`}
              title={title}
              alt={title}
            />
            <CardContent className={classes.media}>
              <Typography className={classes.title} gutterBottom variant="h5" component="h2">
                {title}
              </Typography>
              <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                {place}
              </Typography>
              <Typography className={classes.price} color="textSecondary" component="p">
                {price}zł
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Paper>
    </Grid>
  );
};

export default Annoucement;
