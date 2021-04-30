import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from '@apollo/client'
import {
  Card,
  CardContent,
  Typography,
  Grid
} from '@material-ui/core'

import Loading from './Loading'

const POSTS_QUERY = gql`
  {
    posts {
      nodes {
        postId
        title(format: RENDERED)
        content(format: RENDERED)
      }
    }
  }
`

const Posts = () => {
  const { loading, error, data } = useQuery(POSTS_QUERY)
  let posts

  console.log('posts: ', posts)

  if (loading) return <Loading />
  if (error) return `Error! ${ error.message }`

  if (data) {
    posts = data.posts.nodes
    return (
      <Grid container spacing={2}>
        {posts.map((post, index) => (
          <Grid item xs={12} key={index}>
            <Card>
              <CardContent>
                <Typography
                  variant="h3"
                  gutterBottom
                  dangerouslySetInnerHTML={{__html: post.title}} />
                <Typography
                  variant="body1"
                  component="p"
                  dangerouslySetInnerHTML={{__html: post.content}} />
              </CardContent>
            </Card>
          </Grid>
          ))
        }
      </Grid>
    )
  }
}

export default Posts