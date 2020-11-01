import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import HeaderTemplate from '../components/templates/HeaderTemplate';
import Card from '../components/Card';

const StyledGrid = styled.main`
  width: 1000px;
  min-height: 200px;
  display: grid;
  grid-template-columns: 320px;
`;

const Home = () => {
  const [annoucements, setAnnoucements] = useState([]);
  let cards;

  useEffect(() => {
    fetch('http://localhost:8080/getAnnoucements')
      .then((result) => result.json())
      .then((ann) => {
        setAnnoucements(ann.annoucements);
      })
      .catch((err) => console.log(err));
  }, []);

  if (annoucements.length > 0) {
    cards = annoucements.map((el) => (
      <Card
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
      <div>
        {annoucements.length > 0 ? (
          <StyledGrid>{cards}</StyledGrid>
        ) : (
          <p>Brak ogłoszeń do wyświetlenia</p>
        )}
      </div>
    </HeaderTemplate>
  );
};

export default Home;
