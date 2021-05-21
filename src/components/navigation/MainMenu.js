import React, { useState, useRef, createRef } from 'react'

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
  createStyles
} from '@material-ui/core'

import {
  withStyles
} from '@material-ui/core/styles'

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

const MainMenu = ({ location }) => {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)

  const { loading, error, data } = useQuery(MAIN_MENU_QUERY)

  let menuItems
  let parent
  let customUrl
  let menuRefs = useRef(new Array())

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    }
  }

  if (loading) return ''
  if (error) return `Error! ${ error.message }`

  if (data) {
    console.debug('main menu data: ', data)
    menuItems = data.menu_items.filter(item => item.menu === 'main' && item.parent === null)
    return (
      <HorizontalMenuList>
      {menuItems.map((item, index) => {
        parent = (item.parent !== null) && (item.parent.custom_url || item.parent.link_to_page.slug)
        customUrl = item.custom_url !== null
        const getRef = (element) => (menuRefs.current.push(element))
        return (
          <>
          <MenuItem
            ref={getRef}
            className
            onClick={handleToggle}>
            {item.menu_label}
          </MenuItem>
          <Popper open={open} anchorEl={getRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem onClick={handleClose}>My account</MenuItem>
                      <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </>
        )
      })}
      </HorizontalMenuList>
    )
  }
}

export default MainMenu
