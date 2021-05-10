import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { gql } from '@apollo/client'

const MAIN_MENU_QUERY = gql`
  {
    menus(where: {id: 2}) {
      nodes {
        menuItems {
          nodes {
            label
            menuItemId
            path
            order
            target
          }
        }
      }
    }
  }
`

const MainMenu = ({ location }) => {
  const { loading, error, data } = useQuery(MAIN_MENU_QUERY)
  console.log('MainMenu data: ', data)
  let items

  if (loading) return ''
  if (error) return `Error! ${ error.message }`
  if (data) {
    items = data.menus.nodes[0].menuItems.nodes
    return (
      <nav>
      {items.map((item, index) => (
        <Link key={index} 
          to={`${item.path}`}
          style={{ color: 'white', marginRight: 25, textDecoration: (location.pathname === item.path) ? 'none' : 'none' }}>
          {item.label}
        </Link>
      ))}
      </nav>
    )
  }
}

export default MainMenu
