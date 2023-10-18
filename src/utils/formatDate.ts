import moment from 'moment'

export function formatDate(data: string): string {
  const dataFormatada: string = moment(data).format('DD/MM/YYYY')
  return dataFormatada
}
