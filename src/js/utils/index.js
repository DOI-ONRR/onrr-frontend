import currencyFormatter from 'currency-formatter'

export const formatToDollarInt = (value) => {
  return currencyFormatter.format(value, {
    symbol: '$',
    precision: 0,
    format: { pos: '%s%v', neg: '(%s%v)', zero: '%s%v' }
  })
}