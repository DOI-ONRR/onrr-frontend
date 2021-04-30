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

const CONTACTS_QUERY = gql`
  {
    contacts {
      nodes {
        title(format: RENDERED)
        contacts {
          email
          firstName
          lastName
          phone
        }
      }
    }
  }
`

const Contacts = () => {
  const { loading, error, data } = useQuery(CONTACTS_QUERY)
  let contacts

  if (loading) return <Loading />
  if (error) return `Error! ${ error.message }`

  if (data) {
    // console.log('contacts data: ', data)
    contacts = data.contacts.nodes
    return (
      <Grid container spacing={2}>
        {contacts.map((contact, index) => (
          <Grid item xs={12} key={index}>
            <Card>
              <CardContent>
                <h3 key={contact.contactId}>{contact.title}</h3>
                <Typography
                  variant="body1"
                  component="p"
                  dangerouslySetInnerHTML={{__html: `${ contact.contacts.firstName } ${ contact.contacts.lastName }`}} />
                <Typography
                    variant="body1"
                    component="p"
                    dangerouslySetInnerHTML={{__html: contact.contacts.phone}} />
                <Typography
                    variant="body1"
                    component="p"
                    dangerouslySetInnerHTML={{__html: contact.contacts.email}} />
              
              </CardContent>
            </Card>
          </Grid>
          ))
        }
      </Grid>
    )
  }
}

export default Contacts