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

import Link from './Link'
import LinkList from './LinkList'

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
    }

    # Quick links menu
    menu(id: "dGVybTo1") {
      count
      id
      databaseId
      name
      slug
      menuItems {
        nodes {
          id
          url
          label
          target
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
  let menus
  
  if (data) {
    console.log('Home data: ', data)
    page = data.page
    menus = data.menu
    return (
      <DefaultSectionContainer>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Typography 
              variant="h1" 
              style={{ fontSize: 24, fontWeight: 'normal', marginTop: 10, lineHeight: '34px' }}
              dangerouslySetInnerHTML={{__html: page.content}} />
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  {/* <Link href="https://google.com">My test link yo!</Link> */}
                  <LinkList title="New to reporting?" data={[]} />
                </Grid>
                <Grid item xs={6}>
                  <LinkList title="Quick links" data={[]} />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <LinkList title="Getting Started" data={[]} />
                </Grid>
                <Grid item xs={4}>
                  <LinkList title="Reporting" data={[]} />
                </Grid>
                <Grid item xs={4}>
                  <LinkList title="Guidance & References" data={[]} />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <LinkList title="Paying" data={[]} />
                </Grid>
                <Grid item xs={4}>
                  <LinkList title="Compliance & Inforcement" data={[]} />
                </Grid>
                <Grid item xs={4}>
                  <LinkList title="Indian Resources" data={[]} />
                </Grid>
              </Grid>
          </Grid>
          <Grid item xs={4}>
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
