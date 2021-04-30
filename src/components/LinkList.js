import React from 'react'
import PropTypes from 'prop-types'

import {
  Paper,
  Typography
} from '@material-ui/core'

import {
  createStyles,
  withStyles
} from '@material-ui/styles'

const DefaultLinkListContainer = withStyles(theme => 
  createStyles({
    root: {
      padding: theme.spacing(2),
      minHeight: 250,
    }
  })
)(Paper)

export default function LinkList({ loading, title, data }) {
  console.log('linkList data: ', data)
  return (
    <DefaultLinkListContainer>
      <Typography variant="h4">{title}</Typography>
      <span>Display all links...</span>
    </DefaultLinkListContainer>
  )
}

LinkList.propTypes = {
  loading: PropTypes.bool,
  /* data to build link list */
  data: PropTypes.array.isRequired,
  title: PropTypes.string
}