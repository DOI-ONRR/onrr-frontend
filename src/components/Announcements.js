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

const ANNOUNCEMENTS_QUERY = gql`
  {
    announcements {
      nodes {
        announcementId
        content(format: RENDERED)
        title(format: RENDERED)
      }
    }
  }
`

const Announcements = () => {
  const { loading, error, data } = useQuery(ANNOUNCEMENTS_QUERY)
  let announcements

  if (loading) return <Loading />
  if (error) return `Error! ${ error.message }`

  if (data) {
    announcements = data.announcements.nodes
    return (
      <Grid container spacing={2}>
        {announcements.map((announcement, index) => (
          <Grid item xs={12} key={index}>
            <Card>
              <CardContent>
                <h3 key={announcement.announcementId}>{announcement.title}</h3>
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

export default Announcements
