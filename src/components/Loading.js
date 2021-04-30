import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      position: 'fixed',
      zIndex: '999',
      overflow: 'show',
      margin: 'auto',
      top: '0',
      left: '0',
      bottom: '0',
      right: '0',
      width: '50px',
      height: '50px',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  }),
);

const Loading = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  )
}

export default Loading