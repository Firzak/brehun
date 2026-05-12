import { useGameStore } from '../store/gameStore'
import { useEffect, useRef } from 'react'
import { useTranslation } from '../hooks/useTranslation'

export function ActionHistory() {
  const { gameState } = useGameStore()
  const { t } = useTranslation()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [gameState?.actions.length])

  if (!gameState) return null

  const actions = gameState.actions.slice(-20)

  return (
    <div className="w-full bg-wood/60 border-t border-gold-dark/20 px-3 py-2">
      <div
        ref={scrollRef}
        className="max-h-20 sm:max-h-28 overflow-y-auto space-y-0.5 scrollbar-thin"
      >
        {actions.length === 0 && (
          <p className="text-gold/30 text-[10px] italic">{t('history.empty')}</p>
        )}
        {actions.map((action, idx) => {
          const isSystem = action.playerId === 'system'
          return (
            <div
              key={idx}
              className={`
                text-[10px] sm:text-xs py-0.5 px-1.5 rounded
                ${isSystem ? 'text-gold/40 italic' : 'text-gold/60'}
                ${action.type === 'eliminate' ? 'text-blood font-bold' : ''}
                ${action.type === 'lose-life' ? 'text-ember' : ''}
                ${action.type === 'round-win' || action.type === 'game-over' ? 'text-gold font-bold' : ''}
              `}
            >
              ▸ {action.message}
            </div>
          )
        })}
      </div>
    </div>
  )
}
