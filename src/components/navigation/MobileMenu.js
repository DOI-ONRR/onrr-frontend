import React, { useState } from 'react'

import { Link as RouterLink } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { gql } from '@apollo/client'

import {
  ClickAwayListener,
  Collapse,
  List,
  ListItem
} from '@material-ui/core'

import {
  createStyles,
  withStyles
} from '@material-ui/core/styles'

import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

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

const StyledNestedListItem = withStyles(theme =>
  createStyles({
    root: {
      color: theme.palette.common.white,
      paddingLeft: theme.spacing(4)
    }
  })
)(ListItem)

const MOBILE_MENU_QUERY = gql`
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

const MobileMenu = ({ location }) => {
  const { loading, error, data } = useQuery(MOBILE_MENU_QUERY)
  const [open, setOpen] = useState(false)

  let menuItems = []
  let childItems

  const handleClick = event => {
    setOpen((prev) => !prev)
  }

  if (loading) return ''
  if (error) return `Error! ${ error.message }`
  if (data) {
    childItems = data.menu_items.filter(item => item.menu === 'main' && item.parent !== null)
    const items = data.menu_items.filter(item => item.menu === 'main' || item.menu === 'header').map(item => {
      if (item.parent === null) {
        menuItems.push({ key: item, data: [...childItems.filter(child => child.parent.id === item.id)] })
      }
    })
    console.log('MobileMenu menuItems: ', menuItems)
    return (
      <List
      component="nav"
      aria-labelledby="nav-list-subheader">
        {menuItems.map((item, i) => {
          return (
            <>
              <StyledListItem button key={i} onClick={handleClick}>
                <RouterLink key={i} 
                  // to={`/${ item.key.link_to_page.slug }`}
                  style={{ color: 'white', marginRight: 25, textDecoration: 'none' }}>
                  {item.key.menu_label}
                </RouterLink>
                {item.data.length > 0 &&
                  <>
                   { open ? <ExpandLess /> : <ExpandMore /> }
                  </>
                }
              </StyledListItem>
              {item.data.length > 0 &&
                open ? (
                  <List component="div" disablePadding>
                    { item.data.map((subMenuItem, i) => (
                      <StyledNestedListItem button key={i}>
                        {subMenuItem.menu_label}
                      </StyledNestedListItem>
                    ))}
                  </List>
                ) : null
              }
            </>
          )
        })}
      </List>
    )
  }
}

export default MobileMenu
