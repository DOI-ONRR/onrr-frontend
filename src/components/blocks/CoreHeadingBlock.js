import React from 'react'

import {
  Typography
} from '@material-ui/core'

import {
  createStyles,
  withStyles
} from '@material-ui/core/styles'

const StyledHeadingBlock = withStyles((theme, additionalStyles) =>
  createStyles({
    root: {
      fontSize: 24,
      fontWeight: 'normal',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(4),
      lineHeight: '34px'
    },
    ...additionalStyles
  })
)(Typography)


const CoreHeadingBlock = ({ data }) => {
  let variant
  
  switch (data.attributes.level) {
    case 1:
      variant = 'h1'
      break
    case 2:
      variant = 'h2'
      break
    case 3:
      variant = 'h3'
      break
    case 4:
      variant = 'h4'
      break
    case 5:
      variant = 'h5'
      break
    case 6:
      variant = 'h6'
      break
    default:
      variant = 'h1'
      break
  }

  return (
    <StyledHeadingBlock
      variant={variant}
      dangerouslySetInnerHTML={{__html: data.attributes.content }} />
  )
}

export default CoreHeadingBlock
