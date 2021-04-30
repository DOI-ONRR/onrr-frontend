import React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import {
  BrowserRouter as Router
} from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import App from './components/App'
import theme from './theme'

const cache = new InMemoryCache()

const client = new ApolloClient({
  cache: cache,
  uri: 'https://onrr-cms-dev.app.cloud.gov/graphql',
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
})

render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('root'),
)
