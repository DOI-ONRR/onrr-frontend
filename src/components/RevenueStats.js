import React from 'react'
import PropTypes from 'prop-types'

import { ApolloClient, InMemoryCache, gql, useLazyQuery } from '@apollo/client'
import { Query } from '@apollo/react-components'

import {
  Box,
  Paper,
  Typography,
  Link as MuiLink
} from '@material-ui/core'

import {
  createStyles,
  withStyles
} from '@material-ui/core'

import Loading from './Loading'
import { formatToDollarInt } from '../js/utils'

const nrrdClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://hasura-dev.app.cloud.gov/v1/graphql',
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
})

const TOTAL_REVENUE_QUERY = gql`
  query {
    revenue_fiscal_years: period(
      distinct_on: fiscal_year, 
      where: {revenues: {revenue: {_is_null: false}, period: {period: {_eq: "Fiscal Year"}}}}, 
      order_by: {fiscal_year: asc}) {
        fiscal_year
    }

    disbursement_fiscal_years: period(
      distinct_on: fiscal_year, 
      where: {disbursements: {disbursement: {_is_null: false}, period: {period: {_eq: "Fiscal Year"}}}}, 
      order_by: {fiscal_year: asc}) {
        fiscal_year
    }
    total_yearly_fiscal_revenue(where: {year: {_eq: 2020}}) {
      sum
    }

    total_yearly_fiscal_disbursement(where: {year: {_eq: 2020}}) {
      sum
    }
    disbursement_gomesa: disbursement_source_summary(
      where: {fiscal_year: {_eq: "2020"}, source: {_eq: "GOMESA offshore"}, state_or_area: {_eq: "NF"}}, 
      order_by: {fiscal_year: asc, total: desc}
      ) {
      source
      sum: total
    }
  }
`

const DefaultHomeBlockContainer = withStyles(theme => 
  createStyles({
    root: {
      padding: theme.spacing(2),
      minHeight: 200,
      '& h4': {
        fontSize: 30,
        fontWeight: 400,
        marginTop: theme.spacing(0),
        marginBottom: theme.spacing(2)
      },
      '& a': {
        display: 'flex',
        fontSize: 16,
        color: '#1478a6',
        marginBottom: theme.spacing(1)
      }
    }
  })
)(Paper)

const RevenueStats = () => {
  let maxFiscalRevenueYear
  let maxFiscalDisbursementYear
  return (
    <Query query={TOTAL_REVENUE_QUERY} client={nrrdClient}>
      {({ error, loading, data }) => {
        if (loading) return <Loading />
        if (error) return `Error! ${ error.message }`

        if (data) {
          maxFiscalRevenueYear = data.revenue_fiscal_years[data.revenue_fiscal_years.length - 1].fiscal_year
          maxFiscalDisbursementYear = data.disbursement_fiscal_years[data.disbursement_fiscal_years.length - 1].fiscal_year

          const totalYearlyFiscalRevenue = data.total_yearly_fiscal_revenue.reduce((acc, key) => acc + key.sum, 0)
          const totalYearlyDisbursements = data.total_yearly_fiscal_disbursement.reduce((acc, key) => acc + key.sum, 0)
          const totalYearlyGoMesaDisbursements = data.disbursement_gomesa.reduce((acc, key) => acc + key.sum, 0)

          return (
            <DefaultHomeBlockContainer>
              <Typography variant="h4">Revenue Statistics</Typography>
              <Typography variant="body1">Fiscal year { maxFiscalRevenueYear } revenue: 
                {' '}<span style={{ fontWeight: 'bold' }}>{ formatToDollarInt(totalYearlyFiscalRevenue) }</span>
              </Typography>
              <Typography variant="body1">Fiscal year { maxFiscalDisbursementYear } disbursements: 
                {' '}<span style={{ fontWeight: 'bold' }}>{ formatToDollarInt(totalYearlyDisbursements) }</span>
              </Typography><MuiLink href="">Press release</MuiLink>
              <Typography variant="body1">Fiscal year { maxFiscalDisbursementYear } GOMESA disbursements: 
                {' '}<span style={{ fontWeight: 'bold' }}>{ formatToDollarInt(totalYearlyGoMesaDisbursements) }</span>
              </Typography><MuiLink href="">Press release</MuiLink>
              <MuiLink href="https://revenuedata.doi.gov/">Explore Revenue Statistics</MuiLink>
            </DefaultHomeBlockContainer>
          )
        }
      }}
    </Query>
  )
}

export default RevenueStats
