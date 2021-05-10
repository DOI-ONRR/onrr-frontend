import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from '@apollo/client'

import parse from 'html-react-parser'

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

import Link from './Link'
import HomeBlock from './HomeBlock'

const DefaultSectionContainer = withStyles(theme => 
  createStyles({
    root: {
      paddingBottom: theme.spacing(6)
    }
  })
)(Box)

/* HOME QUERIES */
const HOME_PAGE_QUERY = gql`
  query HomePage($id: ID!) {
    page(id: $id, idType: DATABASE_ID) {
      id
      databaseId
      title(format: RENDERED)
      slug
      content(format: RENDERED)
      blocks {
        ... on CoreParagraphBlock {
          dynamicContent
          originalContent
        }
        ... on CoreHtmlBlock {
          dynamicContent
          originalContent
        }
        innerBlocks {
          innerBlocks {
            saveContent
            ... on LazyblockHomePageLinkBlock {
              dynamicContent
              originalContent
              innerBlocks {
                dynamicContent
                ... on LazyblockHomePageLinkBlock {
                  dynamicContent
                  originalContent
                }
              }
            }
          }
        }
      }
    }
  }
`

const Home = ({ pageId, ...rest }) => {
  const { loading, error, data } = useQuery(HOME_PAGE_QUERY, {
    variables: { id: pageId }
  })

  if (loading) return <Loading />
  if (error) return `Error! ${ error.message }`

  let page
  let blocks
  let htmlBlock
  let paragraphBlock
  let parsedContent
  
  if (data) {
    console.log('Home data: ', data)
    page = data.page
    console.debug('parsedContent: ', parse(data.page.content))
    paragraphBlock = data.page.blocks.filter(block => block.__typename === "CoreParagraphBlock")
    htmlBlock = data.page.blocks.filter(block => block.__typename === "CoreHtmlBlock")
    blocks = data.page.blocks.filter(block => block.innerBlocks.length > 0)[0].innerBlocks
    // menus = data.menu
    console.debug('blocks yo: ', blocks)
    return (
      <DefaultSectionContainer>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography 
              variant="h1" 
              style={{ fontSize: 24, fontWeight: 'normal', marginTop: 10, lineHeight: '34px' }}
              dangerouslySetInnerHTML={{__html: paragraphBlock[0].originalContent}} />
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <HomeBlock content={blocks[0].innerBlocks[0].dynamicContent} />
                </Grid>
                <Grid item xs={6}>
                  <HomeBlock content={blocks[1].innerBlocks[0].dynamicContent} />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <HomeBlock content={''} />
                </Grid>
                <Grid item xs={4}>
                  <HomeBlock content={''} />
                </Grid>
                <Grid item xs={4}>
                  <HomeBlock content={''} />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <HomeBlock content={''} />
                </Grid>
                <Grid item xs={4}>
                  <HomeBlock content={''} />
                </Grid>
                <Grid item xs={4}>
                  <HomeBlock content={''} />
                </Grid>
              </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h4" align="left" style={{ marginBottom: 20 }}>
              Announcements
            </Typography>
            <Announcements />
          </Grid>
        </Grid>
      </DefaultSectionContainer>
    )
  }
}

export default Home
