import currencyFormatter from 'currency-formatter'

export const formatToDollarInt = (value) => {
  return currencyFormatter.format(value, {
    symbol: '$',
    precision: 0,
    format: { pos: '%s%v', neg: '(%s%v)', zero: '%s%v' }
  })
}

export const resolveByStringPath = (path, obj) => {
  return path.split('.').reduce(function (prev, curr) {
    return prev ? prev[curr] : undefined
  }, obj)
}

export const groupBy = (data, group) => {
  const groups = {}

  data.map((item, index) => {
    let itemGroup = ''

    if (Array.isArray(group)) {
      group.forEach((entry, index) => {
        itemGroup += resolveByStringPath(entry, item) + '_'
      })
      itemGroup = itemGroup.slice(0, -1)
    }
    else {
      itemGroup = resolveByStringPath(group, item)
    }

    const list = groups[itemGroup]

    if (list) {
      list.push(item)
    }
    else {
      groups[itemGroup] = [item]
    }
  })

  return groups
}