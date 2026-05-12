import type { GameState } from './types'

const STORAGE_KEY = 'brehun-game-state'
const STATS_KEY = 'brehun-stats'

interface GameStats {
  gamesPlayed: number
  wins: Record<string, number>
  totalRounds: number
}

export function saveGameState(state: GameState): void {
  try {
    const serialized = JSON.stringify(state)
    localStorage.setItem(STORAGE_KEY, serialized)
  } catch {
    /* localStorage might be full */
  }
}

export function loadGameState(): GameState | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return null
    return JSON.parse(data) as GameState
  } catch {
    return null
  }
}

export function clearGameState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* noop */
  }
}

export function loadStats(): GameStats {
  try {
    const data = localStorage.getItem(STATS_KEY)
    if (!data) {
      return { gamesPlayed: 0, wins: {}, totalRounds: 0 }
    }
    return JSON.parse(data) as GameStats
  } catch {
    return { gamesPlayed: 0, wins: {}, totalRounds: 0 }
  }
}

export function saveStats(stats: GameStats): void {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats))
  } catch {
    /* noop */
  }
}

export function recordGameWin(winnerName: string, totalRounds: number): void {
  const stats = loadStats()
  stats.gamesPlayed++
  stats.totalRounds += totalRounds
  stats.wins[winnerName] = (stats.wins[winnerName] ?? 0) + 1
  saveStats(stats)
}
