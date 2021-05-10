import React from 'react'

import {
  makeStyles,
  useTheme
 } from '@material-ui/core/styles'

import { Toolbar } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
    overflow: 'auto',
    alignItems: 'stretch',
    backgroundColor: theme.palette.common.white,
    minHeight: 50,
  },
  rootSecondary: {
    backgroundColor: theme.palette.primary.main,
    boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
    overflow: 'auto',
    position: 'relative',
    top: -1,
    minHeight: 71,
  },
}))
/**
 * The toolbar is used to contain various inputs for the user to access.
 */
const BaseToolbar = ({ isSecondary, children, style, ...restProps }) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  return (
    <Toolbar
      classes={{
        root: (isSecondary) ? classes.rootSecondary : classes.root,
      }}
      style={style}
      {...restProps}>
      {children}
    </Toolbar>
  )
}

export default BaseToolbar