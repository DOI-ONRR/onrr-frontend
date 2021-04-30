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
  query Page($id: ID!) {
    page(id: $id, idType: DATABASE_ID) {
      id
      databaseId
      title(format: RENDERED)
      slug
      content(format: RENDERED)
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
    page = data.page
    return (
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" style={{ fontSize: 18 }}>
                {`${ page.title } Home`}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={9}>
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
