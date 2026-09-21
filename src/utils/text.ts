export const normalizeText = (value: string) => value.trim().replace(/\s+/g, ' ')

export const yesNoLabel = (value: 'yes' | 'no' | '') => {
  if (value === 'yes') return 'Sim'
  if (value === 'no') return 'Não'
  return 'Não informado'
}
