import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { ApolloClient, InMemoryCache, gql, useLazyQuery } from '@apollo/client'
import { Query } from '@apollo/react-components'
import { DIRECTUS_API_URL } from '../constants'

import {
  Card,
  CardContent,
  Typography,
  Grid
} from '@material-ui/core'

import Loading from './Loading'
import useFetch from '../useFetch'

const directusClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:8055/graphql',
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
})

// const ANNOUNCEMENTS_QUERY = gql`
//   {
//     announcements {
//       nodes {
//         announcementId
//         content(format: RENDERED)
//         title(format: RENDERED)
//       }
//     }
//   }
// `

const ANNOUNCEMENTS_QUERY = gql`
  query {
    announcements {
      id
      title 
      content
    }
  }
`

const Announcements = ({ title }) => {
  return (
    <Query query={ANNOUNCEMENTS_QUERY} client={directusClient}>
        {({ error, loading, data }) => {
          if (loading) return <Loading />
          if (error) return `Error! ${ error.message }`

          if (data) {
            console.log('announcements data: ', data)
            const announcements = data.announcements
            return (
              <Grid container spacing={2}>
                <Typography variant="h4" align="left" style={{ marginBottom: 20 }}>
                  {title}
                </Typography>
                {announcements.map((announcement, index) => (
                  <Grid item xs={12} key={index}>
                    <Card>
                      <CardContent>
                        <h3 key={announcement.id}>{announcement.title}</h3>
                        <Typography
                          variant="body1"
                          component="p"
                          dangerouslySetInnerHTML={{__html: announcement.content }} />            
                      </CardContent>
                    </Card>
                  </Grid>
                  ))
                }
              </Grid>
            )
          }
        }
      }
    </Query>
  )
}

export default Announcements
