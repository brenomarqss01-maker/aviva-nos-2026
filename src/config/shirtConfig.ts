import type { ShirtColor, ShirtSize } from '../types/registration'

export interface ShirtOption {
  id: Exclude<ShirtColor, ''>
  label: string
  image: string
  alt: string
}

export const shirts: ShirtOption[] = [
  {
    id: 'white',
    label: 'Branca',
    image: '/assets/camiseta-branca.png',
    alt: 'Mockup da camiseta Aviva-Nos branca, frente e costas',
  },
  {
    id: 'black',
    label: 'Preta',
    image: '/assets/camiseta-preta.png',
    alt: 'Mockup da camiseta Aviva-Nos preta, frente e costas',
  },
]

export const shirtSizes: Exclude<ShirtSize, ''>[] = ['PP', 'P', 'M', 'G', 'GG', 'XG']
