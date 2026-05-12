import { useState } from 'react'
import type { FigureId } from '../game/types'

interface Props {
  figure: FigureId
  size?: number
  className?: string
}

const FIGURE_MAP: Record<FigureId, string> = {
  'baba-yaga': 'baba-yaga',
  'chort': 'chort',
  'lesnik': 'lesnik',
  'zmaj': 'zmaj',
}

function ImageOrFallback({ figure, size, className }: Props) {
  const [useFallback, setUseFallback] = useState(false)

  const src = `${import.meta.env.BASE_URL}images/figures/${FIGURE_MAP[figure]}.png`

  if (useFallback) {
    return <SVGFallback figure={figure} size={size} className={className} />
  }

  return (
    <img
      src={src}
      alt={figure}
      width={size}
      height={size}
      onError={() => setUseFallback(true)}
      className={`object-contain ${className ?? ''}`}
      style={{ width: size, height: size }}
    />
  )
}

function SVGFallback({ figure, size = 80, className = '' }: Props) {
  return <div className={className}>{renderSVG(figure, size)}</div>
}

function renderSVG(figure: FigureId, size: number) {
  switch (figure) {
    case 'baba-yaga': return <BabaYagaSVG size={size} />
    case 'chort': return <ChortSVG size={size} />
    case 'lesnik': return <LesnikSVG size={size} />
    case 'zmaj': return <ZmajSVG size={size} />
  }
}

export function FigureIllustration(props: Props) {
  return <ImageOrFallback {...props} />
}

function BabaYagaSVG({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <ellipse cx="50" cy="70" rx="25" ry="8" fill="#2d5a27" opacity={0.3} />
      <polygon points="50,15 25,55 75,55" fill="#1a4a1a" stroke="#2d8a2d" strokeWidth="2" />
      <rect x="42" y="30" width="16" height="20" fill="#0d1f0d" rx="2" />
      <rect x="38" y="55" width="8" height="20" fill="#3d2b1f" rx="2" />
      <rect x="54" y="55" width="8" height="20" fill="#3d2b1f" rx="2" />
      <circle cx="62" cy="25" r="5" fill="#555" opacity={0.5} />
      <rect x="24" y="50" width="52" height="4" fill="#2d5a27" rx="2" />
      <path d="M35 60 Q30 65 28 70" stroke="#1a4a1a" strokeWidth="2" fill="none" />
      <path d="M65 60 Q70 65 72 70" stroke="#1a4a1a" strokeWidth="2" fill="none" />
      <circle cx="45" cy="38" r="2" fill="#ff6" opacity={0.8} />
      <circle cx="55" cy="38" r="2" fill="#ff6" opacity={0.8} />
      <path d="M47 42 Q50 45 53 42" stroke="#2d8a2d" strokeWidth="1" fill="none" />
    </svg>
  )
}

function ChortSVG({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <ellipse cx="50" cy="78" rx="20" ry="6" fill="#6b0000" opacity={0.3} />
      <circle cx="50" cy="40" r="22" fill="#4a0000" stroke="#aa0000" strokeWidth="2" />
      <path d="M32 22 L28 8 L38 18Z" fill="#6b0000" stroke="#aa0000" strokeWidth="1.5" />
      <path d="M68 22 L72 8 L62 18Z" fill="#6b0000" stroke="#aa0000" strokeWidth="1.5" />
      <ellipse cx="42" cy="36" rx="4" ry="5" fill="#ff3300" opacity={0.9} />
      <ellipse cx="58" cy="36" rx="4" ry="5" fill="#ff3300" opacity={0.9} />
      <circle cx="42" cy="36" r="2" fill="#ffcc00" />
      <circle cx="58" cy="36" r="2" fill="#ffcc00" />
      <path d="M44 48 Q50 55 56 48" stroke="#aa0000" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M50 50 L50 60" stroke="#4a0000" strokeWidth="3" />
      <path d="M50 65 Q40 72 35 70" stroke="#6b0000" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M50 65 Q60 72 65 70" stroke="#6b0000" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M47 56 L43 62" stroke="#4a0000" strokeWidth="1.5" />
      <path d="M53 56 L57 62" stroke="#4a0000" strokeWidth="1.5" />
    </svg>
  )
}

function LesnikSVG({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <ellipse cx="50" cy="82" rx="22" ry="6" fill="#3d2b1f" opacity={0.3} />
      <rect x="42" y="35" width="16" height="35" fill="#2a1f14" rx="4" stroke="#4a3a2a" strokeWidth="1.5" />
      <circle cx="50" cy="28" r="20" fill="#2a4a1a" stroke="#3d6b2a" strokeWidth="2" />
      <path d="M38 22 L42 28 L38 34" stroke="#3d6b2a" strokeWidth="1.5" fill="none" />
      <path d="M62 22 L58 28 L62 34" stroke="#3d6b2a" strokeWidth="1.5" fill="none" />
      <path d="M34 20 Q36 8 44 14" stroke="#3d6b2a" strokeWidth="2" fill="none" />
      <path d="M66 20 Q64 8 56 14" stroke="#3d6b2a" strokeWidth="2" fill="none" />
      <circle cx="45" cy="26" r="2.5" fill="#8b6914" />
      <circle cx="55" cy="26" r="2.5" fill="#8b6914" />
      <path d="M47 32 Q50 36 53 32" stroke="#6b4c3b" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <rect x="38" y="58" width="8" height="18" fill="#3d2b1f" rx="3" />
      <rect x="54" y="58" width="8" height="18" fill="#3d2b1f" rx="3" />
      <path d="M40 65 L35 62" stroke="#3d2b1f" strokeWidth="2" strokeLinecap="round" />
      <path d="M60 65 L65 62" stroke="#3d2b1f" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function ZmajSVG({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <ellipse cx="50" cy="85" rx="25" ry="5" fill="#3a0a4e" opacity={0.3} />
      <path d="M25 50 Q35 20 50 25 Q65 20 75 50" stroke="#6b1a8a" strokeWidth="3" fill="#2a0535" />
      <path d="M50 25 Q55 15 65 12" stroke="#6b1a8a" strokeWidth="2.5" fill="none" />
      <path d="M50 25 Q45 15 35 12" stroke="#6b1a8a" strokeWidth="2.5" fill="none" />
      <path d="M30 42 L22 30 L32 36Z" fill="#5a1070" stroke="#8a2aaa" strokeWidth="1" />
      <path d="M70 42 L78 30 L68 36Z" fill="#5a1070" stroke="#8a2aaa" strokeWidth="1" />
      <path d="M30 42 L22 55 L32 48Z" fill="#5a1070" stroke="#8a2aaa" strokeWidth="1" />
      <path d="M70 42 L78 55 L68 48Z" fill="#5a1070" stroke="#8a2aaa" strokeWidth="1" />
      <circle cx="42" cy="38" r="3" fill="#ff4400" opacity={0.9} />
      <circle cx="58" cy="38" r="3" fill="#ff4400" opacity={0.9} />
      <circle cx="42" cy="38" r="1.5" fill="#ffcc00" />
      <circle cx="58" cy="38" r="1.5" fill="#ffcc00" />
      <path d="M60 55 Q75 60 80 50" stroke="#6b1a8a" strokeWidth="2.5" fill="none" />
      <path d="M80 50 Q85 45 90 48" stroke="#6b1a8a" strokeWidth="2" fill="none" />
      <path d="M46 50 Q50 70 54 50" stroke="#8a2aaa" strokeWidth="1.5" fill="none" opacity={0.6} />
      <path d="M48 52 Q50 75 52 52" stroke="#8a2aaa" strokeWidth="1.5" fill="none" opacity={0.6} />
      <path d="M35 55 Q20 60 15 50" stroke="#6b1a8a" strokeWidth="2.5" fill="none" />
      <path d="M15 50 Q10 45 5 48" stroke="#6b1a8a" strokeWidth="2" fill="none" />
    </svg>
  )
}
