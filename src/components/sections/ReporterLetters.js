import React from 'react'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { Query } from '@apollo/react-components'
import { DIRECTUS_API_URL } from '../../constants'
import useFetch from '../../useFetch'

import {
  Card,
  CardContent,
  Typography,
  Grid,
  Link as MuiLink
} from '@material-ui/core'

import {
  createStyles,
  withStyles
} from '@material-ui/core/styles'

import Loading from '../Loading'
import { formatToDollarInt } from '../../js/utils'


const directusClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `${ DIRECTUS_API_URL }/graphql/system`,
  // defaultOptions: {
  //   watchQuery: {
  //     fetchPolicy: 'cache-and-network',
  //   },
  // },
})

const REPORTER_LETTERS_QUERY = gql`
  query {
    files {
      id
      storage
      filename_disk
      title
      filesize
      location
      folder {
        id 
        name
      }
    }
    folders {
      id
      name
    }
  }
`

const StyledMuiLink = withStyles(theme => 
  createStyles({
    root: {
      display: 'block'
    }
  })
)(MuiLink)


const ReporterLetters = () => {
  console.log('useFetch, folders----->', useFetch(`${ DIRECTUS_API_URL }/folders`))
  console.log('useFetch, files----->', useFetch(`${ DIRECTUS_API_URL }/files`))
  return (
    <Query query={REPORTER_LETTERS_QUERY} client={directusClient}>
      {({ error, loading, data }) => {
        console.log('Reporter Letters data: ', data)

        let folder
        let files

        if (!data) return <Loading />

        if (data) {
          console.log('reporter letters: ', data)
          files = data.files.filter(file => file.folder && file.folder.name === 'Reporter Letters')

          console.log('files: ', files)
          return (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h4" align="left" style={{ marginBottom: 20 }}>
                      Reporter Letters
                    </Typography>
                    {
                      files.map(file => <StyledMuiLink href={`${ DIRECTUS_API_URL }/assets/${ file.filename_disk }`}>{file.title}</StyledMuiLink>)
                    }
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )
        }
      }}
    </Query>
  )
}

export default ReporterLetters
