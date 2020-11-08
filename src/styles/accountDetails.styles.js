import { makeStyles } from '@material-ui/core';

const accountDetailsStyles = makeStyles((theme) => ({
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
  card: {
    width: 250,
    height: 300,
    margin: theme.spacing(1),
    textDecoration: 'none',
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
  mediaImage: {
    height: 130,
    display: 'flex',
    flexDirection: 'column',
  },
  text: {
    height: 130,
  },
}));

export default accountDetailsStyles;
