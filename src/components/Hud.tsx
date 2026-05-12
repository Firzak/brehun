import type { GameState } from '../game/types'
import { getFigureInfo } from '../game/constants'
import { FigureIllustration } from './FigureIllustrations'

interface Props {
  gameState: GameState
  currentPlayerId?: string
}

export function Hud({ gameState, currentPlayerId }: Props) {
  const targetFigure = getFigureInfo(gameState.targetFigure)

  return (
    <div className="w-full bg-wood/80 border-b border-gold-dark/20 px-3 py-2 sm:p-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="text-gold/50 text-[10px] sm:text-xs uppercase whitespace-nowrap">
            R{gameState.round}
          </span>
          <div className="flex items-center gap-1.5">
            <FigureIllustration figure={targetFigure.id} size={18} />
            <span className="text-gold text-xs sm:text-sm font-bold hidden sm:inline" style={{ color: targetFigure.lightColor }}>
              {targetFigure.name}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {gameState.players.map((player) => {
            const isCurrent = player.id === currentPlayerId
            const isDead = !player.isAlive
            return (
              <div
                key={player.id}
                className={`
                  flex items-center gap-1 px-2 py-1 rounded-full text-[10px] sm:text-xs
                  transition-all duration-300 whitespace-nowrap
                  ${isDead ? 'opacity-30' : ''}
                  ${isCurrent && !isDead ? 'bg-gold/15 ring-1 ring-gold/40' : 'bg-parchment/20'}
                `}
              >
                <div
                  className={`
                    w-1.5 h-1.5 rounded-full shrink-0
                    ${isDead ? 'bg-blood' : isCurrent ? 'bg-gold animate-pulse-glow' : 'bg-gold-dark/40'}
                  `}
                />
                <span className={`font-medium ${isCurrent ? 'text-gold' : 'text-gold/60'} ${isDead ? 'line-through' : ''}`}>
                  {player.name}
                </span>
                <span className="text-blood text-[10px]">{'♥'.repeat(Math.max(0, player.lives))}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
