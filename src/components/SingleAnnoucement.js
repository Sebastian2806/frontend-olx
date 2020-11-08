import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { Paper, Typography } from '@material-ui/core';
import Image from './atoms/Image';
import ActionsMenu from './atoms/ActionsMenu';
import annoucementStyles from '../styles/annoucement.styles';

const useStyles = annoucementStyles;

const SingleAnnoucement = ({
  _id,
  title,
  imageUrl,
  localization,
  price,
  userActions,
  deleteAnnoucement,
}) => {
  const classes = useStyles();
  const formatedTitle = title.length > 25 ? `${title.slice(0, 25)}...` : title;

  return (
    <Paper component="li" className={classes.root} elevation={5}>
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
            {userActions && <ActionsMenu deleteAnnoucement={() => deleteAnnoucement(_id)} />}
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default SingleAnnoucement;
