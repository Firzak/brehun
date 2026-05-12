import { useGameStore } from './store/gameStore'
import { HomeScreen } from './pages/HomeScreen'
import { GameScreen } from './pages/GameScreen'

export default function App() {
  const { appScreen } = useGameStore()

  if (appScreen.type === 'home') {
    return <HomeScreen />
  }

  return <GameScreen />
}
