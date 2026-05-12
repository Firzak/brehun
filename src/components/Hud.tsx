import type { GameState } from '../game/types'
import { getFigureInfo, getPlayerColor } from '../game/constants'
import { FigureIllustration } from './FigureIllustrations'
import { useTranslation } from '../hooks/useTranslation'

interface Props {
  gameState: GameState
  currentPlayerId?: string
}

export function Hud({ gameState, currentPlayerId }: Props) {
  const { t } = useTranslation()
  const targetFigure = getFigureInfo(gameState.targetFigure)

  return (
    <div className="w-full bg-wood/80 border-b border-gold-dark/20 px-2 sm:px-3 py-1.5 sm:py-2">
      <div className="flex items-center justify-between gap-1 sm:gap-3">
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <span className="text-gold/50 text-[10px] sm:text-xs uppercase whitespace-nowrap">
            {t('hud.r')}{gameState.round}
          </span>
          <div className="flex items-center gap-1">
            <FigureIllustration figure={targetFigure.id} size={16} />
            <span className="text-gold/70 text-[10px] sm:text-xs font-bold hidden sm:inline">
              {targetFigure.name}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none flex-1 justify-end">
          {gameState.players.map((player, idx) => {
            const isCurrent = player.id === currentPlayerId
            const isDead = !player.isAlive
            const pc = getPlayerColor(idx)
            return (
              <div
                key={player.id}
                className={`
                  flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded-full text-[9px] sm:text-[11px]
                  transition-all duration-300 whitespace-nowrap
                  ${isDead ? 'opacity-25' : ''}
                  ${isCurrent && !isDead ? 'ring-1' : ''}
                `}
                style={{
                  backgroundColor: isCurrent && !isDead ? `${pc.hex}0.15)` : 'rgba(42,31,20,0.3)',
                  borderColor: isCurrent && !isDead ? `${pc.hex}0.4)` : 'transparent',
                }}
              >
                <div
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0"
                  style={{
                    backgroundColor: isDead ? '#8b0000' : pc.dot,
                    boxShadow: isCurrent && !isDead ? `0 0 6px ${pc.dot}` : 'none',
                  }}
                />
                <span
                  className={`font-semibold ${isDead ? 'line-through text-gold/40' : ''}`}
                  style={{ color: isCurrent && !isDead ? pc.dot : undefined }}
                >
                  {player.name}
                </span>
                <span className="text-gold/50 text-[8px] sm:text-[9px] font-mono">
                  {player.hand.length}
                </span>
                <span className="text-blood/70 text-[8px] sm:text-[9px]">{'♥'.repeat(Math.max(0, player.lives))}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
