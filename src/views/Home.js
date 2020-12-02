import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import HeaderTemplate from '../components/templates/HeaderTemplate';
import SingleAnnoucement from '../components/SingleAnnoucement';
import { CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '30px 30px 0 30px',
    display: 'flex',
    justifyContent: 'center',
    margin: '0 auto',
    maxWidth: 1280,
  },
  annoucementsContainer: {
    margin: 0,
    width: '80%',
    padding: theme.spacing(2),
    marginTop: theme.spacing(5),
    maxWidth: 1100,
    minWidth: 300,
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-start',
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const [annoucements, setAnnoucements] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/getAnnoucements')
      .then((result) => result.json())
      .then((ann) => {
        setAnnoucements(ann.annoucements);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <HeaderTemplate>
      <main className={classes.root}>
        {annoucements ? (
          annoucements.length > 0 ? (
            <ul className={classes.annoucementsContainer} component="ul">
              {annoucements.map(({ _id, ...props }) => (
                <SingleAnnoucement key={_id} _id={_id} {...props}></SingleAnnoucement>
              ))}
            </ul>
          ) : (
            <p>Brak ogłoszeń do wyświetlenia</p>
          )
        ) : (
          <CircularProgress color="secondary" />
        )}
      </main>
    </HeaderTemplate>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(Home);
