import React from 'react'
import PropTypes from 'prop-types'

import {
  Paper,
  Typography,
  useTheme
} from '@material-ui/core'

import {
  createStyles,
  withStyles
} from '@material-ui/styles'

const DefaultHomeBlockContainer = withStyles(theme => 
  createStyles({
    root: {
      padding: theme.spacing(2),
      minHeight: 330,
      '& h4': {
        fontSize: 30,
        fontWeight: 400,
        marginTop: theme.spacing(0),
        marginBottom: theme.spacing(2)
      },
      '& a': {
        display: 'flex',
        fontSize: 16,
        color: '#1478a6',
        marginBottom: theme.spacing(1)
      },
      '& .lazyblock-home-page-link-block-ijOAO .link-repeater-item': {
        marginBottom: theme.spacing(2)
      },
      '& .lazyblock-home-page-link-block-ijOAO a': {
        fontSize: 24
      },
      '& .link-repeater-item': {
        display: 'flex',
      },
      '& .link-icon': {
        marginRight: theme.spacing(2)
      }
    }
  })
)(Paper)

export default function HomeBlock({ loading, content }) {
  // console.log('HomeBlock data: ', content)
  const theme = useTheme()
  if (content) {
    return (
      <DefaultHomeBlockContainer
        theme={theme}
        dangerouslySetInnerHTML={{__html: content}}>
      </DefaultHomeBlockContainer>
    )
  }
  else {
    return <></>
  }
  
}

HomeBlock.propTypes = {
  loading: PropTypes.bool,
  /* data */
  content: PropTypes.string.isRequired
}