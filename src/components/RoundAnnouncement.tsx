import { useEffect, useState } from 'react'
import { FigureIllustration } from './FigureIllustrations'
import { getFigureInfo } from '../game/constants'
import { useTranslation } from '../hooks/useTranslation'
import type { FigureId } from '../game/types'
import { audio } from '../game/audio'

interface Props {
  figure: FigureId
  round: number
  onDone: () => void
}

export function RoundAnnouncement({ figure, round, onDone }: Props) {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(true)
  const info = getFigureInfo(figure)

  useEffect(() => {
    audio.roundStart()
    const timer = setTimeout(() => {
      setVisible(false)
      onDone()
    }, 2000)
    return () => clearTimeout(timer)
  }, [onDone])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
      <div className="absolute inset-0 bg-ink/95 backdrop-blur-lg" />
      <div className="relative text-center space-y-6 animate-slide-up">
        <p className="text-gold/50 text-xs sm:text-sm uppercase tracking-[0.3em]">
          {t('round.end_title')} {round}
        </p>
        <h2 className="text-gold text-2xl sm:text-4xl font-bold">{t('hud.target')}</h2>
        <div className="flex flex-col items-center gap-3">
          <div className="opacity-80">
            <FigureIllustration figure={info.id} size={64} />
          </div>
          <span className="text-3xl sm:text-5xl font-bold" style={{ color: info.lightColor }}>
            {info.name}
          </span>
        </div>
        <p className="text-gold/30 text-xs animate-pulse">{t('transition.pass_device')}</p>
      </div>
    </div>
  )
}
