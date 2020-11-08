import { makeStyles } from '@material-ui/core';

const annoucementStyles = makeStyles((theme) => ({
  root: {
    width: '95%',
    height: 300,
    margin: theme.spacing(1),
    padding: theme.spacing(1.5),
    backgroundColor: theme.palette.grey['800'],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    [theme.breakpoints.up('sm')]: {
      width: `calc(50% - (2 * ${theme.spacing(1)}px))`,
    },
    [theme.breakpoints.up('md')]: {
      width: `calc(33.33% - (2 * ${theme.spacing(1)}px))`,
    },
    [theme.breakpoints.up('lg')]: {
      width: `calc(25% - (2 * ${theme.spacing(1)}px))`,
    },
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

export default annoucementStyles;
