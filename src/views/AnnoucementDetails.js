import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import HeaderTemplate from '../components/templates/HeaderTemplate';
import Card from '../components/Annoucement';
import { useParams } from 'react-router-dom';

const AnnoucementDetails = () => {
  const [annoucement, setAnnoucement] = useState(null);
  const { annId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/getAnnoucement/${annId}`)
      .then((result) => result.json())
      .then((ann) => {
        setAnnoucement(ann.annoucement);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <HeaderTemplate>
      <div>
        {annoucement ? (
          <Card
            title={annoucement.title}
            price={annoucement.price}
            place={annoucement.localization}
            photo={annoucement.imageUrl}
            _id={annoucement._id}
          />
        ) : (
          <p>Ładowanie...</p>
        )}
      </div>
    </HeaderTemplate>
  );
};

export default AnnoucementDetails;
