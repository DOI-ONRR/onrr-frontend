import React from 'react'

import { useQuery } from '@apollo/react-hooks'
import { gql } from '@apollo/client'

import { 
  Box,
  Link as MuiLink 
} from '@material-ui/core'
import {
  createStyles,
  withStyles
} from '@material-ui/core/styles'

import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import YouTubeIcon from '@material-ui/icons/YouTube'
import PhoneIcon from '@material-ui/icons/Phone'

const SOCIAL_MENU_QUERY = gql`
  query {
    menu_items {
      id
      menu_label
      custom_url
      menu
      link_to_page {
        id
        slug
      }
      parent {
        id
        custom_url
        link_to_page {
          id
          slug
        }
      }
    }
  }
`

const StyledMuiLink = withStyles(theme =>
  createStyles({
    root: {
      color: theme.palette.common.white,
      marginRight: 25,
      textDecoration: 'none',
    }
  })
)(MuiLink)

const SocialLink = ({ children, href, label, rest }) => {
  return (
    <StyledMuiLink 
      href={href}
      {...rest}>
      {label === 'Facebook' && <FacebookIcon style={{ color: 'white' }} />}
      {label === 'Twitter' && <TwitterIcon style={{ color: 'white' }} />}
      {label === 'YouTube' && <YouTubeIcon style={{ color: 'white' }} />}
      {(label !== 'Facebook' && label !== 'Twitter' && label !== 'YouTube') && children}
    </StyledMuiLink>
  )
}

const SocialMenu = () => {
  const { loading, error, data } = useQuery(SOCIAL_MENU_QUERY)
  let items

  if (loading) return ''
  if (error) return `Error! ${ error.message }`
  if (data) {
    items = data.menu_items.filter(item => item.menu === 'social')
    return (
      <Box align="right">
        <nav>
          {items.map((item, index) => (
            <SocialLink key={index} 
              href={`${item.custom_url || item.link_to_page.slug}`}
              label={item.menu_label}>
              {item.menu_label}
            </SocialLink>
          ))}  
        </nav>
        <Box style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <PhoneIcon style={{ color: 'white', marginRight: 10 }} /><SocialLink href="" style={{ margin: 0 }}>Contact us</SocialLink>
        </Box>
      </Box>
    )
  }
}

export default SocialMenu
