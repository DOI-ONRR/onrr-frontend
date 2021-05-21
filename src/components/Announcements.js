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
  query {
    announcements {
      id
      title
      content
    }
  }
`

const Announcements = ({ title }) => {
  const { loading, error, data } = useQuery(ANNOUNCEMENTS_QUERY)

  if (loading) return <Loading />
  if (error) return `Error! ${ error.message }`

  if (data) {
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

export default Announcements
