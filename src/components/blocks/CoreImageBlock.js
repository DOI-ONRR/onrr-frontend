import React from 'react'

import { Box } from '@material-ui/core'

import {
  createStyles,
  withStyles
} from '@material-ui/core/styles'

const StyledBlock = withStyles(theme =>
  createStyles({
    root: {
      marginBottom: theme.spacing(2)
    }
  })
)(Box)

const CoreImageBlock = ({ data }) => {
  return (
    <StyledBlock>
      <img src={data.attributes.url} alt={data.attributes.alt || 'ONNR image'} />
    </StyledBlock>
  )
}

export default CoreImageBlock
