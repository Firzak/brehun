import { useGameStore } from '../store/gameStore'
import { FigureIllustration } from './FigureIllustrations'
import { getFigureInfo } from '../game/constants'

export function PlayerTransition() {
  const { gameState, transitionToPlaying } = useGameStore()

  if (!gameState) return null

  const currentPlayer = gameState.players[gameState.currentPlayerIndex]
  const hasPendingPlay = gameState.lastPlay !== null
  const prevPlayPlayer = hasPendingPlay
    ? gameState.players.find((p) => p.id === gameState.lastPlay!.playerId)
    : null

  const targetInfo = getFigureInfo(gameState.targetFigure)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="absolute inset-0 bg-ink/90 backdrop-blur-md" />
      <div className="relative bg-gradient-to-b from-wood to-ink border border-gold-dark/30 rounded-xl p-6 sm:p-10 w-full max-w-sm mx-auto shadow-2xl space-y-6 sm:space-y-8 text-center">
        <div className="space-y-3 sm:space-y-4">
          <div className="w-14 h-14 sm:w-20 sm:h-20 mx-auto rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center animate-float">
            <span className="text-gold text-2xl sm:text-4xl">🃏</span>
          </div>

          <h2 className="text-gold text-lg sm:text-2xl font-bold leading-tight">
            {hasPendingPlay
              ? `${currentPlayer.name}, à toi de juger !`
              : `${currentPlayer.name}, c'est ton tour !`
            }
          </h2>

          {hasPendingPlay && prevPlayPlayer && (
            <p className="text-gold/70 text-xs sm:text-sm">
              <span className="text-ember font-semibold">{prevPlayPlayer.name}</span> a posé{' '}
              <span className="text-gold font-semibold">{gameState.lastPlay!.cardCount}</span> carte(s)
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <p className="text-gold/50 text-[10px] sm:text-xs uppercase tracking-wider">Figure cible</p>
          <div className="flex items-center justify-center gap-2">
            <FigureIllustration figure={targetInfo.id} size={24} />
            <span className="text-gold font-bold text-base sm:text-lg" style={{ color: targetInfo.lightColor }}>
              {targetInfo.name}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-gold/60 text-xs sm:text-sm italic leading-relaxed">
            {hasPendingPlay
              ? `Tu dois décider si ${prevPlayPlayer?.name} dit la vérité ou ment.`
              : `Passe l'appareil à ${currentPlayer.name} puis appuie sur Prêt.`
            }
          </p>

          <button
            type="button"
            onClick={transitionToPlaying}
            className="w-full py-4 sm:py-5 rounded-lg border border-gold/40 bg-gradient-to-r from-gold/20 to-ember/20 text-gold font-bold text-base sm:text-lg hover:from-gold/30 hover:to-ember/30 transition-all duration-200 active:scale-95 animate-pulse-glow"
          >
            Prêt
          </button>
        </div>

        <p className="text-gold/30 text-[10px] sm:text-xs">
          Passe l'appareil au joueur suivant avant d'appuyer sur Prêt
        </p>
      </div>
    </div>
  )
}
