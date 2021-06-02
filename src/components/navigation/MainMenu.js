import React, { useState, useRef, createRef, useEffect } from 'react'

import { Link as RouterLink } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { gql } from '@apollo/client'

import {
  Button ,
  ClickAwayListener,
  Grow, 
  Paper, 
  Popper, 
  Menu,
  MenuItem, 
  MenuList,
  ListItem,
  Collapse,
  createStyles
} from '@material-ui/core'

import {
  withStyles
} from '@material-ui/core/styles'
import { groupBy } from '../../js/utils'

/* Main Menu Query */
const MAIN_MENU_QUERY = gql`
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

const HorizontalMenuList = withStyles(theme => 
  createStyles({
    root: {
      display: 'inline-flex'
    }
  })
)(MenuList)

const MenuButton = withStyles(theme => 
  createStyles({
    root: {
      color: theme.palette.common.white,
      textTransform: 'capitalize'
    }
  })
)(Button)

const StyledMenu = withStyles(theme => 
  createStyles({
    paper: {
      boxShadow: '0 1px 1px 1px rgba(0, 0, 0, .1)'
    }
  })
)(Menu)

const MainMenu = ({ location }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const { loading, error, data } = useQuery(MAIN_MENU_QUERY)

  let menuItems = []
  let childItems
  let parentId
  let customUrl

  const handleClick = (index, event) => {
    console.log('handleClick event: ', event)
    setAnchorEl({ [index]: event.target })
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  if (loading) return ''
  if (error) return `Error! ${ error.message }`

  if (data) {
    // console.debug('main menu data: ', data)
    childItems = data.menu_items.filter(item => item.menu === 'main' && item.parent !== null)
    const items = data.menu_items.filter(item => item.menu === 'main').map(item => {
      if (item.parent === null) {
        menuItems.push({ key: item, data: [...childItems.filter(child => child.parent.id === item.id)] })
      }
    })

    // console.debug('menuItems: ', menuItems)

    return (
      <>
      {menuItems.map((item, i) => {
        return (
          <>
            <MenuButton
              key={`mb__${ i }`}
              onClick={(e) => handleClick(i, e)}>
              {item.key.menu_label}
            </MenuButton>
            {item.data.length > 0 &&
            <StyledMenu
              id="main-menu"
              anchorEl={anchorEl && anchorEl[i]}
              keepMounted
              open={Boolean(anchorEl && anchorEl[i])}
              onClose={() => setAnchorEl(null)}>
                <MenuItem
                  component={RouterLink}
                  to={`/${ item.key.link_to_page.slug }`}
                  onClick={() => setAnchorEl(null)} key={`mi__${ i }`}>
                  {`${ item.key.menu_label } Home`}
                </MenuItem>
                { item.data.map((subMenuItem, i) => (
                <MenuItem
                  component={RouterLink}
                  to={`/${ item.key.link_to_page.slug }/${ subMenuItem.link_to_page.slug }`}
                  onClick={() => setAnchorEl(null)} key={`mi__${ i }`}>
                  {subMenuItem.menu_label}
                </MenuItem>
                ))}
            </StyledMenu>
            }
          </>
        )
      })}
      </>
    )
  }
}

export default MainMenu
