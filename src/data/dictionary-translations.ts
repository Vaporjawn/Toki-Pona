// Multilingual dictionary definitions for Toki Pona words
// This file provides translations for word definitions in all supported languages

export interface MultilingualDefinitions {
  en: string[];
  es: string[];
  fr: string[];
  tok: string[];
  'zh-CN': string[];
  ja: string[];
  ko: string[];
  eo: string[];
}

export interface MultilingualExamples {
  en: string[];
  es: string[];
  fr: string[];
  tok: string[];
  'zh-CN': string[];
  ja: string[];
  ko: string[];
  eo: string[];
}

export const dictionaryTranslations: Record<string, {
  definitions: MultilingualDefinitions;
  examples: MultilingualExamples;
}> = {
  'a': {
    definitions: {
      en: ['ah, ha, ooh, oh (emotion/emphasis)'],
      es: ['ah, ja, ooh, oh (emoción/énfasis)'],
      fr: ['ah, ha, ooh, oh (émotion/emphase)'],
      tok: ['a (kalama pi pilin anu wawa)'],
      'zh-CN': ['啊，哈，哦，噢（情感/强调）'],
      ja: ['ああ、はあ、うう、おお（感情/強調）'],
      ko: ['아, 하, 우, 오 (감정/강조)'],
      eo: ['a, ha, u, o (emocio/emfazo)']
    },
    examples: {
      en: ['a! sina pona!', 'a a a! mi moku e kili ni!'],
      es: ['¡ah! ¡eres bueno!', '¡ah ah ah! ¡como esta fruta!'],
      fr: ['ah! tu es bon!', 'ah ah ah! je mange ce fruit!'],
      tok: ['a! sina pona!', 'a a a! mi moku e kili ni!'],
      'zh-CN': ['啊！你很好！', '啊啊啊！我吃这个水果！'],
      ja: ['ああ！あなたは良い！', 'ああああ！この果物を食べる！'],
      ko: ['아! 당신은 좋다!', '아 아 아! 나는 이 과일을 먹는다!'],
      eo: ['a! vi bonas!', 'a a a! mi manĝas ĉi tiun frukton!']
    }
  },
  'akesi': {
    definitions: {
      en: ['reptile, amphibian'],
      es: ['reptil, anfibio'],
      fr: ['reptile, amphibien'],
      tok: ['soweli pi sijelo lete'],
      'zh-CN': ['爬行动物，两栖动物'],
      ja: ['爬虫類、両生類'],
      ko: ['파충류, 양서류'],
      eo: ['reptilio, amfibio']
    },
    examples: {
      en: ['akesi li lon ma telo', 'akesi ni li suli'],
      es: ['el reptil está en el agua', 'este reptil es grande'],
      fr: ['le reptile est dans l\'eau', 'ce reptile est grand'],
      tok: ['akesi li lon ma telo', 'akesi ni li suli'],
      'zh-CN': ['爬行动物在水中', '这个爬行动物很大'],
      ja: ['爬虫類は水の中にいる', 'この爬虫類は大きい'],
      ko: ['파충류가 물에 있다', '이 파충류는 크다'],
      eo: ['la reptilio estas en la akvo', 'ĉi tiu reptilio estas granda']
    }
  },
  'ala': {
    definitions: {
      en: ['no, not, zero, nothing'],
      es: ['no, cero, nada'],
      fr: ['non, pas, zéro, rien'],
      tok: ['ala, wan ala'],
      'zh-CN': ['不，没有，零，什么都没有'],
      ja: ['いいえ、ない、ゼロ、何もない'],
      ko: ['아니오, 아니다, 영, 없음'],
      eo: ['ne, nul, nenio']
    },
    examples: {
      en: ['mi sona ala', 'ijo ala li lon'],
      es: ['no sé', 'no hay nada'],
      fr: ['je ne sais pas', 'il n\'y a rien'],
      tok: ['mi sona ala', 'ijo ala li lon'],
      'zh-CN': ['我不知道', '什么都没有'],
      ja: ['分からない', '何もない'],
      ko: ['모르겠다', '아무것도 없다'],
      eo: ['mi ne scias', 'nenio estas']
    }
  },
  'alasa': {
    definitions: {
      en: ['to hunt, forage; try to'],
      es: ['cazar, buscar comida; intentar'],
      fr: ['chasser, chercher de la nourriture; essayer de'],
      tok: ['alasa soweli, alasa moku'],
      'zh-CN': ['狩猎，觅食；尝试'],
      ja: ['狩る、採集する；しようとする'],
      ko: ['사냥하다, 채집하다; 시도하다'],
      eo: ['ĉasi, serĉi manĝaĵon; provi']
    },
    examples: {
      en: ['mi alasa e soweli', 'mi alasa pali e ilo'],
      es: ['cazo al animal', 'trato de hacer la herramienta'],
      fr: ['je chasse l\'animal', 'j\'essaie de faire l\'outil'],
      tok: ['mi alasa e soweli', 'mi alasa pali e ilo'],
      'zh-CN': ['我狩猎动物', '我尝试制作工具'],
      ja: ['動物を狩る', '道具を作ろうとする'],
      ko: ['동물을 사냥한다', '도구를 만들려고 한다'],
      eo: ['mi ĉasas la beston', 'mi provas fari la ilon']
    }
  },
  'ale': {
    definitions: {
      en: ['all, every, complete, whole'],
      es: ['todo, cada, completo, entero'],
      fr: ['tout, chaque, complet, entier'],
      tok: ['ale, wan ale'],
      'zh-CN': ['全部，每个，完整，整体'],
      ja: ['すべて、各々、完全、全体'],
      ko: ['모든, 각각의, 완전한, 전체'],
      eo: ['ĉio, ĉiu, kompleta, tuta']
    },
    examples: {
      en: ['ale li pona', 'mi lukin e ale'],
      es: ['todo es bueno', 'veo todo'],
      fr: ['tout est bon', 'je vois tout'],
      tok: ['ale li pona', 'mi lukin e ale'],
      'zh-CN': ['一切都很好', '我看到一切'],
      ja: ['すべて良い', 'すべてを見る'],
      ko: ['모든 것이 좋다', '모든 것을 본다'],
      eo: ['ĉio bonas', 'mi vidas ĉion']
    }
  },
  'anpa': {
    definitions: {
      en: ['bowing down, downward, humble, lowly, dependent'],
      es: ['inclinarse, hacia abajo, humilde, modesto, dependiente'],
      fr: ['s\'incliner, vers le bas, humble, modeste, dépendant'],
      tok: ['anpa, awen anpa'],
      'zh-CN': ['鞠躬，向下，谦逊，卑微，依赖'],
      ja: ['お辞儀、下向き、謙虚、卑しい、依存'],
      ko: ['절하기, 아래쪽, 겸손한, 낮은, 의존적인'],
      eo: ['kliniĝi, malsupren, humila, malalta, dependa']
    },
    examples: {
      en: ['mi anpa tawa sina', 'sike anpa'],
      es: ['me inclino ante ti', 'círculo inferior'],
      fr: ['je m\'incline devant toi', 'cercle inférieur'],
      tok: ['mi anpa tawa sina', 'sike anpa'],
      'zh-CN': ['我向你鞠躬', '下圆'],
      ja: ['あなたにお辞儀する', '下の円'],
      ko: ['당신에게 절한다', '아래 원'],
      eo: ['mi kliniĝas al vi', 'malsupra cirklo']
    }
  }
};