import React from 'react'

import { useQuery } from '@apollo/react-hooks'
import { gql } from '@apollo/client'

import {
  Card,
  CardContent,
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
            variant="h4" 
            style={{ fontSize: 30 }}
            dangerouslySetInnerHTML={{__html: page.title}} />
          <Typography
              variant="body1"
              component="p"
              dangerouslySetInnerHTML={{__html: page.content}} />
        </Grid>
      </Grid>
    )
  }
}

export default Page
