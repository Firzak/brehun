import { useGameStore } from '../store/gameStore'
import { FigureIllustration } from './FigureIllustrations'
import { getFigureInfo, FIGURES } from '../game/constants'
import type { FigureId } from '../game/types'

export function RoundEnd() {
  const { gameState, startNewRound } = useGameStore()

  if (!gameState?.roundWinnerId) return null

  const winner = gameState.players.find((p) => p.id === gameState.roundWinnerId)
  if (!winner) return null

  const nextTargetFigure = getFigureInfo(pickDifferentFigure(gameState.targetFigure))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="absolute inset-0 bg-ink/85 backdrop-blur-sm" />
      <div className="relative bg-gradient-to-b from-wood via-parchment/20 to-ink border border-gold/30 rounded-xl p-6 sm:p-10 w-full max-w-sm mx-auto shadow-2xl space-y-5 sm:space-y-6 text-center">
        <div className="space-y-2">
          <div className="w-14 h-14 sm:w-20 sm:h-20 mx-auto rounded-full bg-gold/15 border-2 border-gold/40 flex items-center justify-center">
            <span className="text-gold text-2xl sm:text-3xl">👑</span>
          </div>

          <h2 className="text-gold text-lg sm:text-2xl font-bold">Manche {gameState.round}</h2>
        </div>

        <div className="space-y-1">
          <p className="text-gold/50 text-xs">Vainqueur</p>
          <p className="text-gold text-lg sm:text-xl font-bold">{winner.name}</p>
        </div>

        <div className="space-y-1.5">
          <p className="text-gold/50 text-[10px] uppercase tracking-wider">Prochaine cible</p>
          <div className="flex items-center justify-center gap-2">
            <FigureIllustration figure={nextTargetFigure.id} size={22} />
            <span className="text-gold font-bold text-sm sm:text-base" style={{ color: nextTargetFigure.lightColor }}>
              {nextTargetFigure.name}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-1.5">
          {gameState.players.filter((p) => p.isAlive).map((p) => (
            <div key={p.id} className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-parchment/30 text-xs">
              <span className="text-gold/60">{p.name}</span>
              <span className="text-gold/40">({p.lives}♥)</span>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={startNewRound}
          className="w-full py-4 sm:py-5 rounded-lg border border-gold/40 bg-gradient-to-r from-gold/20 to-ember/20 text-gold font-bold text-sm sm:text-lg hover:from-gold/30 hover:to-ember/30 transition-all duration-200 active:scale-95 animate-pulse-glow"
        >
          Nouvelle Manche
        </button>
      </div>
    </div>
  )
}

function pickDifferentFigure(current: FigureId): FigureId {
  const others = FIGURES.filter((f) => f.id !== current)
  return others[Math.floor(Math.random() * others.length)].id
}
