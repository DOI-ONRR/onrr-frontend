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

import {
  CoreColumnsBlock,
  CoreHeadingBlock, 
  CoreImageBlock
} from './blocks'

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
        ... on CoreHeadingBlock {
          attributes {
            ... on CoreHeadingBlockAttributes {
              align
              content
              level
            }
          }
        }
        ... on CoreImageBlock {
          attributes {
            ... on CoreImageBlockAttributes {
              alt
              rel
              linkTarget
              url
              title
            }
          }
        }
        ... on CoreParagraphBlock {
          dynamicContent
          originalContent
        }
        ... on CoreHtmlBlock {
          dynamicContent
          originalContent
        }
        innerBlocks {
          ... on CoreColumnBlock {
            name
            order
            innerBlocks {
              dynamicContent
              originalContent
              saveContent
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
`

const Home = ({ pageId, ...rest }) => {
  const { loading, error, data } = useQuery(HOME_PAGE_QUERY, {
    variables: { id: pageId }
  })

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
    page = data.page
    blocks = data.page.blocks
    // menus = data.menu
    console.debug('blocks yo: ', blocks)
    return (
      <DefaultSectionContainer>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {(blocks.length > 0) &&
              blocks.map(block => {
                return getBlockComponent(block.__typename, block)
              })
            }
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
