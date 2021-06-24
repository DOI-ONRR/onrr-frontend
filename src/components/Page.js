import React from 'react'

import { useQuery } from '@apollo/react-hooks'
import { gql } from '@apollo/client'

import { DEV_URL } from '../constants'

import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography
} from '@material-ui/core'

import Loading from './Loading'

const PAGE_QUERY = gql`
  query ($id: ID!) {
    pages_by_id(id: $id) {
      id
      title
      content
      hero_image {
        id
        filename_disk
      }
    }
  }
`

const Page = ({ pageId, ...rest }) => {
  const { loading, error, data } = useQuery(PAGE_QUERY, {
    variables: { id: pageId }
  })

  if (loading) return <Loading />
  if (error) return `Error! ${ error.message }`

  let page
  
  if (data) {
    console.log('Page data: ', data)
    page = data.pages_by_id
    return (
      <>
        {page.hero_image !== null &&
            <div className="hero-image" 
              style={{
                height: '300px',
                width: '100vw',
                position: 'relative',
                backgroundSize: 'cover',
                backgroundPosition: '50% 50%',
                backgroundImage: `url(${ DEV_URL }/assets/${ page.hero_image.id })`
              }}
            >
            <div style={{
              position: 'absolute',
              height: '30%',
              width: '80%',
              bottom: 0,
              right: 0,
              background: 'rgba(0, 0, 0, 0.65)',
              color: 'white',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              flexDirection: 'column',
              paddingLeft: 50,
            }}>
              <h1 style={{ fontWeight: 400 }}>{page.title}</h1></div>
          </div>
        }
        <Container maxWidth="lg">
          <Grid container spacing={2} style={{ paddingTop: 25 }}>
          <Grid item xs={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" style={{ fontSize: 18 }}>
                  {`${ page.title } Home`}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={9} style={{ paddingTop: 25, paddingBottom: 50 }}>
            <Typography
                variant="body1"
                component="p"
                dangerouslySetInnerHTML={{__html: page.content}} />
          </Grid>
        </Grid>
        </Container>
      </>
    )
  }
}

export default Page
