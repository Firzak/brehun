export type Lang = 'fr' | 'uk'

type Dict = Record<string, string>

const fr: Dict = {
  'app.title': 'Brehun',
  'app.subtitle': 'Jeu de Menteur — Folklore Ukrainien',
  'app.rules_title': 'Règles',
  'app.rules_1': 'Chaque joueur reçoit 5 cartes et a 3 vies.',
  'app.rules_2': 'Une figure cible est désignée chaque manche.',
  'app.rules_3': 'À ton tour, pose 1-5 cartes face cachée en annonçant qu\'elles sont toutes de la figure cible.',
  'app.rules_4': 'Le suivant peut Croire ou crier Menteur !',
  'app.rules_5': 'Si tu mens et te fais prendre → -1 vie. Si tu dis vrai → l\'accusateur perd 1 vie.',
  'app.rules_6': '0 vie = éliminé. Le dernier en vie gagne.',

  'home.players': 'Joueurs',
  'home.player_n': 'Joueur',
  'home.start': 'Commencer',
  'home.local_only': 'Tout fonctionne localement — Aucune connexion requise',

  'hud.round': 'Manche',
  'hud.alive': 'Vivants',
  'hud.target': 'Cible',
  'hud.r': 'R',

  'transition.your_turn': "c'est ton tour !",
  'transition.your_judgment': 'à toi de juger !',
  'transition.ready': 'Prêt',
  'transition.pass_device': "Passe l'appareil au joueur suivant avant d'appuyer sur Prêt",
  'transition.played_cards': 'a posé',
  'transition.card_s': 'carte(s)',
  'transition.target_figure': 'Figure cible',
  'transition.decide': 'Tu dois décider si',
  'transition.decide_truth': 'dit la vérité ou ment.',

  'accuse.last_action': 'Dernière action',
  'accuse.claiming': 'en prétendant que ce sont toutes des',
  'accuse.what_do_you_do': 'que fais-tu ?',
  'accuse.believe_or_accuse': "Tu crois {name} ou tu l'accuses de mentir ?",
  'accuse.believe': 'Croire',
  'accuse.liar': 'Menteur !',

  'result.liar_title': 'MENTEUR !',
  'result.truth_title': "C'ÉTAIT LA VÉRITÉ !",
  'result.lost_life': 'perd 1 vie',
  'result.liar_lost': '{name} a menti et perd 1 vie',
  'result.accuser_lost': "{name} a accusé à tort et perd 1 vie",
  'result.target_figure': 'Figure cible',
  'result.revealed': 'Cartes révélées',
  'result.eliminated': 'ÉLIMINÉ !',
  'result.continue': 'Continuer',

  'play.choose_cards': 'Choisis les cartes à poser',
  'play.announce': 'Annonce :',
  'play.all': 'Tous',
  'play.play': 'Poser',

  'round.end_title': 'Fin de la Manche',
  'round.winner': 'Vainqueur',
  'round.next_target': 'Prochaine cible',
  'round.new_round': 'Nouvelle Manche',

  'victory.title': 'Victoire !',
  'victory.game_over': 'La partie est terminée',
  'victory.grand_winner': 'Grand Vainqueur',
  'victory.last_target': 'Dernière figure cible',
  'victory.ranking': 'Classement',
  'victory.replay': 'Rejouer',

  'eliminated.wait': 'Tu as été éliminé.',
  'eliminated.wait_end': 'Attends la fin de la partie.',

  'history.title': 'Historique',
  'history.empty': 'Aucune action',
}

const uk: Dict = {
  'app.title': 'Брехун',
  'app.subtitle': 'Гра в блеф — Український фольклор',
  'app.rules_title': 'Правила',
  'app.rules_1': 'Кожен гравець отримує 5 карт і має 3 життя.',
  'app.rules_2': 'Кожного раунду обирається цільова фігура.',
  'app.rules_3': 'У свій хід поклади 1-5 карт долілиць, оголошуючи їх цільовою фігурою.',
  'app.rules_4': 'Наступний гравець може Вірити або крикнути Брехун!',
  'app.rules_5': 'Якщо збрехав і попався → -1 життя. Якщо правда → той, хто звинуватив, втрачає 1 життя.',
  'app.rules_6': '0 життів = вибув. Останній живий перемагає.',

  'home.players': 'Гравці',
  'home.player_n': 'Гравець',
  'home.start': 'Почати',
  'home.local_only': 'Все працює локально — без підключення',

  'hud.round': 'Раунд',
  'hud.alive': 'Живі',
  'hud.target': 'Ціль',
  'hud.r': 'Р',

  'transition.your_turn': 'твій хід!',
  'transition.your_judgment': 'твоя черга судити!',
  'transition.ready': 'Готовий',
  'transition.pass_device': 'Передай пристрій наступному гравцю, потім натисни Готовий',
  'transition.played_cards': 'поклав',
  'transition.card_s': 'карт',
  'transition.target_figure': 'Цільова фігура',
  'transition.decide': 'Ти маєш вирішити, чи',
  'transition.decide_truth': 'каже правду чи бреше.',

  'accuse.last_action': 'Остання дія',
  'accuse.claiming': 'стверджуючи, що всі вони',
  'accuse.what_do_you_do': 'що робиш?',
  'accuse.believe_or_accuse': 'Ти віриш {name} чи звинувачуєш?',
  'accuse.believe': 'Вірити',
  'accuse.liar': 'Брехун!',

  'result.liar_title': 'БРЕХУН!',
  'result.truth_title': 'ЦЕ БУЛА ПРАВДА!',
  'result.lost_life': 'втрачає 1 життя',
  'result.liar_lost': '{name} збрехав і втрачає 1 життя',
  'result.accuser_lost': '{name} помилково звинуватив і втрачає 1 життя',
  'result.target_figure': 'Цільова фігура',
  'result.revealed': 'Відкриті карти',
  'result.eliminated': 'ВИБУВ!',
  'result.continue': 'Продовжити',

  'play.choose_cards': 'Виберіть карти для ходу',
  'play.announce': 'Оголоси:',
  'play.all': 'Всі',
  'play.play': 'Покласти',

  'round.end_title': 'Кінець раунду',
  'round.winner': 'Переможець',
  'round.next_target': 'Наступна ціль',
  'round.new_round': 'Новий раунд',

  'victory.title': 'Перемога!',
  'victory.game_over': 'Гру завершено',
  'victory.grand_winner': 'Великий переможець',
  'victory.last_target': 'Остання цільова фігура',
  'victory.ranking': 'Рейтинг',
  'victory.replay': 'Грати знову',

  'eliminated.wait': 'Тебе виключено.',
  'eliminated.wait_end': 'Дочекайся кінця гри.',

  'history.title': 'Історія',
  'history.empty': 'Немає дій',
}

const dicts: Record<Lang, Dict> = { fr, uk }

export function t(lang: Lang, key: string, params?: Record<string, string>): string {
  let text = dicts[lang]?.[key] ?? dicts.fr[key] ?? key
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      text = text.replace(`{${k}}`, v)
    }
  }
  return text
}

export function getLangLabel(lang: Lang): string {
  return lang === 'fr' ? 'FR' : 'УК'
}

export function getLangName(lang: Lang): string {
  return lang === 'fr' ? 'Français' : 'Українська'
}
