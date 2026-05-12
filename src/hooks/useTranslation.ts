import { useGameStore } from '../store/gameStore'
import { t as translate, type Lang } from '../game/translations'

export function useTranslation(): { t: (key: string, params?: Record<string, string>) => string; lang: Lang } {
  const gameState = useGameStore((s) => s.gameState)
  const appScreen = useGameStore((s) => s.appScreen)

  let lang: Lang = 'fr'

  if (appScreen.type === 'game' && gameState) {
    const player = gameState.players[gameState.currentPlayerIndex]
    if (player && (player as any).language) {
      lang = (player as any).language as Lang
    }
  }

  return {
    t: (key: string, params?: Record<string, string>) => translate(lang, key, params),
    lang,
  }
}
