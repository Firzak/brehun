import { useEffect } from 'react'
import { useGameStore } from '../store/gameStore'
import { getFigureInfo } from '../game/constants'
import { useTranslation } from '../hooks/useTranslation'
import { audio } from '../game/audio'

export function VictoryScreen() {
  const { gameState, resetGame } = useGameStore()
  const { t } = useTranslation()

  useEffect(() => { audio.victory() }, [])

  if (!gameState?.gameWinnerId) return null

  const winner = gameState.players.find((p) => p.id === gameState.gameWinnerId)
  if (!winner) return null

  const sortedPlayers = [...gameState.players].sort((a, b) => {
    if (a.isAlive && !b.isAlive) return -1
    if (!a.isAlive && b.isAlive) return 1
    return b.lives - a.lives
  })

  const targetFigure = getFigureInfo(gameState.targetFigure)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="absolute inset-0 bg-ink/90 backdrop-blur-md" />
      <div className="relative bg-gradient-to-b from-wood via-parchment/20 to-ink border-2 border-gold/40 rounded-xl p-6 sm:p-10 w-full max-w-sm mx-auto shadow-2xl space-y-5 sm:space-y-6 text-center">

        <div className="space-y-2">
          <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto rounded-full bg-gold/20 border-2 border-gold/50 flex items-center justify-center animate-float">
            <span className="text-3xl sm:text-5xl">🏆</span>
          </div>

          <h1 className="text-gold text-2xl sm:text-3xl font-bold">{t('victory.title')}</h1>
          <p className="text-gold/50 text-xs">{t('victory.game_over')}</p>
        </div>

        <div>
          <p className="text-gold/50 text-[10px] uppercase tracking-wider mb-1">{t('victory.grand_winner')}</p>
          <p className="text-gold text-xl sm:text-2xl font-bold">{winner.name}</p>
          <p className="text-gold/40 text-[10px] mt-1">{t('victory.last_target')} : {targetFigure.name}</p>
        </div>

        <div className="space-y-1">
          <p className="text-gold/50 text-[10px] uppercase tracking-wider">{t('victory.ranking')}</p>
          {sortedPlayers.map((p, idx) => (
            <div
              key={p.id}
              className={`
                flex items-center justify-between px-3 py-2 rounded-lg text-xs sm:text-sm
                ${p.id === winner.id ? 'bg-gold/10 border border-gold/30' : 'bg-parchment/20'}
                ${!p.isAlive ? 'opacity-40' : ''}
              `}
            >
              <span className="text-gold/40 w-4 text-left">{idx + 1}.</span>
              <span className={`flex-1 text-left ml-1 ${p.isAlive ? 'text-gold' : 'text-gold/50 line-through'}`}>
                {p.name}
              </span>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: p.lives }).map((_, i) => (
                  <span key={i} className="text-blood text-xs">♥</span>
                ))}
                {!p.isAlive && <span className="text-blood/60 text-[10px] ml-1">✝</span>}
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={resetGame}
          className="w-full py-4 sm:py-5 rounded-lg border border-gold/40 bg-gradient-to-r from-gold/20 to-ember/20 text-gold font-bold text-sm sm:text-lg hover:from-gold/30 hover:to-ember/30 transition-all duration-200 active:scale-95 animate-pulse-glow"
        >
          {t('victory.replay')}
        </button>
      </div>
    </div>
  )
}
