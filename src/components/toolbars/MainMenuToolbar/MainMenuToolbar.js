import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase
} from '@material-ui/core'

import { createStyles, fade, makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'

import MainMenu from '../../navigation/MainMenu'

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      backgroundColor: '#0A314D',
      height: 65,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3)
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }),
)

const MainMenuToolbar = props => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <MainMenu location={location} />
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
    </div>
  )
}

export default MainMenuToolbar
