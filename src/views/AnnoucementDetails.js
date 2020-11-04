import React, { useState, useEffect } from 'react';
import HeaderTemplate from '../components/templates/HeaderTemplate';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Button,
  CircularProgress,
  makeStyles,
  Paper,
  Typography,
  Avatar,
  Hidden,
} from '@material-ui/core';
import PlaceIcon from '@material-ui/icons/Place';
import PersonIcon from '@material-ui/icons/Person';
import cx from 'classnames';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '30px 30px 0 30px',
    display: 'flex',
    justifyContent: 'center',
    margin: '0 auto',
    maxWidth: 900,
  },
  box: {
    display: 'flex',
    width: '100%',
  },
  leftContainer: {
    padding: theme.spacing(1),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '65%',
    },
  },
  rightContainer: {
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(1),
      width: '35%',
    },
  },
  paper: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
  paperImg: {
    height: 270,
  },
  paperSmall: {
    [theme.breakpoints.down('md')]: {
      width: '50%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  paperSmallRight: {
    [theme.breakpoints.down('md')]: {
      marginLeft: theme.spacing(2),
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
    },
  },
  leftMargin: {
    marginLeft: theme.spacing(1),
  },
}));

const AnnoucementDetails = () => {
  const classes = useStyles();
  const [annoucement, setAnnoucement] = useState(null);
  const { annId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/getAnnoucement/${annId}`)
      .then((result) => result.json())
      .then((ann) => {
        console.log(ann);
        setAnnoucement(ann.annoucement);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <HeaderTemplate>
      <main className={classes.root}>
        {annoucement ? (
          <section className={classes.box}>
            <div className={classes.leftContainer}>
              <Paper className={cx(classes.paperImg, classes.paper)}>
                <img alt={annoucement.title} src={annoucement.imageUrl} />
              </Paper>
              <Hidden mdUp>
                <div className={classes.rightContainer}>
                  <Paper className={cx(classes.paper, classes.paperSmall)}>
                    <Typography component="h2" variant="h5">
                      Użytkownik
                    </Typography>
                    <Button to="/" component={Link}>
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                      <Typography variant="body1" className={classes.leftMargin}>
                        Marian
                      </Typography>
                    </Button>
                    <Typography variant="body2" className={classes.leftMargin}>
                      <Typography variant="button" component="span">
                        Zadzwoń:
                      </Typography>
                      {annoucement.phone_number}
                    </Typography>
                  </Paper>
                  <Paper className={cx(classes.paper, classes.paperSmall, classes.paperSmallRight)}>
                    <Typography component="h2" variant="h5">
                      Lokalizacja
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <Avatar>
                        <PlaceIcon />
                      </Avatar>
                      <Typography variant="body1" className={classes.leftMargin}>
                        {annoucement.localization}
                      </Typography>
                    </Box>
                  </Paper>
                </div>
              </Hidden>
              <Paper className={classes.paper}>
                <Typography component="h2" variant="h5">
                  Opis
                </Typography>
                <Typography variant="body1">{annoucement.description}</Typography>
              </Paper>
            </div>
            <Hidden smDown>
              <div className={classes.rightContainer}>
                <Paper className={classes.paper}>
                  <Typography component="h2" variant="h5">
                    Użytkownik
                  </Typography>
                  <Button to="/" component={Link}>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                    <Typography variant="body1" className={classes.leftMargin}>
                      Marian
                    </Typography>
                  </Button>
                  <Typography variant="body2" className={classes.leftMargin}>
                    <Typography variant="button" component="span">
                      Zadzwoń:
                    </Typography>
                    {annoucement.phone_number}
                  </Typography>
                </Paper>
                <Paper className={classes.paper}>
                  <Typography component="h2" variant="h5">
                    Lokalizacja
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Avatar>
                      <PlaceIcon />
                    </Avatar>
                    <Typography variant="body1" className={classes.leftMargin}>
                      {annoucement.localization}
                    </Typography>
                  </Box>
                </Paper>
              </div>
            </Hidden>
          </section>
        ) : (
          <CircularProgress color="secondary" />
        )}
      </main>
    </HeaderTemplate>
  );
};

export default AnnoucementDetails;
