import React from 'react'
import onrrLogoPng from '../../images/icons/onrr-logo-200x200.png'

import { Box } from '@material-ui/core'

import {
  withStyles,
  createStyles
} from '@material-ui/core/styles'

const DefaultImageContainer = withStyles(theme =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      '& > img': {
        height: 50,
        width: 50,
        marginRight: theme.spacing(1),
        transition: 'height .1s',
        [theme.breakpoints.down('sm')]: {
          height: 35,
          width: 35,
          transition: 'height .1s'
        },
      }
    }
  })
)(Box)

export default ({ alt, ...rest }) =>
  <DefaultImageContainer>
    <img 
        src={onrrLogoPng} 
        alt={alt || 'Office of Natural Resources and Revenue'} 
        {...rest}
        className="header-logo" />
  </DefaultImageContainer>
  