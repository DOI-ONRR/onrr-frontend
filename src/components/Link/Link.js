import React from 'react'
import PropTypes from 'prop-types'

import {
  Link as MuiLink
 } from '@material-ui/core'

import {
  createStyles,
  withStyles
} from '@material-ui/core/styles'

const DefaultLink = withStyles((theme, linkType = "primary", additionalStyles) =>
  createStyles({
    root: {
      color: (linkType === "primary") ? theme.palette.primary.main : theme.palette.secondary.main,
      textDecoration: 'underline',
      ...additionalStyles
    }
  })
)(MuiLink)

const Link = ({ href, children, linkType }) => {
  return (
    <DefaultLink href={href} linkType={linkType}>
      {children}
    </DefaultLink>
  )
}

export default Link

Link.propTypes = {
  children: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  linkType: PropTypes.string
}
