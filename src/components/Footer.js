import React from 'react'

import { Link as RouterLink } from 'react-router-dom'

import { 
  Box,
  Container,
  Grid,
  Typography
} from '@material-ui/core'

import { createStyles, withStyles } from '@material-ui/styles'

import FooterMenu from './navigation/FooterMenu'
import SocialMenu from './navigation/SocialMenu'

import OnrrLogoImg from './images/OnrrLogoImg'

const FooterContainerTop = withStyles(theme =>
  createStyles({
    root: {
      background: theme.palette.grey[700],
      padding: theme.spacing(4)
    }
  })
)(Box)

const FooterContainerBottom = withStyles(theme =>
  createStyles({
    root: {
      background: theme.palette.grey[900],
      padding: theme.spacing(4)
    }
  })
)(Box)

const LogoContainer = withStyles(theme =>
  createStyles({
    root: {
      display: 'flex'
    }
  })
)(Box)


const Footer = () => {
  return (
    <>
      <FooterContainerTop>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FooterMenu />
            </Grid>
          </Grid>
        </Container>
      </FooterContainerTop>
      <FooterContainerBottom>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={9}>
              <LogoContainer>
                <RouterLink to="/" style={{ color: 'white', textDecoration: 'none' }}>
                  <OnrrLogoImg />
                </RouterLink>
            
                <Typography variant="h1" noWrap style={{ fontSize: '1.5rem', margin: 0 }}>
                  <RouterLink to="/" style={{ color: 'white', textDecoration: 'none' }}>
                  <Box variant="span" fontSize="1rem">U.S. Department of the Interior</Box>
                    Office of Natural Resources Revenue (ONRR)
                  </RouterLink>
                </Typography>
              </LogoContainer>
            </Grid>
            <Grid item xs={3}>
              <SocialMenu />
            </Grid>
          </Grid>
        </Container>
      </FooterContainerBottom>
    </>
  )
}

export default Footer
