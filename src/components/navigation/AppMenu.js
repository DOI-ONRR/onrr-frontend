import React from 'react'

import { useQuery } from '@apollo/react-hooks'
import { gql } from '@apollo/client'

import { Link as RouterLink } from 'react-router-dom'

import { 
  Box,
  // Link as RouterLink
} from '@material-ui/core'
import {
  withStyles,
  createStyles
} from '@material-ui/core/styles'

import PhoneIcon from '@material-ui/icons/Phone'
import EventIcon from '@material-ui/icons/Event'
import BarChartIcon from '@material-ui/icons/BarChart'

const APP_MENU_QUERY = gql`
  query {
    menu_items {
      id
      menu_label
      custom_url
      menu
      link_to_page {
        id
        slug
        parent {
          id
          slug
        }
      }
      parent {
        id
        custom_url
        link_to_page {
          id
          slug
        }
      }
    }
  }
`

const NavIconLinkContainer = withStyles(theme =>
  createStyles({
    root: {
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginRight: 30,
      '& > a': {
        color: theme.palette.common.white,
        textDecoration: 'none'
      }
    }
  })
)(Box)


const AppMenu = () => {
  const { loading, error, data } = useQuery(APP_MENU_QUERY)
  let items

  if (loading) return ''
  if (error) return `Error! ${ error.message }`
  if (data) {
    items = data.menu_items.filter(item => item.menu === 'header')
    return (
      <nav>
        {
          items.map(item => {
            let parent = item.link_to_page !== null && item.link_to_page.parent.slug
            return (
              <NavIconLinkContainer>
                { item.menu_label === 'Contact Us' && <PhoneIcon /> }
                { item.menu_label === 'Events' && <EventIcon /> }
                { item.menu_label === 'Revenue Data' && <BarChartIcon /> }
                { item.custom_url !== null && <a href={item.custom_url}>{item.menu_label}</a> }
                { item.link_to_page !== null && <RouterLink to={`${ parent ? '/' + parent : ''}/${ item.link_to_page.slug }`}>{item.menu_label}</RouterLink> }
              </NavIconLinkContainer>
            )
          })
        }
      </nav>
    )
  }
}

export default AppMenu

