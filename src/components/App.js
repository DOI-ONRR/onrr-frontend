import React from 'react'

import { useQuery } from '@apollo/react-hooks'
import { gql } from '@apollo/client'

import {
  Route,
  Switch,
  useRouteMatch
} from 'react-router-dom'

import {
  Container
} from '@material-ui/core'

import {
  withStyles,
  createStyles
} from '@material-ui/core/styles'

import { StickyHeader } from '../components/layouts/StickyHeader'
import Header from './Header'
import Footer from './Footer'
import Home from './Home'
import Page from './Page'
import ContactUs from './templates/ContactUs'

import Loading from './Loading'

const PAGES_QUERY = gql`
  query {
    pages {
      id
      slug
      title
      content
      template
      parent {
        id
        slug
        title
      }
    }
  }
`

const DefaultAppContainer = withStyles(theme =>
  createStyles({
    root: {
      display: 'flex',
      minHeight: '100vh',
      flexDirection: 'column',
    }
  })
)(Container)

const MainContentContainer = withStyles(theme =>
  createStyles({
    root: {
      flex: 1,
      padding: 0,
      minHeight: 500,
    }
  })
)(Container)

const getPageComponent = (page) => {
  console.log('getPageComponent page: ', page)
  // this is where you map your template names to a component 
  const components = {
    'home': Home,
    'contact': ContactUs
  }
  const pageTemplate = page.template
  // check the template from the response 
  if(pageTemplate && pageTemplate !== 'default'){
    return components[pageTemplate];
  } else {
    return Page
  }
}

const App = () => {

  const { loading, error, data } = useQuery(PAGES_QUERY)
  let pages
  let { url } = useRouteMatch()

  if (loading) return <Loading />
  if (error) return `Error! ${ error.message }`

  if (data) {
    console.debug('App data: ', data)
    // get all page data to build routes
    pages = data.pages
    return (
      <DefaultAppContainer maxWidth={false} disableGutters={true}>
        <StickyHeader />
        <MainContentContainer maxWidth="false">
          <Switch>
            <Route path={`${url}/`} render={(props) => <Home pageId={1} {...props} />} exact />
            {pages.map(page => {
              // use the identifyComponent function we wrote earlier
              let Template = getPageComponent(page)
              let pageId = page.id
              let parent = page.parent && page.parent.slug
              return (
                <Route
                  key={pageId}
                  // if we have a parent, put that in front of the slug
                  path={`${parent ? '/' + parent : ''}/${page.slug}`}
                  render={(props) => <Template pageId={pageId} {...props} />}
                  exact
                />
              )
            })}
          </Switch>
        </MainContentContainer>
        <Footer />
      </DefaultAppContainer>
    )
  }
}

export default App