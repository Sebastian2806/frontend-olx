import React, { useState, useEffect, useRef } from 'react';
import cx from 'classnames';
import { makeStyles, CircularProgress } from '@material-ui/core';
import PanoramaIcon from '@material-ui/icons/Panorama';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  iconContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: theme.palette.grey['800'],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer_hide: {
    display: 'none',
  },
}));

const Image = (props) => {
  const classes = useStyles();
  const [settings, setSettings] = useState({
    isLoaded: false,
    isError: false,
  });

  const image = useRef(null);

  useEffect(() => {
    const { current } = image;
    if (current && current.complete) {
      if (current.naturalWidth === 0) {
        setSettings({ isError: true, isLoaded: true });
      } else {
        setSettings({ ...settings, isLoaded: true });
      }
    }
  }, []);

  const handleImageLoad = (e) => {
    setSettings({ ...settings, isLoaded: true });
  };

  const handleImageError = (e) => {
    setSettings({ isError: true, isLoaded: true });
  };

  return (
    <div className={classes.container}>
      <img
        {...props}
        alt=""
        ref={image}
        onLoad={handleImageLoad}
        onError={handleImageError}
        className={classes.image}
      />
      <div
        className={cx(
          classes.iconContainer,
          settings.isLoaded && !settings.isError && classes.iconContainer_hide,
        )}
      >
        {!settings.isLoaded && <CircularProgress color="secondary" />}
        {settings.isError && <PanoramaIcon />}
      </div>
    </div>
  );
};

export default Image;
