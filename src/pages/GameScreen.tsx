import { useState, useRef, useEffect } from 'react'
import { useGameStore } from '../store/gameStore'
import { Hud } from '../components/Hud'
import { Card } from '../components/Card'
import { ActionHistory } from '../components/ActionHistory'
import { PlayerTransition } from '../components/PlayerTransition'
import { AccusationModal } from '../components/AccusationModal'
import { AccusationResult } from '../components/AccusationResult'
import { RoundEnd } from '../components/RoundEnd'
import { VictoryScreen } from '../components/VictoryScreen'
import { getFigureInfo } from '../game/constants'

export function GameScreen() {
  const { gameState, playCards } = useGameStore()
  const [selectedCards, setSelectedCards] = useState<string[]>([])
  const handRef = useRef<HTMLDivElement>(null)

  const currentPlayer = gameState?.players[gameState.currentPlayerIndex]
  const isPlaying = gameState?.phase === 'playing'
  const isCurrentPlayerAlive = currentPlayer?.isAlive ?? false

  const targetFigureInfo = gameState ? getFigureInfo(gameState.targetFigure) : null

  useEffect(() => {
    setSelectedCards([])
  }, [gameState?.currentPlayerIndex, gameState?.phase])

  const handleToggleCard = (cardId: string) => {
    if (!isPlaying || !isCurrentPlayerAlive) return
    setSelectedCards((prev) =>
      prev.includes(cardId) ? prev.filter((id) => id !== cardId) : [...prev, cardId]
    )
  }

  const handlePlayCards = () => {
    if (!isPlaying || !isCurrentPlayerAlive || selectedCards.length === 0) return
    playCards(selectedCards)
  }

  if (!gameState) return null

  const showTransition = gameState.phase === 'player-transition'
  const showAccusation = gameState.phase === 'accusation'
  const showAccusationResult = gameState.phase === 'accusation-result'
  const showRoundEnd = gameState.phase === 'round-end'
  const showGameOver = gameState.phase === 'game-over'

  return (
    <div className="min-h-screen h-dvh bg-ink flex flex-col">
      {showTransition && <PlayerTransition />}
      {showAccusation && <AccusationModal />}
      {showAccusationResult && <AccusationResult />}
      {showRoundEnd && <RoundEnd />}
      {showGameOver && <VictoryScreen />}

      <div className="flex-1 flex flex-col w-full gap-0">
        <Hud gameState={gameState} currentPlayerId={currentPlayer?.id} />

        {isPlaying && isCurrentPlayerAlive && (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 flex flex-col items-center justify-center px-2 py-4 gap-3">
              <div className="text-center">
                <p className="text-gold/50 text-xs">
                  Choisis les cartes à poser
                </p>
                <p className="text-gold/70 text-xs">
                  Annonce : <span className="text-gold font-semibold">{targetFigureInfo?.name}</span>
                </p>
              </div>

              <div
                ref={handRef}
                className="flex gap-2 sm:gap-3 overflow-x-auto py-2 px-4 w-full snap-x snap-mandatory scrollbar-none"
                style={{ scrollSnapType: 'x mandatory' }}
              >
                {currentPlayer!.hand.map((card) => (
                  <div key={card.id} className="snap-start shrink-0">
                    <Card
                      card={card}
                      selected={selectedCards.includes(card.id)}
                      onClick={() => handleToggleCard(card.id)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="sticky bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-ink via-ink/95 to-transparent">
              <div className="flex gap-2 max-w-md mx-auto">
                <button
                  type="button"
                  onClick={() => setSelectedCards(currentPlayer!.hand.map((c) => c.id))}
                  className="flex-1 px-4 py-3 rounded-lg border border-gold-dark/20 text-gold/60 text-sm font-bold hover:bg-parchment/10 transition-colors active:scale-95"
                >
                  Tous
                </button>
                <button
                  type="button"
                  onClick={handlePlayCards}
                  disabled={selectedCards.length === 0}
                  className={`
                    flex-[2] px-4 py-3 rounded-lg text-sm font-bold transition-all duration-150 active:scale-95
                    ${selectedCards.length > 0
                      ? 'border border-gold/40 bg-gold/20 text-gold shadow-[0_0_15px_rgba(212,165,116,0.2)]'
                      : 'border border-gold-dark/20 bg-parchment/10 text-gold/40'
                    }
                  `}
                >
                  {selectedCards.length > 0
                    ? `Poser (${selectedCards.length})`
                    : 'Poser'
                  }
                </button>
              </div>
            </div>
          </div>
        )}

        {isPlaying && !isCurrentPlayerAlive && (
          <div className="flex-1 flex items-center justify-center p-8">
            <p className="text-gold/30 text-sm text-center">
              Tu as été éliminé.<br />Attends la fin de la partie.
            </p>
          </div>
        )}

        {gameState.phase === 'setup' && (
          <div className="flex-1 flex items-center justify-center p-8">
            <p className="text-gold/30 text-sm">Préparation...</p>
          </div>
        )}

        <ActionHistory />
      </div>
    </div>
  )
}
