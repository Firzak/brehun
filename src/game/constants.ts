import type { FigureInfo, FigureId } from './types'

export const INITIAL_LIVES = 3
export const CARDS_PER_FIGURE = 13
export const TOTAL_CARDS = 52
export const MIN_PLAYERS = 2
export const MAX_PLAYERS = 6

export const FIGURES: FigureInfo[] = [
  {
    id: 'baba-yaga',
    name: 'Baba Yaga',
    label: 'Баба Яга',
    color: '#1a4a1a',
    lightColor: '#2d8a2d',
    bgColor: '#0d1f0d',
    description: 'La sorcière de la forêt, vivant dans une isba sur pattes de poulet.',
  },
  {
    id: 'chort',
    name: 'Chort',
    label: 'Чорт',
    color: '#6b0000',
    lightColor: '#aa0000',
    bgColor: '#1a0000',
    description: 'Le démon malicieux des enfers slaves.',
  },
  {
    id: 'lesnik',
    name: 'Lesnik',
    label: 'Лісовик',
    color: '#3d2b1f',
    lightColor: '#6b4c3b',
    bgColor: '#14100a',
    description: 'L\'esprit de la forêt, gardien des arbres et des animaux.',
  },
  {
    id: 'zmaj',
    name: 'Zmaj',
    label: 'Змій',
    color: '#3a0a4e',
    lightColor: '#6b1a8a',
    bgColor: '#120514',
    description: 'Le dragon ukrainien, cracheur de feu et gardien de trésors.',
  },
]

export function getFigureInfo(id: FigureId): FigureInfo {
  const info = FIGURES.find((f) => f.id === id)
  if (!info) throw new Error(`Figure ${id} not found`)
  return info
}

export const PLAYER_COLORS = [
  { dot: '#d4a574', tag: 'golden', hex: 'rgba(212,165,116,' },
  { dot: '#cc5555', tag: 'red',    hex: 'rgba(204,85,85,' },
  { dot: '#55cc88', tag: 'green',  hex: 'rgba(85,204,136,' },
  { dot: '#5588cc', tag: 'blue',   hex: 'rgba(85,136,204,' },
  { dot: '#aa66cc', tag: 'purple', hex: 'rgba(170,102,204,' },
  { dot: '#dd8844', tag: 'orange', hex: 'rgba(221,136,68,' },
]

export function getPlayerColor(index: number) {
  return PLAYER_COLORS[index % PLAYER_COLORS.length]
}

export const COLORS = {
  bg: '#0a0a0a',
  wood: '#1a0f0a',
  parchment: '#2a1f14',
  gold: '#d4a574',
  goldDark: '#b8860b',
  ember: '#cc5500',
  blood: '#8b0000',
  text: '#e8d5b0',
  muted: '#7a6a5a',
}
