export type FigureId = 'baba-yaga' | 'chort' | 'lesnik' | 'zmaj'

export interface Card {
  id: string
  figure: FigureId
}

export type Lang = 'fr' | 'uk'

export interface Player {
  id: string
  name: string
  lives: number
  hand: Card[]
  isAlive: boolean
  language: Lang
}

export interface PlayedCards {
  playerId: string
  cards: Card[]
  claimedFigure: FigureId
  cardCount: number
}

export interface ActionLog {
  type: 'play' | 'accuse' | 'lose-life' | 'eliminate' | 'round-win' | 'game-over'
  playerId: string
  message: string
  timestamp: number
}

export type GamePhase =
  | 'setup'
  | 'player-transition'
  | 'playing'
  | 'accusation'
  | 'accusation-result'
  | 'round-end'
  | 'game-over'

export interface GameState {
  players: Player[]
  currentPlayerIndex: number
  targetFigure: FigureId
  phase: GamePhase
  lastPlay: PlayedCards | null
  actions: ActionLog[]
  round: number
  accusationResult: {
    accuserId: string
    playedById: string
    wasLie: boolean
    loserId: string
    revealedCards: Card[]
  } | null
  roundWinnerId: string | null
  gameWinnerId: string | null
  aliveCount: number
}

export interface FigureInfo {
  id: FigureId
  name: string
  label: string
  color: string
  lightColor: string
  bgColor: string
  description: string
}
