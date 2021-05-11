import React from 'react'

import { useQuery } from '@apollo/react-hooks'
import { gql } from '@apollo/client'

import {
  Route,
  Switch
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

import Loading from './Loading'

const PAGES_QUERY = gql`
  {
    pages {
      nodes {
        content(format: RENDERED)
        pageId
        slug
        title(format: RENDERED)
        status
        template {
          templateName
        }
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
      marginTop: 20,
      minHeight: 500,
    }
  })
)(Container)

const getPageComponent = (page) => {
  console.log('getPageComponent page: ', page)
  // this is where you map your template names to a component 
  const components = {
    'home': Home
  }
  const pageTemplate = page.template.templateName
  // check the template from the response 
  if(pageTemplate !== 'Default' && pageTemplate){
    return components[pageTemplate];
  } else {
    return Page
  }
}

const App = () => {

  const { loading, error, data } = useQuery(PAGES_QUERY)
  let pages

  if (loading) return <Loading />
  if (error) return `Error! ${ error.message }`

  if (data) {
    // get all page data to build routes
    pages = data.pages.nodes
    return (
      <DefaultAppContainer maxWidth={false} disableGutters={true}>
        <StickyHeader />
        <MainContentContainer maxWidth="lg">
          <Switch>
            <Route path="/" render={(props) => <Home pageId={79} {...props} />} exact />
            {pages.map(page => {
              // use the identifyComponent function we wrote earlier
              let Template = getPageComponent(page)
              let pageId = page.pageId
              let parent = page.parent && page.parent.slug
              return(
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