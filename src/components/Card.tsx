import type { Card as CardType } from '../game/types'

interface Props {
  card: CardType
  faceDown?: boolean
  selected?: boolean
  onClick?: () => void
  small?: boolean
  revealed?: boolean
}

const BASE = import.meta.env.BASE_URL

const FIGURE_IMG: Record<string, string> = {
  'baba-yaga': `${BASE}images/figures/baba-yaga.png`,
  'chort': `${BASE}images/figures/chort.png`,
  'lesnik': `${BASE}images/figures/lesnik.png`,
  'zmaj': `${BASE}images/figures/zmaj.png`,
}

export function Card({ card, faceDown = false, selected = false, onClick, small = false, revealed = false }: Props) {
  const sizeClass = small
    ? 'w-[62px] h-[87px] min-w-[62px]'
    : 'w-[95px] h-[133px] min-w-[95px] sm:w-[105px] sm:h-[147px] sm:min-w-[105px]'

  if (faceDown && !revealed) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`
          ${sizeClass} rounded-lg border-2 border-gold-dark/40
          bg-gradient-to-br from-wood to-ink
          flex items-center justify-center select-none shadow-lg
          transition-transform duration-200 active:scale-95
          ${onClick ? 'cursor-pointer hover:scale-105 hover:border-gold/60' : 'cursor-default'}
        `}
        disabled={!onClick}
        aria-label="Carte face cachée"
      >
        <div className="flex flex-col items-center gap-1 opacity-50">
          <span className="text-gold/40 text-lg">?</span>
          <span className="text-gold/20 text-[9px] uppercase tracking-widest">Brehun</span>
        </div>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        ${sizeClass} rounded-lg overflow-hidden select-none shadow-lg
        transition-all duration-150 active:scale-95 touch-none
        ${onClick ? 'cursor-pointer' : 'cursor-default'}
        ${revealed ? 'animate-card-flip' : ''}
        ${selected
          ? 'ring-2 ring-gold ring-offset-2 ring-offset-ink shadow-[0_0_20px_rgba(212,165,116,0.5)] -translate-y-2'
          : 'ring-1 ring-gold-dark/30'
        }
      `}
      disabled={!onClick}
      aria-label={`Carte ${card.figure}`}
    >
      <img
        src={FIGURE_IMG[card.figure]}
        alt={card.figure}
        className="w-full h-full object-cover pointer-events-none"
        draggable={false}
      />
    </button>
  )
}

export function CardBack({ small = false }: { small?: boolean }) {
  const sizeClass = small
    ? 'w-[62px] h-[87px] min-w-[62px]'
    : 'w-[95px] h-[133px] min-w-[95px] sm:w-[105px] sm:h-[147px] sm:min-w-[105px]'

  return (
    <div
      className={`
        ${sizeClass} rounded-lg border-2 border-gold-dark/40
        bg-gradient-to-br from-wood via-ink to-wood
        flex items-center justify-center select-none shadow-lg
      `}
    >
      <div className="flex flex-col items-center gap-1 opacity-40">
        <span className="text-gold text-xl sm:text-2xl">?</span>
        <span className="text-gold/40 text-[9px] uppercase tracking-widest">Brehun</span>
      </div>
    </div>
  )
}
