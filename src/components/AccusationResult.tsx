import { useGameStore } from '../store/gameStore'
import { getFigureInfo } from '../game/constants'
import { FigureIllustration } from './FigureIllustrations'

export function AccusationResult() {
  const { gameState, resolveAccusation } = useGameStore()

  if (!gameState?.accusationResult) return null

  const { accuserId, wasLie, loserId, revealedCards } = gameState.accusationResult
  const accuser = gameState.players.find((p) => p.id === accuserId)
  const loser = gameState.players.find((p) => p.id === loserId)
  const targetFigureInfo = getFigureInfo(gameState.targetFigure)

  if (!accuser || !loser) return null

  const isLoserEliminated = !loser.isAlive

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="absolute inset-0 bg-ink/85 backdrop-blur-sm" />
      <div className="relative bg-gradient-to-b from-wood to-ink border border-gold-dark/30 rounded-xl p-5 sm:p-8 w-full max-w-sm mx-auto shadow-2xl space-y-5 sm:space-y-6">
        <div className="text-center space-y-1.5">
          <h2 className={`text-lg sm:text-xl font-bold ${wasLie ? 'text-blood' : 'text-ember'}`}>
            {wasLie ? 'MENTEUR !' : 'C\'ÉTAIT LA VÉRITÉ !'}
          </h2>
          <p className="text-gold/70 text-xs sm:text-sm">
            {wasLie
              ? `${loser.name} a menti et perd 1 vie`
              : `${accuser.name} a accusé à tort et perd 1 vie`
            }
          </p>
        </div>

        <div className="flex items-center justify-center gap-2">
          <span className="text-gold/50 text-[10px] uppercase tracking-wider">{targetFigureInfo.name}</span>
          <FigureIllustration figure={gameState.targetFigure} size={20} />
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {revealedCards.map((card) => {
            const isMatch = card.figure === gameState.targetFigure
            return (
              <div
                key={card.id}
                className={`
                  relative w-[72px] h-[101px] sm:w-[80px] sm:h-[112px] rounded-lg overflow-hidden
                  ring-2 transition-all duration-300
                  ${isMatch ? 'ring-green-600/70' : 'ring-blood/70'}
                `}
              >
                <img
                  src={`${import.meta.env.BASE_URL}images/figures/${card.figure}.png`}
                  alt={card.figure}
                  className="w-full h-full object-cover"
                />
                <div
                  className={`
                    absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold
                    ${isMatch ? 'bg-green-700/80 text-white' : 'bg-blood/80 text-white'}
                  `}
                >
                  {isMatch ? '✓' : '✗'}
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center space-y-1">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm ${wasLie ? 'bg-blood/15' : 'bg-ember/15'}`}>
            <span className={`font-bold ${wasLie ? 'text-blood' : 'text-ember'}`}>
              {loser.name}
            </span>
            <span className="text-gold/60">perd 1 vie</span>
            <span className="text-gold/40">({loser.lives} ♥)</span>
          </div>
          {isLoserEliminated && (
            <p className="text-blood font-bold text-base sm:text-lg animate-pulse">ÉLIMINÉ !</p>
          )}
        </div>

        <button
          type="button"
          onClick={resolveAccusation}
          className="w-full py-3.5 sm:py-3 rounded-lg border border-gold/30 bg-gold/10 text-gold font-bold text-sm hover:bg-gold/20 transition-all duration-200 active:scale-95"
        >
          Continuer
        </button>
      </div>
    </div>
  )
}
