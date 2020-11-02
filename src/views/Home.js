import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import HeaderTemplate from '../components/templates/HeaderTemplate';
import Annoucement from '../components/Annoucement';
import { CircularProgress, Grid, makeStyles } from '@material-ui/core';
import { Autorenew } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    padding: '30px 30px 0 30px',
    display: 'flex',
    justifyContent: 'center',
    margin: '0 auto',
    maxWidth: 1280,
  },
});

const Home = () => {
  const classes = useStyles();
  const [annoucements, setAnnoucements] = useState(null);
  let cards;

  useEffect(() => {
    fetch('http://localhost:8080/getAnnoucements')
      .then((result) => result.json())
      .then((ann) => {
        console.log(ann);
        setAnnoucements(ann.annoucements);
      })
      .catch((err) => console.log(err));
  }, []);

  if (annoucements) {
    cards = annoucements.map((el) => (
      <Annoucement
        key={el._id}
        title={el.title}
        price={el.price}
        place={el.localization}
        photo={el.imageUrl}
        _id={el._id}
      />
    ));
  }

  return (
    <HeaderTemplate>
      <main className={classes.root}>
        {annoucements ? (
          annoucements.length > 0 ? (
            <Grid container justify="center" spacing={2}>
              {cards}
            </Grid>
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

export default Home;
