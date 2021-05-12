import React, { useEffect, useState } from 'react'

import {
  Box,
  useMediaQuery,
  useTheme
} from '@material-ui/core'
import { withStyles, createStyles } from '@material-ui/core/styles'

import { AppToolbar } from '../../toolbars/AppToolbar'

import useWindowSize from '../../../js/hooks/useWindowSize'

const StickyHeaderContainer = withStyles(theme =>
  createStyles({
    root: {
      position: 'sticky',
      top: 0,
      left: 0,
      right: 0,
      width: '100vw',
      zIndex: '1002',
      maxWidth: '100%',
      transition: 'height .1s ease',
      '& .is-collapsed': {
        height: 145,
      },
      '& .is-collapsed header': {
        height: 110,
        [theme.breakpoints.down('sm')]: {
          height: 60,
        },
      },
      '& .is-collapsed header > div:first-child': {
        height: 0,
        // visibility: 'hidden',
        transition: 'height .2s ease',
      },
      '& .is-collapsed header > div:first-child > img': {
        display: 'none'
      },
      '& .is-collapsed > header > div:nth-child(2)': {
        height: 50,
        transition: 'height .1s ease',
        position: 'relative',
        zIndex: 300,
        backgroundColor: 'rgb(6, 33, 53)'
      },
      '& .is-collapsed > header > div:nth-child(2) img': {
        height: 40,
        width: 40,
        transition: 'height .1s ease',
      },
      '& .is-collapsed > header > div:last-child': {
        height: 60,
        minHeight: 'inherit',
        overflow: 'hidden',
        transition: 'height .1s ease',
      },
    }
  })
)(Box)

const StickyHeader = ({ isShutdown = false, ...rest }) => {
  const theme = useTheme()
  const matchesSmDown = useMediaQuery(theme.breakpoints.down('xs'))
  const [collapsed, setCollapsed] = useState(!!matchesSmDown)

  const size = useWindowSize()

  useEffect(() => {
    const matches = matchesSmDown
    const handler = () => {
      setCollapsed(isCollapsed => {
        if (
          !isCollapsed && (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60)
        ) {
          return true
        }

        if (
          isCollapsed &&
            document.body.scrollTop < 10 &&
            document.documentElement.scrollTop < 10
        ) {
          return false
        }

        return isCollapsed
      })
    }

    if (matches) {
      setCollapsed(true)
    }
    else {
      window.addEventListener('scroll', handler)
      return () => window.removeEventListener('scroll', handler)
    }
  }, [size.width, matchesSmDown])

  return (
    <StickyHeaderContainer>
      <div className={collapsed ? 'is-collapsed' : 'not-collapsed'}>
        <AppToolbar />
      </div>
    </StickyHeaderContainer>
  )
}

export default StickyHeader