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
  const [open, setOpen] = useState(false)

  // Toggle drawer
  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleClickAway = () => {
    handleDrawerClose()
  }

  // list 
  const list = clickHandler => (
      <List>
        <StyledIconButton aria-label="Close menu" onClick={clickHandler}>
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
  )

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <StyledIconButton
          aria-label="mobile-menu"
          onClick={handleDrawerOpen}>
          <MenuIcon />
        </StyledIconButton>
        <DrawerContainer
          // variant="persistent"
          anchor={'right'}
          open={open}>
          {list(handleDrawerClose)}
        </DrawerContainer>
      </div>
    </ClickAwayListener>
  )
}

export default MenuDrawer

MenuDrawer.propTypes = {
  children: PropTypes.element.isRequired
}
