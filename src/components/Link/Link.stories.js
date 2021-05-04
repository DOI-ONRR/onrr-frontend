import React from 'react'

import Link from './Link'

export default {
  title: 'Link',
  component: Link,
}

const Template = (args) => <Link {...args} />

export const Primary = Template.bind({})
Primary.args = {
  href: 'https://material-ui.com/',
  children: 'A primary link',
  linkType: 'primary'
}

export const Secondary = Template.bind({})
Secondary.args = {
  href: 'https://revenuedata.doi.gov/',
  children: 'A secondary link',
  linkType: 'secondary'
}

