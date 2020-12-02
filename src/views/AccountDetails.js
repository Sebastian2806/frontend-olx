import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Avatar, CircularProgress } from '@material-ui/core';
import HeaderTemplate from '../components/templates/HeaderTemplate';
import PersonIcon from '@material-ui/icons/Person';
import authService from '../services/authService';
import SingleAnnoucement from '../components/SingleAnnoucement';
import accountDetailsStyles from '../styles/accountDetails.styles';

const useStyles = accountDetailsStyles;

const AccountDetails = () => {
  const classes = useStyles();
  const [userAnnoucements, setUserAnnoucements] = useState(null);
  const [token, setToken] = useState(null);
  const { userId } = useParams();

  const currentUser = authService.getCurrentUserId();

  const deleteAnnoucement = (ann_id) => {
    fetch(`http://localhost:8080/removeAnnoucement/${ann_id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((result) => result.json())
      .then((ann) => {
        const annoucements = userAnnoucements.annoucements.filter(
          (el) => el._id !== ann.annoucement._id,
        );
        setUserAnnoucements({ ...userAnnoucements, annoucements: annoucements });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const token = authService.getCurrentUser();
    setToken(token);
    fetch(`http://localhost:8080/getUserAnnoucements/${userId}`)
      .then((result) => result.json())
      .then((ann) => {
        setUserAnnoucements(ann);
        console.log(ann.annoucements);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <HeaderTemplate>
      <main className={classes.root}>
        {userAnnoucements ? (
          <>
            <Avatar className={classes.avatarSize}>
              <PersonIcon className={classes.avatarSize} />
            </Avatar>
            <Typography component="h2" variant="h4">
              {userAnnoucements.user.email}
            </Typography>
            <ul className={classes.annoucementsContainer} component="ul">
              {userAnnoucements.annoucements.map(({ _id, ...props }) => (
                <SingleAnnoucement
                  key={_id}
                  _id={_id}
                  {...props}
                  userActions={userId === currentUser}
                  deleteAnnoucement={deleteAnnoucement}
                ></SingleAnnoucement>
              ))}
            </ul>
          </>
        ) : (
          <CircularProgress color="secondary" />
        )}
      </main>
    </HeaderTemplate>
  );
};

export default AccountDetails;
