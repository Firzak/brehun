import { useState } from 'react'
import { useGameStore } from '../store/gameStore'
import { MIN_PLAYERS, MAX_PLAYERS, FIGURES } from '../game/constants'
import { FigureIllustration } from '../components/FigureIllustrations'

export function HomeScreen() {
  const { startGame } = useGameStore()

  const [playerCount, setPlayerCount] = useState(3)
  const [playerNames, setPlayerNames] = useState<string[]>(['', '', ''])
  const [error, setError] = useState('')

  const handlePlayerCountChange = (count: number) => {
    const clamped = Math.max(MIN_PLAYERS, Math.min(MAX_PLAYERS, count))
    setPlayerCount(clamped)
    setPlayerNames((prev) => {
      const names = [...prev]
      while (names.length < clamped) names.push('')
      while (names.length > clamped) names.pop()
      return names
    })
    setError('')
  }

  const handleNameChange = (index: number, name: string) => {
    setPlayerNames((prev) => {
      const names = [...prev]
      names[index] = name
      return names
    })
    setError('')
  }

  const handleStart = () => {
    const trimmed = playerNames.map((n) => n.trim())
    if (trimmed.some((n) => !n)) {
      setError('Tous les joueurs doivent avoir un nom')
      return
    }
    const unique = new Set(trimmed)
    if (unique.size !== trimmed.length) {
      setError('Tous les noms doivent être uniques')
      return
    }
    startGame(trimmed)
  }

  const isStartEnabled = playerNames.every((n) => n.trim().length > 0)

  return (
    <div className="min-h-screen h-dvh bg-ink flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-gold blur-3xl" />
        <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-ember blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg space-y-6 sm:space-y-8">
        <div className="text-center space-y-3">
          <div className="flex justify-center gap-2 sm:gap-3">
            {FIGURES.map((f) => (
              <div key={f.id} className="opacity-60 hover:opacity-100 transition-opacity">
                <FigureIllustration figure={f.id} size={28} />
              </div>
            ))}
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-gold tracking-wider">
            BREHUN
          </h1>
          <p className="text-gold/50 text-xs sm:text-sm italic">
            Jeu de Menteur — Folklore Ukrainien
          </p>
        </div>

        <div className="bg-wood/60 border border-gold-dark/20 rounded-xl p-4 sm:p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-gold/60 text-xs uppercase tracking-wider block">
              Joueurs
            </label>
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
              {Array.from({ length: MAX_PLAYERS - MIN_PLAYERS + 1 }, (_, i) => i + MIN_PLAYERS).map(
                (count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => handlePlayerCountChange(count)}
                    className={`
                      py-2.5 sm:py-3 rounded-lg text-sm font-bold transition-all duration-200 active:scale-95
                      ${playerCount === count
                        ? 'bg-gold/20 border border-gold/50 text-gold'
                        : 'bg-parchment/20 border border-transparent text-gold/50 hover:text-gold/80 hover:bg-parchment/30'
                      }
                    `}
                  >
                    {count}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="space-y-2.5">
            {Array.from({ length: playerCount }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-gold/40 text-xs w-5 text-right font-mono shrink-0">
                  {i + 1}.
                </span>
                <input
                  type="text"
                  inputMode="text"
                  autoCapitalize="words"
                  placeholder={`Joueur ${i + 1}`}
                  value={playerNames[i] ?? ''}
                  onChange={(e) => handleNameChange(i, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && isStartEnabled) handleStart()
                  }}
                  maxLength={20}
                  className="flex-1 bg-ink/60 border border-gold-dark/20 rounded-lg px-3 py-2.5 sm:py-3 text-gold placeholder-gold/30 text-sm focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>
            ))}
          </div>

          {error && (
            <p className="text-blood text-xs sm:text-sm text-center animate-fade-in">{error}</p>
          )}

          <button
            type="button"
            onClick={handleStart}
            disabled={!isStartEnabled}
            className={`
              w-full py-3.5 sm:py-4 rounded-lg text-sm sm:text-base font-bold transition-all duration-200 active:scale-95
              ${isStartEnabled
                ? 'border border-gold/40 bg-gradient-to-r from-gold/20 to-ember/20 text-gold shadow-[0_0_20px_rgba(212,165,116,0.1)]'
                : 'border border-gold-dark/10 bg-parchment/10 text-gold/30'
              }
            `}
          >
            Commencer
          </button>
        </div>

        <div className="bg-wood/40 border border-gold-dark/15 rounded-xl p-4 space-y-2">
          <p className="text-gold/50 text-[10px] uppercase tracking-wider font-bold">Règles</p>
          <ul className="text-gold/50 text-[11px] sm:text-xs space-y-1.5">
            <li>• Chaque joueur reçoit <span className="text-gold/70">5 cartes</span> et a <span className="text-gold/70">3 vies</span>.</li>
            <li>• Une <span className="text-gold/70">figure cible</span> est désignée chaque manche.</li>
            <li>• À ton tour, pose 1-5 cartes <span className="text-gold/70">face cachée</span> en annonçant qu'elles sont toutes de la figure cible.</li>
            <li>• Le suivant peut <span className="text-gold/70">Croire</span> ou crier <span className="text-blood/80">Menteur !</span></li>
            <li>• Si tu mens et te fais prendre → <span className="text-ember">-1 vie</span>. Si tu dis vrai → l'accusateur perd 1 vie.</li>
            <li>• <span className="text-gold/70">0 vie</span> = éliminé. Le <span className="text-gold/70">dernier en vie</span> gagne.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
