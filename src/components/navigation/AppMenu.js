import React from 'react'

import { Link } from 'react-router-dom'

const AppMenu = () => {
  return (
    <nav>
      <Link href="/contact-us" style={{ color: 'white', marginRight: 25, textDecoration: 'none' }}>Contact us</Link>
      <Link href="/events" style={{ color: 'white', marginRight: 25, textDecoration: 'none' }}>Events</Link>
      <Link href="http://revenuedata.doi.gov/" style={{ color: 'white', marginRight: 25, textDecoration: 'none' }}>Revenue Data</Link>
    </nav>
  )
}

export default AppMenu

