import React from 'react'
import PropTypes from 'prop-types'

import {
  Box,
  Paper,
  Typography,
  useTheme
} from '@material-ui/core'

import {
  createStyles,
  withStyles
} from '@material-ui/styles'

const DefaultBlockContainer = withStyles(theme => 
  createStyles({
    root: {
      padding: theme.spacing(2),
      minHeight: 400,
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
      '& .lazyblock-home-page-link-block-ijOAO .link-item': {
        display: 'flex',
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
      },
      '& .link-bottom-container  .link-bottom-item:first-child': {
        borderTop: `1px solid ${ theme.palette.grey[400] }`,
        marginTop: theme.spacing(2),
        paddingTop: theme.spacing(1),
      }
    }
  })
)(Paper)

const ContentBlock = ({ loading, data }) => {
  console.log('DefaultBlock data: ', data)
  const theme = useTheme()
  if (data) {
    return (
      <DefaultBlockContainer
        theme={theme}>
          {(data.show_title) && <Typography variant="h4" dangerouslySetInnerHTML={{__html: data.title }} />}
          <Box dangerouslySetInnerHTML={{__html: data.content }}></Box>
      </DefaultBlockContainer>
    )
  }
  else {
    return <></>
  }
  
}

export default ContentBlock

ContentBlock.propTypes = {
  loading: PropTypes.bool,
  /* data */
  content: PropTypes.string
}