import React from 'react'

import { Link as RouterLink } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { gql } from '@apollo/client'

import {
  ListItem
} from '@material-ui/core'

import {
  createStyles,
  withStyles
} from '@material-ui/core/styles'

const StyledListItem = withStyles(theme =>
  createStyles({
    root: {
      color: theme.palette.common.white,
      marginRight: 25,
      textDecoration: 'none',
      '&:hover': {
        background: 'rgba(6, 33, 53, .75)'
      }
    }
  })
)(ListItem)

const MOBILE_MENU_QUERY = gql`
  {
    # main menu 
    mainMenu: menus(where: {id: 2}) {
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
    quickMenu: menus(where: {id: 5}) {
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

const MobileMenu = ({ location }) => {
  const { loading, error, data } = useQuery(MOBILE_MENU_QUERY)
  let items

  if (loading) return ''
  if (error) return `Error! ${ error.message }`
  if (data) {
    items = [...data.mainMenu.nodes[0].menuItems.nodes, ...data.quickMenu.nodes[0].menuItems.nodes]
    return (
      <>
      {items.map((item, index) => (
        <StyledListItem button key={index}>
          <RouterLink key={index} 
            to={`${item.path}`}
            style={{ color: 'white', marginRight: 25, textDecoration: 'none' }}>
            {item.label}
          </RouterLink>
        </StyledListItem>
      ))}
      </>
    )
  }
}

export default MobileMenu
