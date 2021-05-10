import React from 'react'

import {
  Box
} from '@material-ui/core'

import {
  withStyles,
  createStyles
} from '@material-ui/core/styles'

import UsFlagImg from '../../images/UsFlagImg'

const InfoBannerContainer = withStyles(theme =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#222',
      height: 30,
      transition: 'height .1s ease', 
      position: 'relative', 
      zIndex: 250, 
      color: 'white'
    }
  })
)(Box)

const InfoBanner = () => {
  return (
    <InfoBannerContainer
      displayPrint="none">
      <UsFlagImg alt={'U.S. flag signifying that this is a United States Federal Government website'} />
      <Box fontSize="caption.fontSize" m={{ sm: 0.5, md: 1 }}>An official website of the U.S. government</Box>
    </InfoBannerContainer>
  )
}

export default InfoBanner