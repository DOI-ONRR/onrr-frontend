import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from '@apollo/client'

import {
  Box,
  Typography,
  Grid
} from '@material-ui/core'

import {
  createStyles,
  withStyles
} from '@material-ui/styles'

import Loading from './Loading'
import Announcements from './Announcements'
import RevenueStats from './RevenueStats'
import ReporterLetters from './sections/ReporterLetters'

import {
  ContentBlock,
  CoreColumnsBlock,
  CoreHeadingBlock, 
  CoreImageBlock
} from './blocks'

const HOME_PAGE_QUERY = gql`
  query {
    pages_by_id(id: 1) {
      id
      title
      content
    }
  }
`

const components = {
  CoreHeadingBlock: CoreHeadingBlock,
  CoreImageBlock: CoreImageBlock,
  CoreColumnsBlock: CoreColumnsBlock,
}

const DefaultSectionContainer = withStyles(theme => 
  createStyles({
    root: {
      paddingBottom: theme.spacing(6)
    }
  })
)(Box)


const Home = ({ pageId, ...rest }) => {
  const { loading, error, data } = useQuery(HOME_PAGE_QUERY)

  if (loading) return <Loading />
  if (error) return `Error! ${ error.message }`

  let page
  let blocks

  const getBlockComponent = (name, data) => {
    console.debug('getBlockComponent: ', name, data)
    const BlockComponent = components[name]
    if (BlockComponent && data) return <BlockComponent data={data} />
  }

  if (data) {
    console.log('Home data: ', data)
    page = data.pages_by_id

    return (
      <DefaultSectionContainer>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Box
              dangerouslySetInnerHTML={{__html: page.content }} />

            {/* {(blocks.length > 0) &&
              blocks.map(block => {
                return getBlockComponent(block.__typename, block)
              })
            } */}

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <ReporterLetters />
              </Grid>
              <Grid item xs={12} md={6}>
                <ReporterLetters />
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <RevenueStats />
              </Grid>
            </Grid>
            
          </Grid>
          <Grid item xs={12} md={4}>
            <Announcements title={'Announcements'} />
          </Grid>
        </Grid>
      </DefaultSectionContainer>
    )
  }
}

export default Home
