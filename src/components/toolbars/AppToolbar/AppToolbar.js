import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import {
  AppBar,
  Box,
  Hidden,
  Link as MuiLink,
  Toolbar,
  IconButton,
  Typography,
  InputBase
} from '@material-ui/core'

import { createStyles, fade, makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import { MainMenuToolbar } from '../MainMenuToolbar'
import MainMenu from '../../navigation/MainMenu'
import MobileMenu from '../../navigation/MobileMenu'

import { InfoBanner } from '../../layouts/InfoBanner'
import { BrowserBanner } from '../../layouts/BrowserBanner'
// import ShutdownBanner from '../../content-partials/ShutdownBanner'

import AppMenu from '../../navigation/AppMenu'
import OnrrLogoImg from '../../images/OnrrLogoImg'
import MenuDrawer from '../../navigation/MenuDrawer'

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      position: 'sticky',
      marginBottom: 0,
      backgroundColor: 'rgb(6, 33, 53)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      top: 0,
    },
    toolbar: {
      height: 70
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

const AppToolbar = ({ isShutdown = false }) => {
  const classes = useStyles()

  return (
    <>
      <AppBar position="sticky" color="primary" className={classes.root}>
        <InfoBanner />
        {isShutdown === 'true' &&
          <ShutdownBanner />
        }
        <BrowserBanner />
        <Toolbar className={classes.toolbar}>
          <RouterLink to="/" style={{ color: 'white', textDecoration: 'none' }}>
            <OnrrLogoImg />
          </RouterLink>
          
          <Typography className={classes.title} variant="h1" noWrap style={{ fontSize: '1.5rem', margin: 0 }}>
            <RouterLink to="/" style={{ color: 'white', textDecoration: 'none' }}>
            <Box variant="span" fontSize="1rem">U.S. Department of the Interior</Box>
              Office of Natural Resources Revenue (ONRR)
            </RouterLink>
          </Typography>
          <Hidden smDown>
            <AppMenu />
          </Hidden>

          <Hidden mdUp>
            <MenuDrawer>
              <MobileMenu />
            </MenuDrawer>
          </Hidden>
        </Toolbar>
        <Hidden smDown>
          <MainMenuToolbar />
        </Hidden>
      </AppBar>
    </>
  )
}

export default AppToolbar
