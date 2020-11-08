import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import Image from './atoms/Image';
import ActionsMenu from './atoms/ActionsMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '32%',
    height: 300,
    padding: theme.spacing(1.5),
    backgroundColor: theme.palette.grey['A400'],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  container: {
    width: '100%',
    height: '50%',
  },
  desriptionContainer: {
    width: '100%',
    height: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
  },
  bold: {
    fontWeight: theme.typography.fontWeightBold,
  },
  light: {
    fontWeight: theme.typography.fontWeightLight,
    marginTop: theme.spacing(1),
  },
  negotiate: {
    marginLeft: theme.spacing(1),
  },
  priceContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const SingleAnnoucement = ({ _id, title, imageUrl, localization, userActions, price }) => {
  const classes = useStyles();
  const formatedTitle = title.length > 25 ? `${title.slice(0, 25)}...` : title;

  return (
    <Paper component="li" className={classes.root}>
      <div className={classes.container}>
        <Image title={title} src={`http://localhost:8080/${imageUrl}`} />
      </div>
      <div className={cx(classes.container && classes.desriptionContainer)}>
        <Link className={classes.link} to={`/annoucementDetails/${_id}`}>
          <Typography className={classes.light} component="h3" variant="h6">
            {formatedTitle}
          </Typography>
        </Link>
        <div>
          <Typography variant="subtitle2">{localization}</Typography>
          <div className={classes.priceContainer}>
            <Typography className={classes.bold} component="p" variant="h6">
              {price} zł
              <Typography className={classes.negotiate} component="span" variant="caption">
                do negocjacji
              </Typography>
            </Typography>
            {userActions && <ActionsMenu />}
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default SingleAnnoucement;
