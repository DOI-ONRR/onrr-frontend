import React from 'react'
import PropTypes from 'prop-types'

import {
  Link as MuiLink
} from '@material-ui/core'

import {
  createStyles,
  withStyles
} from '@material-ui/core'

const DefaultLink = withStyles(theme =>
  createStyles({
    root: {
      color: theme.links.default,
      textDecoration: 'underline',
      '&:hover': {
        textDecoration: 'none'
      }
    }
  })
)(MuiLink)

export default function Link({ children, href, state }) {
  return (
    <DefaultLink href={href}>
      {children}
    </DefaultLink>
  )
}

Link.propTypes = {
  children: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired
}
