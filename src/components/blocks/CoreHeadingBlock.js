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
  let variant = `h${ data.attributes.level || 1 }`

  return (
    <StyledHeadingBlock
      variant={variant}
      dangerouslySetInnerHTML={{__html: data.attributes.content }} />
  )
}

export default CoreHeadingBlock
