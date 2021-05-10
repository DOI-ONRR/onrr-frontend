import React from 'react'

import { 
  Box,
  Link as MuiLink
} from '@material-ui/core'
import {
  withStyles,
  createStyles
} from '@material-ui/core/styles'

import PhoneIcon from '@material-ui/icons/Phone'
import EventIcon from '@material-ui/icons/Event'
import BarChartIcon from '@material-ui/icons/BarChart'

const NavIconLinkContainer = withStyles(theme =>
  createStyles({
    root: {
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginRight: 30,
      '& > a': {
        color: theme.palette.common.white,
        textDecoration: 'none'
      }
    }
  })
)(Box)


const AppMenu = () => {
  return (
    <nav>
      <NavIconLinkContainer>
        <PhoneIcon />
        <MuiLink href="/contact-us">Contact us</MuiLink>
      </NavIconLinkContainer>
      <NavIconLinkContainer>
        <EventIcon />
        <MuiLink href="/events">Events</MuiLink>
      </NavIconLinkContainer>
      <NavIconLinkContainer>
        <BarChartIcon />
        <MuiLink href="http://revenuedata.doi.gov/">Revenue Data</MuiLink>
      </NavIconLinkContainer>
    </nav>
  )
}

export default AppMenu

