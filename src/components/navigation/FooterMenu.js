import React from 'react'

import { useQuery } from '@apollo/react-hooks'
import { gql } from '@apollo/client'

import { 
  Box,
  Link as MuiLink, 
  ListItemAvatar
} from '@material-ui/core'

import {
  withStyles,
  createStyles
} from '@material-ui/core/styles'

const FOOTER_MENU_QUERY = gql`
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

const NavContainer = withStyles(theme =>
  createStyles({
    root: {
      '& nav': {
        marginBottom: theme.spacing(1)
      },
      '& nav a': {
        color: 'white',
        marginRight: 25, 
        textDecoration: 'none'
      }
    }
  })
)(Box)

const NavLink = ({ children, href, target, rest }) => {
  return (
    <MuiLink 
      href={href}
      target={target}
      {...rest}>
      {children}
    </MuiLink>
  )
}

const FooterMenu = () => {
  const { loading, error, data } = useQuery(FOOTER_MENU_QUERY)
  let items
  let navTop = []
  let navBottom = []

  if (loading) return ''
  if (error) return `Error! ${ error.message }`
  if (data) {
    items = data.menu_items.filter(item => item.menu === 'footer')
    items.map((item, index) => {
      if (index < 5) navTop.push(item)
      else navBottom.push(item)
    })
    return (
      <NavContainer>
        <nav>
          {navTop.map((item, index) => (
            <NavLink 
              key={index} 
              href={`${item.custom_url || item.link_to_page.slug}`}
              target={'_blank'}>
                {item.menu_label}
            </NavLink>
          ))}
        </nav>
        <nav>
        {navBottom.map((item, index) => (
          <NavLink key={index} 
            href={`${item.custom_url || item.link_to_page.slug}`}
            target={'_blank'}>
            {item.menu_label}
          </NavLink>
        ))}
        </nav>
      </NavContainer>
    )
  }
}

export default FooterMenu
