import { useGameStore } from '../store/gameStore'
import { CardBack } from './Card'
import { useTranslation } from '../hooks/useTranslation'

export function AccusationModal() {
  const { gameState, believe, accuse } = useGameStore()
  const { t } = useTranslation()

  if (!gameState?.lastPlay) return null

  const lastPlay = gameState.lastPlay
  const prevPlayer = gameState.players.find((p) => p.id === lastPlay.playerId)
  const currentPlayer = gameState.players[gameState.currentPlayerIndex]

  if (!prevPlayer || !currentPlayer) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="absolute inset-0 bg-ink/85 backdrop-blur-sm" />
      <div className="relative bg-gradient-to-b from-wood to-ink border border-gold-dark/30 rounded-xl p-5 sm:p-8 w-full max-w-sm mx-auto shadow-2xl space-y-5 sm:space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-gold text-base sm:text-lg font-bold">{t('accuse.last_action')}</h2>
          <p className="text-gold/70 text-xs sm:text-sm">
            <span className="text-gold font-semibold">{prevPlayer.name}</span>{' '}
            {t('transition.played_cards')}{' '}
            <span className="text-gold font-semibold">{lastPlay.cardCount}</span>{' '}
            {t('transition.card_s')}
          </p>
          <p className="text-gold/50 text-[10px] sm:text-xs italic">
            {t('accuse.claiming')} {lastPlay.claimedFigure}
          </p>
        </div>

        <div className="flex justify-center gap-2 overflow-x-auto py-1">
          {Array.from({ length: Math.min(lastPlay.cardCount, 5) }).map((_, i) => (
            <CardBack key={i} small />
          ))}
        </div>

        <div className="text-center">
          <p className="text-gold/80 text-xs sm:text-sm mb-1">
            <span className="text-ember font-bold">{currentPlayer.name}</span>, {t('accuse.what_do_you_do')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button
            type="button"
            onClick={believe}
            className="flex-1 px-4 py-3.5 sm:py-3 rounded-lg border border-gold/30 bg-gold/10 text-gold font-bold text-sm hover:bg-gold/20 transition-all duration-200 active:scale-95"
          >
            {t('accuse.believe')}
          </button>
          <button
            type="button"
            onClick={accuse}
            className="flex-1 px-4 py-3.5 sm:py-3 rounded-lg border border-blood/50 bg-blood/10 text-blood font-bold text-sm hover:bg-blood/20 hover:border-blood transition-all duration-200 active:scale-95"
          >
            {t('accuse.liar')}
          </button>
        </div>
      </div>
    </div>
  )
}
