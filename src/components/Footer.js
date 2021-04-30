import React from 'react'

import FooterMenu from './navigation/FooterMenu'
import SocialMenu from './navigation/SocialMenu'

import { 
  Box,
  Container,
  Grid
} from '@material-ui/core'
import { createStyles, withStyles } from '@material-ui/styles'

const FooterContainer = withStyles(theme =>
  createStyles({
    root: {
      background: theme.palette.grey[900],
      padding: theme.spacing(4)
    }
  })
)(Box)


const Footer = () => {
  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={9}>
            <FooterMenu />
          </Grid>
          <Grid item xs={3}>
            <SocialMenu />
          </Grid>
        </Grid>
      </Container>
    </FooterContainer>
  )
}

export default Footer
