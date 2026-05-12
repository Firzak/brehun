# Brehun — Jeu de Menteur Ukrainien 🇺🇦🃏

**Brehun** (брехун — "menteur" en ukrainien) est un jeu de bluff multijoueur local inspiré du folklore ukrainien. Jusqu'à 6 joueurs s'affrontent sur un seul appareil dans une ambiance sombre de taverne slave.

> ⚡ 100% local — aucune API, aucun serveur, aucune connexion internet nécessaire.

---

## Règles du Jeu

### Concept
- 4 figures du folklore ukrainien : **Baba Yaga**, **Chort**, **Lesnik**, **Zmaj**
- Chaque manche désigne une **figure cible** que les joueurs doivent annoncer
- Le deck de 52 cartes (13 par figure) est distribué équitablement
- Chaque joueur commence avec **3 vies**

### Déroulement
1. À son tour, un joueur pose **1 ou plusieurs cartes face cachée**
2. Il annonce poser uniquement des cartes de la **figure cible**
3. Le joueur suivant choisit :
   - **Croire** → les cartes sont acceptées, le jeu continue
   - **Menteur !** → les cartes sont révélées

### Accusation
- Si le précédent joueur a **menti** → il perd 1 vie
- Si le précédent joueur a **dit la vérité** → l'accusateur perd 1 vie

### Élimination
- Un joueur à **0 vie** est éliminé

### Fin de manche
- Un joueur qui **vide sa main** gagne la manche
- Les vies restantes sont conservées
- Une nouvelle manche commence avec redistribution des cartes

### Fin de partie
- Le **dernier joueur en vie** remporte la partie

---

## Installation & Lancement

```bash
# Cloner ou copier le projet
cd brehun

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Construire pour production
npm run build
```

Ouvrir [http://localhost:5173](http://localhost:5173) dans le navigateur.

---

## Architecture du Projet

```
brehun/
├── public/              # Fichiers statiques
├── src/
│   ├── components/      # Composants React réutilisables
│   │   ├── Card.tsx
│   │   ├── Hud.tsx
│   │   ├── AccusationModal.tsx
│   │   ├── AccusationResult.tsx
│   │   ├── PlayerTransition.tsx
│   │   ├── RoundEnd.tsx
│   │   ├── VictoryScreen.tsx
│   │   ├── ActionHistory.tsx
│   │   └── FigureIllustrations.tsx
│   ├── game/            # Logique de jeu pure (indépendante de React)
│   │   ├── types.ts     # Types TypeScript stricts
│   │   ├── constants.ts # Constantes et figures
│   │   ├── engine.ts    # Moteur de jeu (fonctions pures)
│   │   └── storage.ts   # Sauvegarde localStorage
│   ├── store/           # État global (Zustand)
│   │   └── gameStore.ts
│   ├── pages/           # Pages de l'application
│   │   ├── HomeScreen.tsx
│   │   └── GameScreen.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css        # Styles globaux et animations
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

---

## Technologies

| Technologie | Usage |
|-------------|-------|
| **React 18** | UI components |
| **TypeScript** | Typage strict — aucun `any` |
| **Vite** | Build rapide |
| **Zustand** | State management simple |
| **Tailwind CSS** | Style utility-first |
| **localStorage** | Sauvegarde de partie |

### Pourquoi cette stack ?
- **Zéro dépendance lourde** — pas de framework CSS, pas de librairie d'état complexe
- **Architecture modulaire** — la logique de jeu (`game/engine.ts`) est purement fonctionnelle et totalement séparée du rendu
- **Prêt pour l'extension** — facile d'ajouter une IA, un mode réseau, ou un backend

---

## Personnalisation

### Thème
Les couleurs des figures sont définies dans `src/game/constants.ts` :
- `baba-yaga` — vert forêt
- `chort` — rouge sang
- `lesnik` — marron bois
- `zmaj` — violet profond

### Animations
Les animations Tailwind personnalisées dans `tailwind.config.js` :
- `fade-in`, `slide-up`, `float`, `pulse-glow`, `card-flip`, `flicker`

---

## Fonctionnalités Techniques

- ✅ Architecture propre et modulaire
- ✅ Logique de jeu séparée du rendu
- ✅ Types TypeScript stricts
- ✅ Gestion des tours et des éliminations
- ✅ Transition "passe l'écran" pour le multijoueur local
- ✅ Historique des actions visible
- ✅ Sauvegarde automatique (localStorage)
- ✅ Responsive desktop & mobile
- ✅ Animations CSS fluides
- ✅ SVG inline — zéro asset externe
- ✅ Prêt pour l'IA (interface engine pure)
- ✅ Prêt pour le multijoueur réseau (état centralisé)

---

## Développement

```bash
# Mode dev avec HMR
npm run dev

# Build production
npm run build

# Preview production
npm run preview
```

---

## Licence

MIT — fait avec ❤️ pour le folklore ukrainien.
