import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from '@apollo/client'
import {
  Typography,
  Grid
} from '@material-ui/core'

import Loading from './Loading'

const PAGES_QUERY = gql`
  query Pages($title: String!) {
    pages(where: {title: $title}) {
      nodes {
        content(format: RENDERED)
        pageId
        slug
        title(format: RENDERED)
        status
      }
    }
  }
`

const Pages = ({ title, ...rest }) => {
  const { loading, error, data } = useQuery(PAGES_QUERY, {
    variables: { title: title || "home" }
  })
  let pages

  console.log('pages: ', pages)

  if (loading) return <Loading />
  if (error) return `Error! ${ error.message }`

  if (data) {
    pages = data.pages.nodes
    return (
      <Grid container spacing={2}>
        {pages.map((page, index) => (
          <Grid item xs={12} key={index}>
            <Typography
              variant="h3"
              gutterBottom
              dangerouslySetInnerHTML={{__html: page.title}} />
            <Typography
              variant="body1"
              component="p"
              dangerouslySetInnerHTML={{__html: page.content}} />
          </Grid>
          ))
        }
      </Grid>
    )
  }
}

export default Pages