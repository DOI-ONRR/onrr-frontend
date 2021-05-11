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
  {
    menus(where: {id: 4}) {
      nodes {
        menuItems {
          nodes {
            label
            menuItemId
            path
            order
            target
          }
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
      {label === 'Youtube' && <YouTubeIcon style={{ color: 'white' }} />}
      {(label !== 'Facebook' && label !== 'Twitter' && label !== 'Youtube') && children}
    </StyledMuiLink>
  )
}

const SocialMenu = () => {
  const { loading, error, data } = useQuery(SOCIAL_MENU_QUERY)
  let items

  if (loading) return ''
  if (error) return `Error! ${ error.message }`
  if (data) {
    items = data.menus.nodes[0].menuItems.nodes
    return (
      <>
        <nav>
          {items.map((item, index) => (
            <SocialLink key={index} 
              href={`${item.path}`}
              label={item.label}>
              {item.label}
            </SocialLink>
          ))}  
        </nav>
        <Box style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
          <PhoneIcon style={{ color: 'white', marginRight: 10 }} /><SocialLink href="">Contact us</SocialLink>
        </Box>
          
      </>
    )
  }
}

export default SocialMenu
