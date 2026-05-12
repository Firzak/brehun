import { useState, useEffect } from 'react'
import { useGameStore } from '../store/gameStore'
import { getFigureInfo } from '../game/constants'
import { FigureIllustration } from './FigureIllustrations'
import { useTranslation } from '../hooks/useTranslation'
import { audio } from '../game/audio'

export function AccusationResult() {
  const { gameState, resolveAccusation } = useGameStore()
  const { t } = useTranslation()
  const [revealedIdx, setRevealedIdx] = useState(0)
  const [canContinue, setCanContinue] = useState(false)

  if (!gameState?.accusationResult) return <></>

  const { accuserId, wasLie, loserId, revealedCards } = gameState.accusationResult
  const accuser = gameState.players.find((p) => p.id === accuserId)
  const loser = gameState.players.find((p) => p.id === loserId)
  const targetFigureInfo = getFigureInfo(gameState.targetFigure)

  if (!accuser || !loser) return null

  const isLoserEliminated = !loser.isAlive

  useEffect(() => {
    audio.accuse()
    setRevealedIdx(0)
    setCanContinue(false)

    const total = revealedCards.length
    let current = 0
    const interval = setInterval(() => {
      current++
      setRevealedIdx(current)
      audio.reveal()
      if (current >= total) {
        clearInterval(interval)
        if (isLoserEliminated) {
          audio.eliminate()
          setTimeout(() => setCanContinue(true), 1000)
        } else {
          setTimeout(() => setCanContinue(true), 600)
        }
      }
    }, 400)

    return () => clearInterval(interval)
  }, [gameState.accusationResult])

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 animate-fade-in ${isLoserEliminated ? 'animate-shake' : ''}`}>
      <div className="absolute inset-0 bg-ink/85 backdrop-blur-sm" />
      <div className="relative bg-gradient-to-b from-wood to-ink border border-gold-dark/30 rounded-xl p-5 sm:p-8 w-full max-w-sm mx-auto shadow-2xl space-y-5 sm:space-y-6">
        <div className="text-center space-y-1.5">
          <h2 className={`text-lg sm:text-xl font-bold ${wasLie ? 'text-blood' : 'text-ember'}`}>
            {wasLie ? t('result.liar_title') : t('result.truth_title')}
          </h2>
          <p className="text-gold/70 text-xs sm:text-sm animate-fade-in">
            {wasLie
              ? t('result.liar_lost', { name: loser.name })
              : t('result.accuser_lost', { name: accuser.name })
            }
          </p>
        </div>

        <div className="flex items-center justify-center gap-2">
          <span className="text-gold/50 text-[10px] uppercase tracking-wider">{t('result.target_figure')}</span>
          <FigureIllustration figure={gameState.targetFigure} size={18} />
          <span className="text-gold/70 text-xs">{targetFigureInfo.name}</span>
        </div>

        {revealedIdx > 0 && (
          <>
            <div className="space-y-1">
              <p className="text-gold/60 text-[10px] text-center uppercase tracking-wider">{t('result.revealed')}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {revealedCards.map((card, i) => {
                  const isMatch = card.figure === gameState.targetFigure
                  const show = i < revealedIdx
                  return (
                    <div
                      key={card.id}
                      className={`
                        relative w-[72px] h-[101px] sm:w-[80px] sm:h-[112px] rounded-lg overflow-hidden
                        ring-2 transition-all duration-500
                        ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
                        ${isMatch ? 'ring-green-600/70' : 'ring-blood/70'}
                      `}
                    >
                      {show && (
                        <>
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
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="text-center space-y-1">
              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm ${wasLie ? 'bg-blood/15' : 'bg-ember/15'}`}>
                <span className={`font-bold ${wasLie ? 'text-blood' : 'text-ember'}`}>
                  {loser.name}
                </span>
                <span className="text-gold/60">{t('result.lost_life')}</span>
                <span className="text-gold/40">({loser.lives} ♥)</span>
              </div>
              {isLoserEliminated && (
                <div className="flex flex-col items-center gap-1 mt-2">
                  <span className="text-4xl sm:text-5xl animate-float">💀</span>
                  <p className="text-blood font-bold text-base sm:text-lg animate-pulse">{t('result.eliminated')}</p>
                </div>
              )}
            </div>
          </>
        )}

        {canContinue && (
          <button
            type="button"
            onClick={resolveAccusation}
            className="w-full py-3.5 sm:py-3 rounded-lg border border-gold/30 bg-gold/10 text-gold font-bold text-sm hover:bg-gold/20 transition-all duration-200 active:scale-95 animate-slide-up"
          >
            {t('result.continue')}
          </button>
        )}
      </div>
    </div>
  )
}
