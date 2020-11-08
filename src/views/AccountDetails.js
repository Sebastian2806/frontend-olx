import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams, useHistory, Link } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Container,
  Paper,
  Typography,
  Avatar,
  CircularProgress,
} from '@material-ui/core';
import HeaderTemplate from '../components/templates/HeaderTemplate';
import PersonIcon from '@material-ui/icons/Person';
import authService from '../services/authService';
import SingleAnnoucement from '../components/SingleAnnoucement';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: theme.spacing(2),
  },
  avatarSize: {
    margin: theme.spacing(3),
    width: theme.spacing(11),
    height: theme.spacing(11),
  },
  paper: {
    width: 900,
    padding: theme.spacing(2),
    marginTop: theme.spacing(5),
  },
  card: {
    width: 250,
    height: 300,
    margin: theme.spacing(1),
    textDecoration: 'none',
  },
  box: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    '&::after': {
      content: '',
      flex: 'auto',
    },
  },
  mediaImage: {
    height: 130,
    display: 'flex',
    flexDirection: 'column',
  },
  text: {
    height: 130,
  },
}));

const AccountDetails = () => {
  const classes = useStyles();
  const [userAnnoucements, setUserAnnoucements] = useState(null);
  const [token, setToken] = useState(null);
  const { userId } = useParams();

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
        console.log(annoucements);
        setUserAnnoucements({ ...userAnnoucements, annoucements: annoucements });
        // history.push(`/getUserAnnoucements/${userId}`);
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
            <Paper className={classes.paper}>
              <Typography variant="h6">Ogłoszenia użytkownika:</Typography>
              <Container className={classes.box} component="ul">
                {userAnnoucements.annoucements.map(({ _id, ...props }) => (
                  <SingleAnnoucement key={_id} _id={_id} {...props} userActions></SingleAnnoucement>
                  /* <Card key={_id} className={classes.card}>
                    <CardActionArea to={`/annoucementDetails/${_id}`} component={Link}>
                      <CardMedia
                        className={classes.mediaImage}
                        component="img"
                        image={`http://localhost:8080/${imageUrl}`}
                        title={title}
                        alt={title}
                      />
                      <CardContent className={classes.text}>
                        <Typography
                          className={classes.title}
                          gutterBottom
                          variant="h5"
                          component="h2"
                        >
                          {title}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {place}
                        </Typography>
                        <Typography className={classes.price} color="textSecondary" component="p">
                          {price}zł
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button color="secondary" size="small" onClick={() => deleteAnnoucement(_id)}>
                        Usuń
                      </Button>
                    </CardActions>
                  </Card> */
                ))}
              </Container>
            </Paper>
          </>
        ) : (
          <CircularProgress color="secondary" />
        )}
      </main>
    </HeaderTemplate>
  );
};

export default AccountDetails;
