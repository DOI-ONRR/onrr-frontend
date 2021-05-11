import React from 'react' 

import {
  Box,
  Grid
} from '@material-ui/core'

import HomeBlock from '../HomeBlock'

const CoreColumnsBlock = ({ data }) => {
  console.debug('CoreColumnsBlock data: ', data)
  const blocks = data.innerBlocks
  let colWidth
  switch (blocks.length) {
    case 2:
      colWidth = 6
      break
    case 3:
      colWidth = 4
      break
    default:
      colWidth = 12
      break;
  }
  return (
    <Grid container spacing={3}>
      {blocks.length > 0 && blocks.map((block, i) => {
        console.log('block content yo: ', block)
        return (
          <Grid key={`block__${i}`} item xs={12} md={colWidth}>
            <HomeBlock content={block.innerBlocks.map(item => item.dynamicContent)} />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default CoreColumnsBlock
