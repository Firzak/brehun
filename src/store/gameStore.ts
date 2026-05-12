import { create } from 'zustand'
import type { GameState } from '../game/types'
import {
  createInitialState,
  playCards as enginePlayCards,
  accuse as engineAccuse,
  believe as engineBelieve,
  resolveAccusation as engineResolveAccusation,
  startNewRound as engineStartNewRound,
  startAccusation as engineStartAccusation,
} from '../game/engine'
import { saveGameState, clearGameState, recordGameWin } from '../game/storage'

interface AppScreen {
  type: 'home' | 'game'
}

interface GameStore {
  appScreen: AppScreen
  gameState: GameState | null

  setAppScreen: (screen: AppScreen) => void
  startGame: (playerNames: string[]) => void
  playCards: (cardIds: string[]) => void
  accuse: () => void
  believe: () => void
  resolveAccusation: () => void
  startNewRound: () => void
  transitionToPlaying: () => void
  transitionToAccusation: () => void
  resetGame: () => void
}

export const useGameStore = create<GameStore>((set, get) => ({
  appScreen: { type: 'home' },
  gameState: null,

  setAppScreen: (screen) => set({ appScreen: screen }),

  startGame: (playerNames) => {
    const state = createInitialState(playerNames)
    saveGameState(state)
    set({ appScreen: { type: 'game' }, gameState: state })
  },

  playCards: (cardIds) => {
    const { gameState } = get()
    if (!gameState) return
    const newState = enginePlayCards(gameState, cardIds)
    saveGameState(newState)
    set({ gameState: newState })
  },

  accuse: () => {
    const { gameState } = get()
    if (!gameState) return
    const newState = engineAccuse(gameState)
    saveGameState(newState)
    set({ gameState: newState })
  },

  believe: () => {
    const { gameState } = get()
    if (!gameState) return
    const newState = engineBelieve(gameState)
    saveGameState(newState)
    set({ gameState: newState })
  },

  resolveAccusation: () => {
    const { gameState } = get()
    if (!gameState) return
    const newState = engineResolveAccusation(gameState)
    saveGameState(newState)
    set({ gameState: newState })
  },

  startNewRound: () => {
    const { gameState } = get()
    if (!gameState) return
    const newState = engineStartNewRound(gameState)
    saveGameState(newState)
    set({ gameState: newState })
  },

  transitionToPlaying: () => {
    const { gameState } = get()
    if (!gameState) return
    const hasLastPlay = gameState.lastPlay !== null
    const newState: GameState = {
      ...gameState,
      phase: hasLastPlay ? 'accusation' : 'playing',
    }
    saveGameState(newState)
    set({ gameState: newState })
  },

  transitionToAccusation: () => {
    const { gameState } = get()
    if (!gameState) return
    const newState = engineStartAccusation(gameState)
    saveGameState(newState)
    set({ gameState: newState })
  },

  resetGame: () => {
    clearGameState()
    set({
      appScreen: { type: 'home' },
      gameState: null,
    })
  },
}))
