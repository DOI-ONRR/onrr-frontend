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
  {
    menus(where: {id: 3}) {
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
    items = data.menus.nodes[0].menuItems.nodes
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
              href={`${item.path}`}
              target={'_blank'}>
                {item.label}
            </NavLink>
          ))}
        </nav>
        <nav>
        {navBottom.map((item, index) => (
          <NavLink key={index} 
            href={`${item.path}`}
            target={'_blank'}>
            {item.label}
          </NavLink>
        ))}
        </nav>
      </NavContainer>
    )
  }
}

export default FooterMenu
