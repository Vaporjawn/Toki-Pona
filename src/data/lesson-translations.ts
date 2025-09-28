// Lesson Content Translations
// This file contains translated content for all lessons in multiple languages

// Translation interfaces for lesson content
export interface TranslatedVocabulary {
  word: string; // This stays the same across languages
  partOfSpeech: string[];
  definition: string;
  examples: string[];
}

export interface TranslatedExercise {
  id: string;
  type: 'translate-to-tp' | 'translate-to-en' | 'multiple-choice' | 'fill-blank' | 'pronunciation' | 'writing';
  question: string;
  options?: string[];
  answer: string;
  explanation?: string;
  hint?: string;
}

export interface TranslatedLessonSection {
  title: string;
  content: string;
  examples?: string[];
}

export interface TranslatedLesson {
  id: number;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'foundation' | 'grammar' | 'vocabulary' | 'culture' | 'practice';
  estimatedTime: number;
  xp: number;
  prerequisites?: number[];
  vocabulary: TranslatedVocabulary[];
  sections: TranslatedLessonSection[];
  exercises: TranslatedExercise[];
  culturalNotes?: string[];
  tips?: string[];
  nextSteps?: string;
}

// Lesson translations by language
export const lessonTranslations: Record<string, TranslatedLesson[]> = {
  en: [
    // Lesson 1 - English
    {
      id: 1,
      title: "Spelling and Pronunciation",
      description: "Learn the Toki Pona alphabet, pronunciation rules, and phonetic system",
      difficulty: 'beginner',
      category: 'foundation',
      estimatedTime: 30,
      xp: 50,
      vocabulary: [
        {
          word: "toki",
          partOfSpeech: ["noun", "verb"],
          definition: "language, speech; to speak, to say",
          examples: ["toki pona", "mi toki"]
        },
        {
          word: "pona",
          partOfSpeech: ["adjective", "verb", "noun"],
          definition: "good, simple, positive; to improve, to fix; goodness",
          examples: ["toki pona", "mi pona", "pona li kama"]
        }
      ],
      sections: [
        {
          title: "The Toki Pona Alphabet",
          content: "Toki Pona uses only 14 letters: a, e, i, j, k, l, m, n, o, p, s, t, u, w. Each letter has only one sound, making pronunciation very consistent and easy to learn.",
          examples: [
            "a - like 'a' in 'father'",
            "e - like 'e' in 'bet'",
            "i - like 'ee' in 'see'",
            "o - like 'o' in 'or'",
            "u - like 'oo' in 'boot'"
          ]
        },
        {
          title: "Syllable Structure",
          content: "Every syllable in Toki Pona follows the pattern (consonant + vowel) or just (vowel). This makes it very easy to pronounce and learn.",
          examples: [
            "ma (place)",
            "tomo (house)",
            "ale (all, everything)",
            "ijo (thing)"
          ]
        },
        {
          title: "Stress and Intonation",
          content: "The first syllable of every word is stressed. This consistent pattern makes Toki Pona easy to understand when spoken.",
          examples: [
            "TO-ki",
            "PO-na",
            "SO-we-li",
            "to-mo-NA (compound words stress the last part)"
          ]
        }
      ],
      exercises: [
        {
          id: "1-1",
          type: "pronunciation",
          question: "How do you pronounce 'toki'?",
          answer: "TOH-kee",
          explanation: "Remember to stress the first syllable: TO-ki"
        },
        {
          id: "1-2",
          type: "pronunciation",
          question: "How do you pronounce 'pona'?",
          answer: "POH-nah",
          explanation: "First syllable stress: PO-na"
        },
        {
          id: "1-3",
          type: "multiple-choice",
          question: "Which letters are NOT in the Toki Pona alphabet?",
          options: ["b, d, f", "a, e, i", "k, l, m", "j, w, n"],
          answer: "b, d, f",
          explanation: "Toki Pona only uses 14 letters, excluding many common English letters"
        }
      ],
      culturalNotes: [
        "Toki Pona was created by Sonja Lang in 2001 as an experiment in minimalism",
        "The name 'toki pona' means 'good language' or 'simple language'"
      ],
      tips: [
        "Practice reading aloud to get comfortable with the pronunciation",
        "Remember that every letter always makes the same sound",
        "If you know IPA: a=/a/, e=/e/, i=/i/, o=/o/, u=/u/"
      ]
    },

    // Lesson 2 - English
    {
      id: 2,
      title: "Basic Sentences and Grammar",
      description: "Learn the fundamental sentence structure 'X li Y' and basic grammar rules",
      difficulty: 'beginner',
      category: 'grammar',
      estimatedTime: 45,
      xp: 75,
      prerequisites: [1],
      vocabulary: [
        {
          word: "mi",
          partOfSpeech: ["pronoun"],
          definition: "I, me, we, us",
          examples: ["mi pona", "mi suli"]
        },
        {
          word: "sina",
          partOfSpeech: ["pronoun"],
          definition: "you",
          examples: ["sina pona", "sina suli"]
        },
        {
          word: "ona",
          partOfSpeech: ["pronoun"],
          definition: "he, she, it, they",
          examples: ["ona li pona", "ona li suli"]
        },
        {
          word: "li",
          partOfSpeech: ["particle"],
          definition: "separates subject from verb/predicate (except with mi/sina)",
          examples: ["ona li pona", "kili li suli"]
        },
        {
          word: "ike",
          partOfSpeech: ["adjective", "verb", "noun"],
          definition: "bad, evil, wrong; to harm; badness",
          examples: ["ike li kama", "mi ike"]
        },
        {
          word: "suli",
          partOfSpeech: ["adjective", "verb"],
          definition: "big, large, important; to grow",
          examples: ["ona li suli", "mi suli"]
        },
        {
          word: "lili",
          partOfSpeech: ["adjective", "verb"],
          definition: "small, little, young; to shrink",
          examples: ["ona li lili", "mi lili"]
        },
        {
          word: "kili",
          partOfSpeech: ["noun"],
          definition: "fruit, vegetable, mushroom",
          examples: ["kili li pona", "mi moku e kili"]
        },
        {
          word: "soweli",
          partOfSpeech: ["noun"],
          definition: "animal, beast, land mammal",
          examples: ["soweli li suli", "soweli li pona"]
        }
      ],
      sections: [
        {
          title: "The Basic Sentence Pattern",
          content: "The most fundamental sentence structure in Toki Pona is '[subject] li [predicate]'. This can mean '[subject] is [adjective]' or '[subject] does [verb]'.",
          examples: [
            "ona li pona. (He/she/it is good.)",
            "kili li suli. (The fruit is big.)",
            "soweli li lili. (The animal is small.)"
          ]
        },
        {
          title: "The Special Case: mi and sina",
          content: "When the subject is 'mi' (I/we) or 'sina' (you), you don't use 'li'. The sentence becomes simply '[mi/sina] [predicate]'.",
          examples: [
            "mi pona. (I am good.)",
            "sina suli. (You are big.)",
            "mi ike. (I am bad.)"
          ]
        },
        {
          title: "Multiple Meanings and Context",
          content: "Words in Toki Pona often have multiple related meanings. Context helps determine which meaning is intended.",
          examples: [
            "ona li suli. (He is big/important/great.)",
            "mi pona. (I am good/I improve/I fix.)",
            "sina lili. (You are small/young/few.)"
          ]
        }
      ],
      exercises: [
        {
          id: "2-1",
          type: "translate-to-tp",
          question: "Translate to Toki Pona: 'Animals are important.'",
          answer: "soweli li suli",
          explanation: "Since the subject is not mi or sina, we use 'li' between subject and predicate"
        },
        {
          id: "2-2",
          type: "translate-to-tp",
          question: "Translate to Toki Pona: 'I am good.'",
          answer: "mi pona",
          explanation: "With 'mi' as subject, we don't use 'li'"
        },
        {
          id: "2-3",
          type: "translate-to-en",
          question: "Translate to English: 'sina lili.'",
          answer: "You are small/little/young",
          explanation: "Multiple meanings are possible - context would clarify"
        },
        {
          id: "2-4",
          type: "multiple-choice",
          question: "Which sentence is correct?",
          options: ["mi li pona", "mi pona", "sina li suli", "ona suli"],
          answer: "mi pona",
          explanation: "With 'mi' and 'sina', we don't use 'li'"
        }
      ],
      tips: [
        "Remember: no 'li' with 'mi' and 'sina'",
        "Context is crucial for understanding multiple meanings",
        "Practice with simple sentences before moving to complex ones"
      ]
    }
  ],

  es: [
    // Lesson 1 - Spanish
    {
      id: 1,
      title: "Ortografía y Pronunciación",
      description: "Aprende el alfabeto de Toki Pona, las reglas de pronunciación y el sistema fonético",
      difficulty: 'beginner',
      category: 'foundation',
      estimatedTime: 30,
      xp: 50,
      vocabulary: [
        {
          word: "toki",
          partOfSpeech: ["sustantivo", "verbo"],
          definition: "idioma, habla; hablar, decir",
          examples: ["toki pona", "mi toki"]
        },
        {
          word: "pona",
          partOfSpeech: ["adjetivo", "verbo", "sustantivo"],
          definition: "bueno, simple, positivo; mejorar, arreglar; bondad",
          examples: ["toki pona", "mi pona", "pona li kama"]
        }
      ],
      sections: [
        {
          title: "El Alfabeto de Toki Pona",
          content: "Toki Pona usa solo 14 letras: a, e, i, j, k, l, m, n, o, p, s, t, u, w. Cada letra tiene solo un sonido, haciendo que la pronunciación sea muy consistente y fácil de aprender.",
          examples: [
            "a - como 'a' en 'casa'",
            "e - como 'e' en 'peso'",
            "i - como 'i' en 'sí'",
            "o - como 'o' en 'todo'",
            "u - como 'u' en 'luna'"
          ]
        },
        {
          title: "Estructura Silábica",
          content: "Cada sílaba en Toki Pona sigue el patrón (consonante + vocal) o solo (vocal). Esto hace que sea muy fácil de pronunciar y aprender.",
          examples: [
            "ma (lugar)",
            "tomo (casa)",
            "ale (todo)",
            "ijo (cosa)"
          ]
        },
        {
          title: "Acentuación y Entonación",
          content: "La primera sílaba de cada palabra es acentuada. Este patrón consistente hace que Toki Pona sea fácil de entender cuando se habla.",
          examples: [
            "TO-ki",
            "PO-na",
            "SO-we-li",
            "to-mo-NA (las palabras compuestas acentúan la última parte)"
          ]
        }
      ],
      exercises: [
        {
          id: "1-1",
          type: "pronunciation",
          question: "¿Cómo se pronuncia 'toki'?",
          answer: "TOH-kee",
          explanation: "Recuerda acentuar la primera sílaba: TO-ki"
        },
        {
          id: "1-2",
          type: "pronunciation",
          question: "¿Cómo se pronuncia 'pona'?",
          answer: "POH-nah",
          explanation: "Acentuación en la primera sílaba: PO-na"
        },
        {
          id: "1-3",
          type: "multiple-choice",
          question: "¿Qué letras NO están en el alfabeto de Toki Pona?",
          options: ["b, d, f", "a, e, i", "k, l, m", "j, w, n"],
          answer: "b, d, f",
          explanation: "Toki Pona solo usa 14 letras, excluyendo muchas letras comunes del español"
        }
      ],
      culturalNotes: [
        "Toki Pona fue creado por Sonja Lang en 2001 como un experimento en minimalismo",
        "El nombre 'toki pona' significa 'lenguaje bueno' o 'lenguaje simple'"
      ],
      tips: [
        "Practica leyendo en voz alta para sentirte cómodo con la pronunciación",
        "Recuerda que cada letra siempre hace el mismo sonido",
        "Si conoces IPA: a=/a/, e=/e/, i=/i/, o=/o/, u=/u/"
      ]
    },

    // Lesson 2 - Spanish
    {
      id: 2,
      title: "Oraciones Básicas y Gramática",
      description: "Aprende la estructura fundamental de oración 'X li Y' y las reglas gramaticales básicas",
      difficulty: 'beginner',
      category: 'grammar',
      estimatedTime: 45,
      xp: 75,
      prerequisites: [1],
      vocabulary: [
        {
          word: "mi",
          partOfSpeech: ["pronombre"],
          definition: "yo, me, nosotros, nos",
          examples: ["mi pona", "mi suli"]
        },
        {
          word: "sina",
          partOfSpeech: ["pronombre"],
          definition: "tú, usted",
          examples: ["sina pona", "sina suli"]
        },
        {
          word: "ona",
          partOfSpeech: ["pronombre"],
          definition: "él, ella, eso, ellos",
          examples: ["ona li pona", "ona li suli"]
        },
        {
          word: "li",
          partOfSpeech: ["partícula"],
          definition: "separa el sujeto del verbo/predicado (excepto con mi/sina)",
          examples: ["ona li pona", "kili li suli"]
        },
        {
          word: "ike",
          partOfSpeech: ["adjetivo", "verbo", "sustantivo"],
          definition: "malo, malvado, incorrecto; dañar; maldad",
          examples: ["ike li kama", "mi ike"]
        },
        {
          word: "suli",
          partOfSpeech: ["adjetivo", "verbo"],
          definition: "grande, importante; crecer",
          examples: ["ona li suli", "mi suli"]
        },
        {
          word: "lili",
          partOfSpeech: ["adjetivo", "verbo"],
          definition: "pequeño, joven; encoger",
          examples: ["ona li lili", "mi lili"]
        },
        {
          word: "kili",
          partOfSpeech: ["sustantivo"],
          definition: "fruta, verdura, hongo",
          examples: ["kili li pona", "mi moku e kili"]
        },
        {
          word: "soweli",
          partOfSpeech: ["sustantivo"],
          definition: "animal, bestia, mamífero terrestre",
          examples: ["soweli li suli", "soweli li pona"]
        }
      ],
      sections: [
        {
          title: "El Patrón Básico de Oración",
          content: "La estructura de oración más fundamental en Toki Pona es '[sujeto] li [predicado]'. Esto puede significar '[sujeto] es [adjetivo]' o '[sujeto] hace [verbo]'.",
          examples: [
            "ona li pona. (Él/ella/eso es bueno.)",
            "kili li suli. (La fruta es grande.)",
            "soweli li lili. (El animal es pequeño.)"
          ]
        },
        {
          title: "El Caso Especial: mi y sina",
          content: "Cuando el sujeto es 'mi' (yo/nosotros) o 'sina' (tú), no usas 'li'. La oración se convierte simplemente en '[mi/sina] [predicado]'.",
          examples: [
            "mi pona. (Yo soy bueno.)",
            "sina suli. (Tú eres grande.)",
            "mi ike. (Yo soy malo.)"
          ]
        },
        {
          title: "Múltiples Significados y Contexto",
          content: "Las palabras en Toki Pona a menudo tienen múltiples significados relacionados. El contexto ayuda a determinar qué significado se pretende.",
          examples: [
            "ona li suli. (Él es grande/importante/genial.)",
            "mi pona. (Yo soy bueno/yo mejoro/yo arreglo.)",
            "sina lili. (Tú eres pequeño/joven/pocos.)"
          ]
        }
      ],
      exercises: [
        {
          id: "2-1",
          type: "translate-to-tp",
          question: "Traduce a Toki Pona: 'Los animales son importantes.'",
          answer: "soweli li suli",
          explanation: "Como el sujeto no es mi o sina, usamos 'li' entre el sujeto y el predicado"
        },
        {
          id: "2-2",
          type: "translate-to-tp",
          question: "Traduce a Toki Pona: 'Yo soy bueno.'",
          answer: "mi pona",
          explanation: "Con 'mi' como sujeto, no usamos 'li'"
        },
        {
          id: "2-3",
          type: "translate-to-en",
          question: "Traduce al español: 'sina lili.'",
          answer: "Tú eres pequeño/joven",
          explanation: "Múltiples significados son posibles - el contexto aclararía"
        },
        {
          id: "2-4",
          type: "multiple-choice",
          question: "¿Qué oración es correcta?",
          options: ["mi li pona", "mi pona", "sina li suli", "ona suli"],
          answer: "mi pona",
          explanation: "Con 'mi' y 'sina', no usamos 'li'"
        }
      ],
      tips: [
        "Recuerda: no 'li' con 'mi' y 'sina'",
        "El contexto es crucial para entender múltiples significados",
        "Practica con oraciones simples antes de pasar a las complejas"
      ]
    }
  ],

  fr: [
    // Lesson 1 - French
    {
      id: 1,
      title: "Orthographe et Prononciation",
      description: "Apprenez l'alphabet de Toki Pona, les règles de prononciation et le système phonétique",
      difficulty: 'beginner',
      category: 'foundation',
      estimatedTime: 30,
      xp: 50,
      vocabulary: [
        {
          word: "toki",
          partOfSpeech: ["nom", "verbe"],
          definition: "langue, parole ; parler, dire",
          examples: ["toki pona", "mi toki"]
        },
        {
          word: "pona",
          partOfSpeech: ["adjectif", "verbe", "nom"],
          definition: "bon, simple, positif ; améliorer, réparer ; bonté",
          examples: ["toki pona", "mi pona", "pona li kama"]
        }
      ],
      sections: [
        {
          title: "L'Alphabet de Toki Pona",
          content: "Toki Pona n'utilise que 14 lettres : a, e, i, j, k, l, m, n, o, p, s, t, u, w. Chaque lettre n'a qu'un seul son, rendant la prononciation très cohérente et facile à apprendre.",
          examples: [
            "a - comme 'a' dans 'papa'",
            "e - comme 'é' dans 'café'",
            "i - comme 'i' dans 'lit'",
            "o - comme 'o' dans 'dos'",
            "u - comme 'ou' dans 'loup'"
          ]
        },
        {
          title: "Structure Syllabique",
          content: "Chaque syllabe en Toki Pona suit le modèle (consonne + voyelle) ou juste (voyelle). Cela rend la langue très facile à prononcer et à apprendre.",
          examples: [
            "ma (endroit)",
            "tomo (maison)",
            "ale (tout)",
            "ijo (chose)"
          ]
        },
        {
          title: "Accent et Intonation",
          content: "La première syllabe de chaque mot est accentuée. Ce modèle cohérent rend Toki Pona facile à comprendre quand on le parle.",
          examples: [
            "TO-ki",
            "PO-na",
            "SO-we-li",
            "to-mo-NA (les mots composés accentuent la dernière partie)"
          ]
        }
      ],
      exercises: [
        {
          id: "1-1",
          type: "pronunciation",
          question: "Comment prononcez-vous 'toki' ?",
          answer: "TOH-kee",
          explanation: "N'oubliez pas d'accentuer la première syllabe : TO-ki"
        },
        {
          id: "1-2",
          type: "pronunciation",
          question: "Comment prononcez-vous 'pona' ?",
          answer: "POH-nah",
          explanation: "Accent sur la première syllabe : PO-na"
        },
        {
          id: "1-3",
          type: "multiple-choice",
          question: "Quelles lettres ne sont PAS dans l'alphabet de Toki Pona ?",
          options: ["b, d, f", "a, e, i", "k, l, m", "j, w, n"],
          answer: "b, d, f",
          explanation: "Toki Pona n'utilise que 14 lettres, excluant de nombreuses lettres françaises communes"
        }
      ],
      culturalNotes: [
        "Toki Pona a été créé par Sonja Lang en 2001 comme une expérience de minimalisme",
        "Le nom 'toki pona' signifie 'bon langage' ou 'langage simple'"
      ],
      tips: [
        "Pratiquez la lecture à haute voix pour vous familiariser avec la prononciation",
        "Rappelez-vous que chaque lettre fait toujours le même son",
        "Si vous connaissez l'API : a=/a/, e=/e/, i=/i/, o=/o/, u=/u/"
      ]
    },

    // Lesson 2 - French
    {
      id: 2,
      title: "Phrases de Base et Grammaire",
      description: "Apprenez la structure de phrase fondamentale 'X li Y' et les règles grammaticales de base",
      difficulty: 'beginner',
      category: 'grammar',
      estimatedTime: 45,
      xp: 75,
      prerequisites: [1],
      vocabulary: [
        {
          word: "mi",
          partOfSpeech: ["pronom"],
          definition: "je, moi, nous",
          examples: ["mi pona", "mi suli"]
        },
        {
          word: "sina",
          partOfSpeech: ["pronom"],
          definition: "tu, vous",
          examples: ["sina pona", "sina suli"]
        },
        {
          word: "ona",
          partOfSpeech: ["pronom"],
          definition: "il, elle, ça, ils",
          examples: ["ona li pona", "ona li suli"]
        },
        {
          word: "li",
          partOfSpeech: ["particule"],
          definition: "sépare le sujet du verbe/prédicat (sauf avec mi/sina)",
          examples: ["ona li pona", "kili li suli"]
        },
        {
          word: "ike",
          partOfSpeech: ["adjectif", "verbe", "nom"],
          definition: "mauvais, mal, faux ; nuire ; méchanceté",
          examples: ["ike li kama", "mi ike"]
        },
        {
          word: "suli",
          partOfSpeech: ["adjectif", "verbe"],
          definition: "grand, important ; grandir",
          examples: ["ona li suli", "mi suli"]
        },
        {
          word: "lili",
          partOfSpeech: ["adjectif", "verbe"],
          definition: "petit, jeune ; rétrécir",
          examples: ["ona li lili", "mi lili"]
        },
        {
          word: "kili",
          partOfSpeech: ["nom"],
          definition: "fruit, légume, champignon",
          examples: ["kili li pona", "mi moku e kili"]
        },
        {
          word: "soweli",
          partOfSpeech: ["nom"],
          definition: "animal, bête, mammifère terrestre",
          examples: ["soweli li suli", "soweli li pona"]
        }
      ],
      sections: [
        {
          title: "Le Modèle de Phrase de Base",
          content: "La structure de phrase la plus fondamentale en Toki Pona est '[sujet] li [prédicat]'. Cela peut signifier '[sujet] est [adjectif]' ou '[sujet] fait [verbe]'.",
          examples: [
            "ona li pona. (Il/elle/ça est bon.)",
            "kili li suli. (Le fruit est grand.)",
            "soweli li lili. (L'animal est petit.)"
          ]
        },
        {
          title: "Le Cas Spécial : mi et sina",
          content: "Quand le sujet est 'mi' (je/nous) ou 'sina' (tu), vous n'utilisez pas 'li'. La phrase devient simplement '[mi/sina] [prédicat]'.",
          examples: [
            "mi pona. (Je suis bon.)",
            "sina suli. (Tu es grand.)",
            "mi ike. (Je suis mauvais.)"
          ]
        },
        {
          title: "Significations Multiples et Contexte",
          content: "Les mots en Toki Pona ont souvent plusieurs significations liées. Le contexte aide à déterminer quelle signification est voulue.",
          examples: [
            "ona li suli. (Il est grand/important/génial.)",
            "mi pona. (Je suis bon/j'améliore/je répare.)",
            "sina lili. (Tu es petit/jeune/peu nombreux.)"
          ]
        }
      ],
      exercises: [
        {
          id: "2-1",
          type: "translate-to-tp",
          question: "Traduisez en Toki Pona : 'Les animaux sont importants.'",
          answer: "soweli li suli",
          explanation: "Comme le sujet n'est pas mi ou sina, nous utilisons 'li' entre le sujet et le prédicat"
        },
        {
          id: "2-2",
          type: "translate-to-tp",
          question: "Traduisez en Toki Pona : 'Je suis bon.'",
          answer: "mi pona",
          explanation: "Avec 'mi' comme sujet, nous n'utilisons pas 'li'"
        },
        {
          id: "2-3",
          type: "translate-to-en",
          question: "Traduisez en français : 'sina lili.'",
          answer: "Tu es petit/jeune",
          explanation: "Plusieurs significations sont possibles - le contexte clarifierait"
        },
        {
          id: "2-4",
          type: "multiple-choice",
          question: "Quelle phrase est correcte ?",
          options: ["mi li pona", "mi pona", "sina li suli", "ona suli"],
          answer: "mi pona",
          explanation: "Avec 'mi' et 'sina', nous n'utilisons pas 'li'"
        }
      ],
      tips: [
        "Rappelez-vous : pas de 'li' avec 'mi' et 'sina'",
        "Le contexte est crucial pour comprendre les significations multiples",
        "Pratiquez avec des phrases simples avant de passer aux complexes"
      ]
    }
  ],

  'zh-CN': [
    // Lesson 1 - Chinese Simplified
    {
      id: 1,
      title: "拼写和发音",
      description: "学习道本语字母表、发音规则和语音系统",
      difficulty: 'beginner',
      category: 'foundation',
      estimatedTime: 30,
      xp: 50,
      vocabulary: [
        {
          word: "toki",
          partOfSpeech: ["名词", "动词"],
          definition: "语言，言语；说话，说",
          examples: ["toki pona", "mi toki"]
        },
        {
          word: "pona",
          partOfSpeech: ["形容词", "动词", "名词"],
          definition: "好的，简单的，积极的；改善，修理；美好",
          examples: ["toki pona", "mi pona", "pona li kama"]
        }
      ],
      sections: [
        {
          title: "道本语字母表",
          content: "道本语只使用14个字母：a、e、i、j、k、l、m、n、o、p、s、t、u、w。每个字母只有一种发音，使发音非常一致且易于学习。",
          examples: [
            "a - 如'啊'的发音",
            "e - 如'诶'的发音",
            "i - 如'一'的发音",
            "o - 如'哦'的发音",
            "u - 如'乌'的发音"
          ]
        }
      ],
      exercises: [
        {
          id: "1-1",
          type: "pronunciation",
          question: "'toki'怎么发音？",
          answer: "TOH-kee",
          explanation: "记住要重读第一个音节：TO-ki"
        }
      ],
      culturalNotes: [
        "道本语是由索尼娅·朗于2001年创造的，作为极简主义的实验",
        "'toki pona'这个名字意思是'好语言'或'简单语言'"
      ],
      tips: [
        "练习大声朗读以熟悉发音",
        "记住每个字母总是发同样的音"
      ]
    },

    // Lesson 2 - Chinese Simplified
    {
      id: 2,
      title: "基本句子和语法",
      description: "学习基本句型'X li Y'和基本语法规则",
      difficulty: 'beginner',
      category: 'grammar',
      estimatedTime: 45,
      xp: 75,
      prerequisites: [1],
      vocabulary: [
        {
          word: "mi",
          partOfSpeech: ["代词"],
          definition: "我，我们",
          examples: ["mi pona", "mi suli"]
        },
        {
          word: "sina",
          partOfSpeech: ["代词"],
          definition: "你，您",
          examples: ["sina pona", "sina suli"]
        },
        {
          word: "ona",
          partOfSpeech: ["代词"],
          definition: "他，她，它，他们",
          examples: ["ona li pona", "ona li suli"]
        },
        {
          word: "li",
          partOfSpeech: ["小品词"],
          definition: "分隔主语和动词/谓语（mi/sina除外）",
          examples: ["ona li pona", "kili li suli"]
        }
      ],
      sections: [
        {
          title: "基本句型",
          content: "道本语最基本的句子结构是'[主语] li [谓语]'。这可以表示'[主语]是[形容词]'或'[主语]做[动词]'。",
          examples: [
            "ona li pona. (他/她/它是好的。)",
            "kili li suli. (水果是大的。)"
          ]
        }
      ],
      exercises: [
        {
          id: "2-1",
          type: "translate-to-tp",
          question: "翻译成道本语：'动物很重要。'",
          answer: "soweli li suli",
          explanation: "因为主语不是mi或sina，我们在主语和谓语之间使用'li'"
        }
      ],
      tips: [
        "记住：mi和sina不用'li'",
        "语境对理解多重含义至关重要"
      ]
    }
  ],

  ja: [
    // Lesson 1 - Japanese
    {
      id: 1,
      title: "つづりと発音",
      description: "トキポナのアルファベット、発音規則、音韻体系を学ぶ",
      difficulty: 'beginner',
      category: 'foundation',
      estimatedTime: 30,
      xp: 50,
      vocabulary: [
        {
          word: "toki",
          partOfSpeech: ["名詞", "動詞"],
          definition: "言語、話、話す、言う",
          examples: ["toki pona", "mi toki"]
        },
        {
          word: "pona",
          partOfSpeech: ["形容詞", "動詞", "名詞"],
          definition: "良い、簡単、積極的、改善する、直す、良さ",
          examples: ["toki pona", "mi pona", "pona li kama"]
        }
      ],
      sections: [
        {
          title: "トキポナのアルファベット",
          content: "トキポナは14文字のみを使用します：a、e、i、j、k、l、m、n、o、p、s、t、u、w。各文字は一つの音のみを持ち、発音が非常に一貫していて学習しやすいです。",
          examples: [
            "a - 「あ」のような音",
            "e - 「え」のような音",
            "i - 「い」のような音",
            "o - 「お」のような音",
            "u - 「う」のような音"
          ]
        }
      ],
      exercises: [
        {
          id: "1-1",
          type: "pronunciation",
          question: "'toki'はどう発音しますか？",
          answer: "TOH-kee",
          explanation: "最初の音節にアクセントを置くことを忘れずに：TO-ki"
        }
      ],
      culturalNotes: [
        "トキポナは2001年にソニア・ラングによってミニマリズムの実験として作られました",
        "'toki pona'という名前は「良い言語」または「シンプルな言語」を意味します"
      ],
      tips: [
        "発音に慣れるために音読練習をしてください",
        "各文字が常に同じ音を作ることを覚えてください"
      ]
    },

    // Lesson 2 - Japanese
    {
      id: 2,
      title: "基本文と文法",
      description: "基本文構造「X li Y」と基本文法規則を学ぶ",
      difficulty: 'beginner',
      category: 'grammar',
      estimatedTime: 45,
      xp: 75,
      prerequisites: [1],
      vocabulary: [
        {
          word: "mi",
          partOfSpeech: ["代名詞"],
          definition: "私、私たち",
          examples: ["mi pona", "mi suli"]
        },
        {
          word: "sina",
          partOfSpeech: ["代名詞"],
          definition: "あなた",
          examples: ["sina pona", "sina suli"]
        },
        {
          word: "ona",
          partOfSpeech: ["代名詞"],
          definition: "彼、彼女、それ、彼ら",
          examples: ["ona li pona", "ona li suli"]
        },
        {
          word: "li",
          partOfSpeech: ["助詞"],
          definition: "主語と動詞/述語を分ける（mi/sinaを除く）",
          examples: ["ona li pona", "kili li suli"]
        }
      ],
      sections: [
        {
          title: "基本文型",
          content: "トキポナの最も基本的な文構造は「[主語] li [述語]」です。これは「[主語]は[形容詞]です」または「[主語]が[動詞]する」を意味できます。",
          examples: [
            "ona li pona. (彼/彼女/それは良いです。)",
            "kili li suli. (果物は大きいです。)"
          ]
        }
      ],
      exercises: [
        {
          id: "2-1",
          type: "translate-to-tp",
          question: "トキポナに翻訳してください：「動物は重要です。」",
          answer: "soweli li suli",
          explanation: "主語がmiやsinaでないので、主語と述語の間に'li'を使います"
        }
      ],
      tips: [
        "覚えておいてください：miとsinaでは'li'は使いません",
        "複数の意味を理解するには文脈が重要です"
      ]
    }
  ],

  ko: [
    // Lesson 1 - Korean
    {
      id: 1,
      title: "철자와 발음",
      description: "토키 포나 알파벳, 발음 규칙, 음성 체계를 배우세요",
      difficulty: 'beginner',
      category: 'foundation',
      estimatedTime: 30,
      xp: 50,
      vocabulary: [
        {
          word: "toki",
          partOfSpeech: ["명사", "동사"],
          definition: "언어, 말; 말하다, 이야기하다",
          examples: ["toki pona", "mi toki"]
        },
        {
          word: "pona",
          partOfSpeech: ["형용사", "동사", "명사"],
          definition: "좋은, 간단한, 긍정적인; 개선하다, 고치다; 선함",
          examples: ["toki pona", "mi pona", "pona li kama"]
        }
      ],
      sections: [
        {
          title: "토키 포나 알파벳",
          content: "토키 포나는 14개의 글자만 사용합니다: a, e, i, j, k, l, m, n, o, p, s, t, u, w. 각 글자는 하나의 소리만 가지므로 발음이 매우 일관되고 배우기 쉽습니다.",
          examples: [
            "a - '아'와 같은 소리",
            "e - '에'와 같은 소리",
            "i - '이'와 같은 소리",
            "o - '오'와 같은 소리",
            "u - '우'와 같은 소리"
          ]
        }
      ],
      exercises: [
        {
          id: "1-1",
          type: "pronunciation",
          question: "'toki'는 어떻게 발음하나요?",
          answer: "TOH-kee",
          explanation: "첫 번째 음절에 강세를 두는 것을 기억하세요: TO-ki"
        }
      ],
      culturalNotes: [
        "토키 포나는 2001년 소냐 랑이 미니멀리즘 실험으로 만들었습니다",
        "'toki pona'라는 이름은 '좋은 언어' 또는 '간단한 언어'를 의미합니다"
      ],
      tips: [
        "발음에 익숙해지도록 소리 내어 읽기를 연습하세요",
        "각 글자가 항상 같은 소리를 낸다는 것을 기억하세요"
      ]
    },

    // Lesson 2 - Korean
    {
      id: 2,
      title: "기본 문장과 문법",
      description: "기본 문장 구조 'X li Y'와 기본 문법 규칙을 배우세요",
      difficulty: 'beginner',
      category: 'grammar',
      estimatedTime: 45,
      xp: 75,
      prerequisites: [1],
      vocabulary: [
        {
          word: "mi",
          partOfSpeech: ["대명사"],
          definition: "나, 우리",
          examples: ["mi pona", "mi suli"]
        },
        {
          word: "sina",
          partOfSpeech: ["대명사"],
          definition: "너, 당신",
          examples: ["sina pona", "sina suli"]
        },
        {
          word: "ona",
          partOfSpeech: ["대명사"],
          definition: "그, 그녀, 그것, 그들",
          examples: ["ona li pona", "ona li suli"]
        },
        {
          word: "li",
          partOfSpeech: ["조사"],
          definition: "주어와 동사/서술어를 분리함 (mi/sina 제외)",
          examples: ["ona li pona", "kili li suli"]
        }
      ],
      sections: [
        {
          title: "기본 문장 패턴",
          content: "토키 포나의 가장 기본적인 문장 구조는 '[주어] li [서술어]'입니다. 이는 '[주어]는 [형용사]이다' 또는 '[주어]가 [동사]한다'를 의미할 수 있습니다.",
          examples: [
            "ona li pona. (그/그녀/그것은 좋다.)",
            "kili li suli. (과일이 크다.)"
          ]
        }
      ],
      exercises: [
        {
          id: "2-1",
          type: "translate-to-tp",
          question: "토키 포나로 번역하세요: '동물들은 중요하다.'",
          answer: "soweli li suli",
          explanation: "주어가 mi나 sina가 아니므로 주어와 서술어 사이에 'li'를 사용합니다"
        }
      ],
      tips: [
        "기억하세요: mi와 sina에는 'li'를 사용하지 않습니다",
        "여러 의미를 이해하는 데 맥락이 중요합니다"
      ]
    }
  ],

  eo: [
    // Lesson 1 - Esperanto
    {
      id: 1,
      title: "Literumado kaj Prononco",
      description: "Lernu la alfabeton de Tokipono, prononc-regulojn kaj fonetikan sistemon",
      difficulty: 'beginner',
      category: 'foundation',
      estimatedTime: 30,
      xp: 50,
      vocabulary: [
        {
          word: "toki",
          partOfSpeech: ["substantivo", "verbo"],
          definition: "lingvo, parolo; paroli, diri",
          examples: ["toki pona", "mi toki"]
        },
        {
          word: "pona",
          partOfSpeech: ["adjektivo", "verbo", "substantivo"],
          definition: "bona, simpla, pozitiva; plibonigi, ripari; boneco",
          examples: ["toki pona", "mi pona", "pona li kama"]
        }
      ],
      sections: [
        {
          title: "La Alfabeto de Tokipono",
          content: "Tokipono uzas nur 14 literojn: a, e, i, j, k, l, m, n, o, p, s, t, u, w. Ĉiu litero havas nur unu sonon, igante la prononcon tre konsekvencan kaj facile lerneblan.",
          examples: [
            "a - kiel 'a' en 'patro'",
            "e - kiel 'e' en 'tempo'",
            "i - kiel 'i' en 'fino'",
            "o - kiel 'o' en 'domo'",
            "u - kiel 'u' en 'luno'"
          ]
        }
      ],
      exercises: [
        {
          id: "1-1",
          type: "pronunciation",
          question: "Kiel oni prononcu 'toki'?",
          answer: "TOH-kee",
          explanation: "Memoru akcenti la unuan silabon: TO-ki"
        }
      ],
      culturalNotes: [
        "Tokipono estis kreita de Sonja Lang en 2001 kiel eksperimento pri minimalismo",
        "La nomo 'toki pona' signifas 'bona lingvo' aŭ 'simpla lingvo'"
      ],
      tips: [
        "Praktiku legadon laŭte por alkutimiĝi al la prononco",
        "Memoru ke ĉiu litero ĉiam faras la saman sonon"
      ]
    },

    // Lesson 2 - Esperanto
    {
      id: 2,
      title: "Bazaj Frazoj kaj Gramatiko",
      description: "Lernu la fundamentan fraz-strukturon 'X li Y' kaj bazajn gramatik-regulojn",
      difficulty: 'beginner',
      category: 'grammar',
      estimatedTime: 45,
      xp: 75,
      prerequisites: [1],
      vocabulary: [
        {
          word: "mi",
          partOfSpeech: ["pronomo"],
          definition: "mi, ni",
          examples: ["mi pona", "mi suli"]
        },
        {
          word: "sina",
          partOfSpeech: ["pronomo"],
          definition: "vi",
          examples: ["sina pona", "sina suli"]
        },
        {
          word: "ona",
          partOfSpeech: ["pronomo"],
          definition: "li, ŝi, ĝi, ili",
          examples: ["ona li pona", "ona li suli"]
        },
        {
          word: "li",
          partOfSpeech: ["partikulo"],
          definition: "apartiga subjekton de verbo/predikato (escepte kun mi/sina)",
          examples: ["ona li pona", "kili li suli"]
        }
      ],
      sections: [
        {
          title: "La Baza Fraz-Ŝablono",
          content: "La plej fundamenta fraz-strukturo en Tokipono estas '[subjekto] li [predikato]'. Ĉi tio povas signifi '[subjekto] estas [adjektivo]' aŭ '[subjekto] faras [verbo]'.",
          examples: [
            "ona li pona. (Li/ŝi/ĝi estas bona.)",
            "kili li suli. (La frukto estas granda.)"
          ]
        }
      ],
      exercises: [
        {
          id: "2-1",
          type: "translate-to-tp",
          question: "Traduku al Tokipono: 'Bestoj estas gravaj.'",
          answer: "soweli li suli",
          explanation: "Ĉar la subjekto ne estas mi aŭ sina, ni uzas 'li' inter subjekto kaj predikato"
        }
      ],
      tips: [
        "Memoru: neniu 'li' kun 'mi' kaj 'sina'",
        "Kunteksto estas decida por kompreni multoblajn signifojn"
      ]
    }
  ],

  ru: [
    // Lesson 1 - Russian
    {
      id: 1,
      title: "Правописание и Произношение",
      description: "Изучите алфавит Toki Pona, правила произношения и фонетическую систему",
      difficulty: 'beginner',
      category: 'foundation',
      estimatedTime: 30,
      xp: 50,
      vocabulary: [
        {
          word: "toki",
          partOfSpeech: ["существительное", "глагол"],
          definition: "язык, речь; говорить, сказать",
          examples: ["toki pona", "mi toki"]
        },
        {
          word: "pona",
          partOfSpeech: ["прилагательное", "глагол", "существительное"],
          definition: "хороший, простой, позитивный; улучшать, чинить; добро",
          examples: ["toki pona", "mi pona", "pona li kama"]
        }
      ],
      sections: [
        {
          title: "Алфавит Toki Pona",
          content: "Toki Pona использует только 14 букв: a, e, i, j, k, l, m, n, o, p, s, t, u, w. Каждая буква имеет только один звук, что делает произношение очень последовательным и лёгким для изучения.",
          examples: [
            "a - как 'а' в 'мама'",
            "e - как 'э' в 'это'",
            "i - как 'и' в 'игра'",
            "o - как 'о' в 'дом'",
            "u - как 'у' в 'луна'"
          ]
        },
        {
          title: "Слоговая Структура",
          content: "Каждый слог в Toki Pona имеет форму (согласная + гласная) или просто (гласная). Это упрощает произношение и запоминание.",
          examples: [
            "ma (место)",
            "tomo (дом)",
            "ale (всё)",
            "ijo (вещь)"
          ]
        },
        {
          title: "Ударение и Интонация",
          content: "Ударение всегда падает на первый слог слова. Эта последовательность помогает легче понимать Toki Pona на слух.",
          examples: [
            "TO-ki",
            "PO-na",
            "SO-we-li",
            "to-mo-NA (в сложных словах ударение на последней части)"
          ]
        }
      ],
      exercises: [
        {
          id: "1-1",
          type: "pronunciation",
          question: "Как произносится 'toki'?",
          answer: "TOH-kee",
          explanation: "Помните про ударение на первом слоге: TO-ki"
        },
        {
          id: "1-2",
          type: "pronunciation",
          question: "Как произносится 'pona'?",
          answer: "POH-nah",
          explanation: "Ударение на первом слоге: PO-na"
        },
        {
          id: "1-3",
          type: "multiple-choice",
          question: "Какие буквы НЕ входят в алфавит Toki Pona?",
          options: ["b, d, f", "a, e, i", "k, l, m", "j, w, n"],
          answer: "b, d, f",
          explanation: "Toki Pona использует только 14 букв, исключая многие привычные латинские буквы"
        }
      ],
      culturalNotes: [
        "Toki Pona был создан Соней Ланг в 2001 году как эксперимент в минимализме",
        "Название 'toki pona' означает 'хороший язык' или 'простой язык'"
      ],
      tips: [
        "Практикуйте чтение вслух, чтобы привыкнуть к произношению",
        "Помните, каждая буква всегда звучит одинаково",
        "Если знаете МФА: a=/a/, e=/e/, i=/i/, o=/o/, u=/u/"
      ]
    },
    // Lesson 2 - Russian
    {
      id: 2,
      title: "Базовые Предложения и Грамматика",
      description: "Изучите базовую структуру предложения 'X li Y' и основные грамматические правила",
      difficulty: 'beginner',
      category: 'grammar',
      estimatedTime: 45,
      xp: 75,
      prerequisites: [1],
      vocabulary: [
        {
          word: "mi",
          partOfSpeech: ["местоимение"],
          definition: "я, мы",
          examples: ["mi pona", "mi suli"]
        },
        {
          word: "sina",
          partOfSpeech: ["местоимение"],
          definition: "ты, вы",
          examples: ["sina pona", "sina suli"]
        },
        {
          word: "ona",
          partOfSpeech: ["местоимение"],
          definition: "он, она, оно, они",
          examples: ["ona li pona", "ona li suli"]
        },
        {
          word: "li",
          partOfSpeech: ["частица"],
          definition: "отделяет подлежащее от сказуемого (кроме mi/sina)",
          examples: ["ona li pona", "kili li suli"]
        },
        {
          word: "ike",
          partOfSpeech: ["прилагательное", "глагол", "существительное"],
          definition: "плохой, злой, неверный; вредить; зло",
          examples: ["ike li kama", "mi ike"]
        },
        {
          word: "suli",
          partOfSpeech: ["прилагательное", "глагол"],
          definition: "большой, важный; расти",
          examples: ["ona li suli", "mi suli"]
        },
        {
          word: "lili",
          partOfSpeech: ["прилагательное", "глагол"],
          definition: "маленький, молодой; уменьшаться",
          examples: ["ona li lili", "mi lili"]
        },
        {
          word: "kili",
          partOfSpeech: ["существительное"],
          definition: "фрукт, овощ, гриб",
          examples: ["kili li pona", "mi moku e kili"]
        },
        {
          word: "soweli",
          partOfSpeech: ["существительное"],
          definition: "животное, зверь, наземный млекопитающий",
          examples: ["soweli li suli", "soweli li pona"]
        }
      ],
      sections: [
        {
          title: "Базовая Модель Предложения",
          content: "Самая фундаментальная структура предложения в Toki Pona — '[подлежащее] li [сказуемое]'. Это может означать '[подлежащее] является [прилагательное]' или '[подлежащее] делает [глагол]'.",
          examples: [
            "ona li pona. (Он/она/оно хорош(а).)",
            "kili li suli. (Фрукт большой.)",
            "soweli li lili. (Животное маленькое.)"
          ]
        },
        {
          title: "Особый Случай: mi и sina",
          content: "Когда подлежащее — 'mi' (я/мы) или 'sina' (ты/вы), частица 'li' не используется. Предложение становится просто '[mi/sina] [сказуемое]'.",
          examples: [
            "mi pona. (Я хороший / Мне хорошо.)",
            "sina suli. (Ты большой / Ты важен.)",
            "mi ike. (Мне плохо / Я плох.)"
          ]
        },
        {
          title: "Множественные Значения и Контекст",
          content: "Слова в Toki Pona часто имеют несколько родственных значений. Контекст помогает выбрать нужное значение.",
          examples: [
            "ona li suli. (Он большой/важный/великий.)",
            "mi pona. (Я хороший / я улучшаю / я чиню.)",
            "sina lili. (Ты маленький / молодой / немногочисленный.)"
          ]
        }
      ],
      exercises: [
        {
          id: "2-1",
          type: "translate-to-tp",
          question: "Переведите на Toki Pona: 'Животные важны.'",
          answer: "soweli li suli",
          explanation: "Поскольку подлежащее не mi и не sina, мы используем 'li' между подлежащим и сказуемым"
        },
        {
          id: "2-2",
          type: "translate-to-tp",
          question: "Переведите на Toki Pona: 'Я хороший.'",
          answer: "mi pona",
          explanation: "С подлежащим 'mi' 'li' не используется"
        },
        {
          id: "2-3",
          type: "translate-to-en",
          question: "Переведите на русский: 'sina lili.'",
          answer: "Ты маленький / молодой",
          explanation: "Возможны несколько значений — контекст уточняет"
        },
        {
          id: "2-4",
          type: "multiple-choice",
          question: "Какое предложение корректно?",
          options: ["mi li pona", "mi pona", "sina li suli", "ona suli"],
          answer: "mi pona",
          explanation: "С 'mi' и 'sina' частица 'li' не используется"
        }
      ],
      tips: [
        "Помните: нет 'li' с 'mi' и 'sina'",
        "Контекст критически важен для понимания вариантов значения",
        "Практикуйтесь сначала с простыми предложениями"
      ]
    }
  ],
  ar: [
    // Lesson 1 - Arabic (MSA)
    {
      id: 1,
      title: "التهجئة والنطق",
      description: "تعلّم أبجدية لغة توكي بونا وقواعد النطق والنظام الصوتي",
      difficulty: 'beginner',
      category: 'foundation',
      estimatedTime: 30,
      xp: 50,
      vocabulary: [
        {
          word: "toki",
          partOfSpeech: ["اسم", "فعل"],
          definition: "لغة، كلام؛ يتكلم، يقول",
          examples: ["toki pona", "mi toki"]
        },
        {
          word: "pona",
          partOfSpeech: ["صفة", "فعل", "اسم"],
          definition: "جيد، بسيط، إيجابي؛ يُحسّن، يُصلح؛ الخير",
          examples: ["toki pona", "mi pona", "pona li kama"]
        }
      ],
      sections: [
        {
          title: "أبجدية توكي بونا",
          content: "تستخدم توكي بونا 14 حرفًا فقط: a, e, i, j, k, l, m, n, o, p, s, t, u, w. لكل حرف صوت واحد فقط، مما يجعل النطق ثابتًا وسهل التعلّم.",
          examples: [
            "a - مثل 'ا' في 'بابا'",
            "e - مثل 'يِ' خفيفة بين 'إ' و'ي'",
            "i - مثل 'ي' في 'بيت'",
            "o - مثل 'و' في 'نور' (دون إطالة)",
            "u - مثل 'و' في 'كتاب' لكن أقصر"
          ]
        },
        {
          title: "بنية المقاطع",
          content: "كل مقطع في توكي بونا هو (صامت + صوتي) أو صوتي فقط. هذا يُسهِّل النطق والحفظ.",
          examples: [
            "ma (مكان)",
            "tomo (بيت)",
            "ale (كلّ)",
            "ijo (شيء)"
          ]
        },
        {
          title: "التشديد والتنغيم",
          content: "التشديد دائمًا على أول مقطع في الكلمة. هذا الثبات يساعد على الفهم السماعي السريع.",
          examples: [
            "TO-ki",
            "PO-na",
            "SO-we-li",
            "to-mo-NA (في الكلمات المركبة يُشدَّد الجزء الأخير)"
          ]
        }
      ],
      exercises: [
        {
          id: "1-1",
          type: "pronunciation",
          question: "كيف يُنطق 'toki'؟",
          answer: "TOH-kee",
          explanation: "التشديد على المقطع الأول: TO-ki"
        },
        {
          id: "1-2",
          type: "pronunciation",
          question: "كيف يُنطق 'pona'؟",
          answer: "POH-nah",
            explanation: "التشديد على المقطع الأول: PO-na"
        },
        {
          id: "1-3",
          type: "multiple-choice",
          question: "أي حروف ليست ضمن أبجدية توكي بونا؟",
          options: ["b, d, f", "a, e, i", "k, l, m", "j, w, n"],
          answer: "b, d, f",
          explanation: "الأبجدية محدودة بـ 14 حرفًا"
        }
      ],
      culturalNotes: [
        "أُنشئت توكي بونا عام 2001 على يد سونيا لانغ كتجربة في التبسيط",
        "الاسم 'toki pona' يعني 'لغة جيدة' أو 'لغة بسيطة'"
      ],
      tips: [
        "اقرأ بصوت عالٍ للتعوّد على النطق",
        "كل حرف له صوت ثابت دائمًا",
        "إن كنت تعرف IPA: a=/a/, e=/e/, i=/i/, o=/o/, u=/u/"
      ]
    },
    // Lesson 2 - Arabic (MSA)
    {
      id: 2,
      title: "الجمل الأساسية والقواعد",
      description: "تعلّم البنية الأساسية للجملة 'X li Y' وأهم القواعد المبدئية",
      difficulty: 'beginner',
      category: 'grammar',
      estimatedTime: 45,
      xp: 75,
      prerequisites: [1],
      vocabulary: [
        {
          word: "mi",
          partOfSpeech: ["ضمير"],
          definition: "أنا؛ نحن",
          examples: ["mi pona", "mi suli"]
        },
        {
          word: "sina",
          partOfSpeech: ["ضمير"],
          definition: "أنت",
          examples: ["sina pona", "sina suli"]
        },
        {
          word: "ona",
          partOfSpeech: ["ضمير"],
          definition: "هو، هي، هو/هي لغير العاقل، هم",
          examples: ["ona li pona", "ona li suli"]
        },
        {
          word: "li",
          partOfSpeech: ["أداة"],
          definition: "تفصل الفاعل عن الخبر/الفعل (إلا مع mi و sina)",
          examples: ["ona li pona", "kili li suli"]
        },
        {
          word: "ike",
          partOfSpeech: ["صفة", "فعل", "اسم"],
          definition: "سيّئ، شر، خاطئ؛ يُسيء؛ الشر",
          examples: ["ike li kama", "mi ike"]
        },
        {
          word: "suli",
          partOfSpeech: ["صفة", "فعل"],
          definition: "كبير، مهم؛ ينمو",
          examples: ["ona li suli", "mi suli"]
        },
        {
          word: "lili",
          partOfSpeech: ["صفة", "فعل"],
          definition: "صغير، قليل، صغير السن؛ يتقلّص",
          examples: ["ona li lili", "mi lili"]
        },
        {
          word: "kili",
          partOfSpeech: ["اسم"],
          definition: "فاكهة، خضار، فطر",
          examples: ["kili li pona", "mi moku e kili"]
        },
        {
          word: "soweli",
          partOfSpeech: ["اسم"],
          definition: "حيوان، بهيمة، ثديي بري",
          examples: ["soweli li suli", "soweli li pona"]
        }
      ],
      sections: [
        {
          title: "النمط الأساسي للجملة",
          content: "أبسط بنية في توكي بونا هي '[المسند إليه] li [المسند]'. قد تعني '[المسند إليه] هو [صفة]' أو '[المسند إليه] يفعل [فعل]'.",
          examples: [
            "ona li pona. (هو/هي/ذلك جيّد.)",
            "kili li suli. (الفاكهة كبيرة.)",
            "soweli li lili. (الحيوان صغير.)"
          ]
        },
        {
          title: "الحالة الخاصة: mi و sina",
          content: "عندما يكون الفاعل 'mi' (أنا/نحن) أو 'sina' (أنت)، لا تُستخدم 'li'. تصبح الجملة مباشرة '[mi/sina] [الخبر]'.",
          examples: [
            "mi pona. (أنا جيّد.)",
            "sina suli. (أنت كبير/مهم.)",
            "mi ike. (أنا سيّئ / أشعر بالسوء.)"
          ]
        },
        {
          title: "تعدد المعاني والسياق",
          content: "كلمات توكي بونا غالبًا متعددة الدلالات ضمن مجال مترابط. السياق يُحدِّد المعنى المقصود.",
          examples: [
            "ona li suli. (هو كبير/مهم/عظيم.)",
            "mi pona. (أنا جيّد / أُحسّن / أُصلح.)",
            "sina lili. (أنت صغير / قليل / صغير السن.)"
          ]
        }
      ],
      exercises: [
        {
          id: "2-1",
          type: "translate-to-tp",
          question: "ترجم إلى توكي بونا: 'الحيوانات مهمة.'",
          answer: "soweli li suli",
          explanation: "لأن الفاعل ليس mi أو sina نستخدم 'li' للفصل"
        },
        {
          id: "2-2",
          type: "translate-to-tp",
          question: "ترجم إلى توكي بونا: 'أنا جيّد.'",
          answer: "mi pona",
          explanation: "مع الفاعل 'mi' لا نستخدم 'li'"
        },
        {
          id: "2-3",
          type: "translate-to-en",
          question: "ترجم إلى العربية: 'sina lili.'",
          answer: "أنت صغير / قليل / صغير السن",
          explanation: "احتمالات متعددة—السياق يوضح"
        },
        {
            id: "2-4",
            type: "multiple-choice",
            question: "أي جملة صحيحة؟",
            options: ["mi li pona", "mi pona", "sina li suli", "ona suli"],
            answer: "mi pona",
            explanation: "'li' تُحذف مع mi و sina"
        }
      ],
      tips: [
        "تذكّر: لا 'li' مع mi و sina",
        "السياق ضروري لفهم المعاني المتعددة",
        "ابدأ بجمل بسيطة قبل الانتقال للأطول"
      ]
    }
  ],

  // Add more languages as needed...
  tok: [
    // Basic Toki Pona translations for lessons - keeping it simple
    {
      id: 1,
      title: "sitelen en kalama",
      description: "o kama sona e sitelen toki pona en nasin kalama",
      difficulty: 'beginner',
      category: 'foundation',
      estimatedTime: 30,
      xp: 50,
      vocabulary: [
        {
          word: "toki",
          partOfSpeech: ["ijo", "pali"],
          definition: "toki, kalama; ni: toki",
          examples: ["toki pona", "mi toki"]
        },
        {
          word: "pona",
          partOfSpeech: ["seme", "pali", "ijo"],
          definition: "pona, pali li pona; pona",
          examples: ["toki pona", "mi pona", "pona li kama"]
        }
      ],
      sections: [
        {
          title: "sitelen toki pona",
          content: "toki pona li kepeken sitelen 14 taso: a, e, i, j, k, l, m, n, o, p, s, t, u, w. sitelen ale li jo e kalama wan taso.",
          examples: [
            "a - sama a lon mama",
            "e - sama e lon tenpo",
            "i - sama i lon ni",
            "o - sama o lon tomo",
            "u - sama u lon lukin"
          ]
        }
      ],
      exercises: [
        {
          id: "1-1",
          type: "pronunciation",
          question: "sina kalama e nimi 'toki' kepeken nasin seme?",
          answer: "TO-ki",
          explanation: "o kalama wawa e open: TO-ki"
        }
      ],
      culturalNotes: [
        "jan Sonja li pali e toki pona lon tenpo 2001",
        "nimi 'toki pona' li toki e ni: toki pona"
      ],
      tips: [
        "o kalama e sitelen tawa sona kalama",
        "sitelen ale li jo e kalama sama"
      ]
    }
  ]
};

// Helper function to get translated lesson content
export const getTranslatedLesson = (lessonId: number, language: string): TranslatedLesson | undefined => {
  const languageLessons = lessonTranslations[language] || lessonTranslations['en'];
  return languageLessons.find(lesson => lesson.id === lessonId);
};

// Helper function to get all translated lessons for a language
export const getTranslatedLessons = (language: string): TranslatedLesson[] => {
  return lessonTranslations[language] || lessonTranslations['en'];
};

// Helper function to check if a language has translations
export const hasLessonTranslations = (language: string): boolean => {
  return language in lessonTranslations;
};