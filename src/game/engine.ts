import type { Card, Player, GameState, PlayedCards, ActionLog, FigureId, GamePhase, Lang } from './types'
import { FIGURES, INITIAL_LIVES, CARDS_PER_FIGURE } from './constants'

let nextPlayerId = 0
let nextCardId = 0

function resetIds(): void {
  nextPlayerId = 0
  nextCardId = 0
}

export function generatePlayerId(): string {
  return `player-${nextPlayerId++}`
}

export function createDeck(): Card[] {
  const deck: Card[] = []
  for (const figure of FIGURES) {
    for (let i = 0; i < CARDS_PER_FIGURE; i++) {
      deck.push({ id: `card-${nextCardId++}`, figure: figure.id })
    }
  }
  return deck
}

export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const CARDS_PER_PLAYER = 5

export function dealCards(deck: Card[], numPlayers: number): Card[][] {
  const hands: Card[][] = Array.from({ length: numPlayers }, () => [])
  const totalToDeal = numPlayers * CARDS_PER_PLAYER
  for (let i = 0; i < totalToDeal; i++) {
    hands[i % numPlayers].push(deck[i])
  }
  return hands
}

export function pickRandomFigure(): FigureId {
  return FIGURES[Math.floor(Math.random() * FIGURES.length)].id
}

export function createInitialState(playerNames: string[], playerLangs: Lang[]): GameState {
  resetIds()

  const deck = shuffleDeck(createDeck())
  const hands = dealCards(deck, playerNames.length)

  const players: Player[] = playerNames.map((name, i) => ({
    id: generatePlayerId(),
    name,
    lives: INITIAL_LIVES,
    hand: hands[i],
    isAlive: true,
    language: playerLangs[i] ?? 'fr',
  }))

  const targetFigure = pickRandomFigure()
  const firstAliveIndex = 0

  return {
    players,
    currentPlayerIndex: firstAliveIndex,
    targetFigure,
    phase: 'player-transition',
    lastPlay: null,
    actions: [{
      type: 'play',
      playerId: 'system',
      message: `Partie commencée ! Figure cible : ${getFigureLabel(targetFigure)}`,
      timestamp: Date.now(),
    }],
    round: 1,
    accusationResult: null,
    roundWinnerId: null,
    gameWinnerId: null,
    aliveCount: players.length,
  }
}

function getFigureLabel(id: FigureId): string {
  return FIGURES.find((f) => f.id === id)?.name ?? id
}

export function getAlivePlayers(players: Player[]): Player[] {
  return players.filter((p) => p.isAlive)
}

export function getNextAliveIndex(players: Player[], currentIndex: number): number {
  const alive = getAlivePlayers(players)
  if (alive.length <= 1) return currentIndex

  let next = (currentIndex + 1) % players.length
  let attempts = 0
  while (!players[next].isAlive && attempts < players.length) {
    next = (next + 1) % players.length
    attempts++
  }
  return next
}

export function getPrevAliveIndex(players: Player[], currentIndex: number): number {
  const alive = getAlivePlayers(players)
  if (alive.length <= 1) return currentIndex

  let prev = (currentIndex - 1 + players.length) % players.length
  let attempts = 0
  while (!players[prev].isAlive && attempts < players.length) {
    prev = (prev - 1 + players.length) % players.length
    attempts++
  }
  return prev
}

export function addAction(state: GameState, type: ActionLog['type'], playerId: string, message: string): ActionLog {
  return { type, playerId, message, timestamp: Date.now() }
}

export function playCards(state: GameState, cardIds: string[]): GameState {
  const player = state.players[state.currentPlayerIndex]
  const playedCardsData = player.hand.filter((c) => cardIds.includes(c.id))
  const remainingHand = player.hand.filter((c) => !cardIds.includes(c.id))

  const updatedPlayers = state.players.map((p) =>
    p.id === player.id ? { ...p, hand: remainingHand } : p
  )

  const playedCards: PlayedCards = {
    playerId: player.id,
    cards: playedCardsData,
    claimedFigure: state.targetFigure,
    cardCount: playedCardsData.length,
  }

  const newActions = [
    ...state.actions,
    addAction(state, 'play', player.id, `${player.name} a posé ${playedCardsData.length} carte(s) face cachée`),
  ]

  const nextIndex = getNextAliveIndex(updatedPlayers, state.currentPlayerIndex)

  return {
    ...state,
    players: updatedPlayers,
    lastPlay: playedCards,
    phase: 'player-transition',
    currentPlayerIndex: nextIndex,
    actions: newActions,
    roundWinnerId: null,
    accusationResult: null,
  }
}

export function startAccusation(state: GameState): GameState {
  return {
    ...state,
    phase: 'accusation',
  }
}

export function accuse(state: GameState): GameState {
  if (!state.lastPlay) return state

  const prevPlayerIndex = getPrevAliveIndex(state.players, state.currentPlayerIndex)
  const prevPlayer = state.players[prevPlayerIndex]
  const accuser = state.players[state.currentPlayerIndex]

  const isLie = state.lastPlay.cards.some((c) => c.figure !== state.targetFigure)

  let loserId: string
  if (isLie) {
    loserId = prevPlayer.id
  } else {
    loserId = accuser.id
  }

  const updatedPlayers = state.players.map((p) => {
    if (p.id !== loserId) return p
    const newLives = p.lives - 1
    return {
      ...p,
      lives: newLives,
      isAlive: newLives > 0,
    }
  })

  const newActions = [...state.actions]
  if (isLie) {
    newActions.push(addAction(state, 'accuse', accuser.id, `${accuser.name} accuse ${prevPlayer.name} de mentir !`))
    newActions.push(addAction(state, 'lose-life', prevPlayer.id, `${prevPlayer.name} a menti et perd 1 vie !`))
  } else {
    newActions.push(addAction(state, 'accuse', accuser.id, `${accuser.name} accuse ${prevPlayer.name} de mentir !`))
    newActions.push(addAction(state, 'lose-life', accuser.id, `${accuser.name} a accusé à tort et perd 1 vie !`))
  }

  const loser = updatedPlayers.find((p) => p.id === loserId)
  if (loser && !loser.isAlive) {
    newActions.push(addAction(state, 'eliminate', loserId, `${loser.name} est éliminé !`))
  }

  const aliveCount = getAlivePlayers(updatedPlayers).length
  const gameOver = aliveCount <= 1

  let nextPhase: GamePhase
  let gameWinnerId: string | null = null

  if (gameOver) {
    const winner = getAlivePlayers(updatedPlayers)[0]
    gameWinnerId = winner?.id ?? null
    nextPhase = 'game-over'
    newActions.push(addAction(state, 'game-over', gameWinnerId ?? '', `${winner?.name} remporte la partie !`))
  } else {
    const nextIndex = isLie
      ? state.currentPlayerIndex
      : getNextAliveIndex(updatedPlayers, state.currentPlayerIndex)
    return {
      ...state,
      players: updatedPlayers,
      phase: 'accusation-result',
      accusationResult: {
        accuserId: accuser.id,
        playedById: prevPlayer.id,
        wasLie: isLie,
        loserId,
        revealedCards: [...state.lastPlay.cards],
      },
      lastPlay: null,
      currentPlayerIndex: nextIndex,
      actions: newActions,
      aliveCount,
    }
  }

  return {
    ...state,
    players: updatedPlayers,
    phase: nextPhase,
    accusationResult: {
      accuserId: accuser.id,
      playedById: prevPlayer.id,
      wasLie: isLie,
      loserId,
      revealedCards: [...state.lastPlay.cards],
    },
    lastPlay: null,
    actions: newActions,
    aliveCount,
    gameWinnerId,
  }
}

export function resolveAccusation(state: GameState): GameState {
  const { players, currentPlayerIndex, aliveCount } = state

  if (aliveCount <= 1) {
    const winner = getAlivePlayers(players)[0]
    return {
      ...state,
      phase: 'game-over',
      gameWinnerId: winner?.id ?? null,
      accusationResult: null,
    }
  }

  const playedBy = state.accusationResult
    ? players.find((p) => p.id === state.accusationResult!.playedById)
    : null

  const hasEmptyHand = playedBy ? playedBy.hand.length === 0 && playedBy.isAlive : false

  const newActions = [...state.actions]

  if (hasEmptyHand) {
    newActions.push(addAction(state, 'round-win', playedBy!.id, `${playedBy!.name} a vidé sa main et remporte la manche !`))
  }

  return {
    ...state,
    phase: hasEmptyHand ? 'round-end' : 'player-transition',
    accusationResult: null,
    actions: newActions,
    roundWinnerId: hasEmptyHand ? playedBy!.id : null,
  }
}

export function believe(state: GameState): GameState {
  if (!state.lastPlay) return state

  const playedBy = state.players.find((p) => p.id === state.lastPlay!.playerId)
  const hasEmptyHand = playedBy ? playedBy.hand.length === 0 : false

  const newActions = [
    ...state.actions,
    addAction(state, 'play', state.players[state.currentPlayerIndex].id, `${state.players[state.currentPlayerIndex].name} croit ${playedBy?.name}`),
  ]

  if (hasEmptyHand) {
    newActions.push(addAction(state, 'round-win', playedBy!.id, `${playedBy!.name} a vidé sa main et remporte la manche !`))
  }

  return {
    ...state,
    lastPlay: null,
    phase: hasEmptyHand ? 'round-end' : 'player-transition',
    accusationResult: null,
    actions: newActions,
    roundWinnerId: hasEmptyHand ? playedBy!.id : null,
  }
}

export function startNewRound(state: GameState): GameState {
  const deck = shuffleDeck(createDeck())
  const alivePlayers = getAlivePlayers(state.players)
  const hands = dealCards(deck, alivePlayers.length)

  let handIndex = 0
  const updatedPlayers = state.players.map((p) => {
    if (!p.isAlive) return p
    const hand = hands[handIndex++]
    return { ...p, hand }
  })

  const targetFigure = pickRandomFigure()

  return {
    ...state,
    players: updatedPlayers,
    targetFigure,
    phase: 'player-transition',
    lastPlay: null,
    actions: [
      ...state.actions,
      addAction(state, 'play', 'system', `Manche ${state.round} terminée. Nouvelle manche ! Figure cible : ${getFigureLabel(targetFigure)}`),
    ],
    round: state.round + 1,
    accusationResult: null,
    roundWinnerId: null,
    currentPlayerIndex: getNextAliveIndex(updatedPlayers, -1),
  }
}

export function isLastPlayerThePlayedPlayer(state: GameState, playerId: string): boolean {
  return state.lastPlay?.playerId === playerId
}
