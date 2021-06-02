import React, { useState } from 'react' 
import PropTypes from 'prop-types'

import {
  ClickAwayListener,
  Drawer,
  IconButton,
  Link as MuiLink,
  List,
  ListItem
} from '@material-ui/core'

import {
  createStyles,
  withStyles
} from '@material-ui/core/styles'

import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'

const StyledIconButton = withStyles(theme =>
  createStyles({
    root: {
      color: theme.palette.common.white
    }
  })
)(IconButton)

const DrawerContainer = withStyles(theme =>
  createStyles({
    root: {
      width: 300,
      '& nav a': {
        display: 'block',
      }
    },
    paper: {
      background: 'rgb(6, 33, 53)'
    }
  })
)(Drawer)

const MenuDrawer = ({ children }) => {
  const [menuState, setMenuState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  })

  // Toggle drawer
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setMenuState({ ...menuState, [anchor]: open })
  }

  const handleClickAway = () => {
    setMenuState({ ...menuState, 'right': false })
  }

  // list 
  const list = (anchor) => (
    <div
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
        <List>
        <StyledIconButton aria-label="Close menu" onClick={toggleDrawer('right', false)}>
          <CloseIcon />
        </StyledIconButton>
        {
          React.Children.map(children, (child, index) => {
            return (
              <>
                {child}
              </>
            )
          })
        }
      </List>
    </div>
  )

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
      <StyledIconButton
        aria-label="mobile-menu"
        onClick={toggleDrawer('right', true)}>
        <MenuIcon />
      </StyledIconButton>
      <DrawerContainer
        anchor={'right'}
        open={menuState.right}
        onClose={toggleDrawer('right', false)}>
        {list('right')}
      </DrawerContainer>
      </div>
    </ClickAwayListener>
  )
}

export default MenuDrawer

MenuDrawer.propTypes = {
  children: PropTypes.element.isRequired
}
