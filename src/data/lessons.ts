// Comprehensive Toki Pona Lessons Data
// Based on established curriculum from lipu sona pona and jan Misali's courses

export interface Vocabulary {
  word: string;
  partOfSpeech: string[];
  definition: string;
  examples: string[];
}

export interface Exercise {
  id: string;
  type: 'translate-to-tp' | 'translate-to-en' | 'multiple-choice' | 'fill-blank' | 'pronunciation' | 'writing';
  question: string;
  options?: string[]; // for multiple choice
  answer: string;
  explanation?: string;
  hint?: string;
}

export interface LessonSection {
  title: string;
  content: string;
  examples?: string[];
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'foundation' | 'grammar' | 'vocabulary' | 'culture' | 'practice';
  estimatedTime: number; // in minutes
  xp: number;
  prerequisites?: number[]; // lesson IDs that should be completed first
  vocabulary: Vocabulary[];
  sections: LessonSection[];
  exercises: Exercise[];
  culturalNotes?: string[];
  tips?: string[];
  nextSteps?: string;
}

export const tokiPonaLessons: Lesson[] = [
  // FOUNDATION LESSONS (1-4)
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
  },

  {
    id: 3,
    title: "Adjectives and Descriptions",
    description: "Learn how to modify nouns with adjectives and create detailed descriptions",
    difficulty: 'beginner',
    category: 'grammar',
    estimatedTime: 40,
    xp: 75,
    prerequisites: [2],
    vocabulary: [
      {
        word: "jan",
        partOfSpeech: ["noun"],
        definition: "person, people, human, somebody",
        examples: ["jan li pona", "jan suli"]
      },
      {
        word: "ijo",
        partOfSpeech: ["noun"],
        definition: "thing, object, matter",
        examples: ["ijo li pona", "ijo suli"]
      },
      {
        word: "suwi",
        partOfSpeech: ["adjective"],
        definition: "sweet, cute, adorable",
        examples: ["jan suwi", "ijo suwi"]
      },
      {
        word: "nasa",
        partOfSpeech: ["adjective"],
        definition: "weird, strange, crazy, drunk",
        examples: ["jan nasa", "ijo nasa"]
      },
      {
        word: "sin",
        partOfSpeech: ["adjective"],
        definition: "new, fresh, additional",
        examples: ["ijo sin", "jan sin"]
      },
      {
        word: "wawa",
        partOfSpeech: ["adjective", "noun"],
        definition: "strong, powerful; strength, power",
        examples: ["jan wawa", "wawa li suli"]
      }
    ],
    sections: [
      {
        title: "How Adjectives Work",
        content: "In Toki Pona, adjectives come after the noun they modify. You can stack multiple adjectives to create more specific descriptions.",
        examples: [
          "jan pona (good person)",
          "ijo suli (big thing)",
          "jan suli pona (good big person / big good person)"
        ]
      },
      {
        title: "Multiple Adjectives",
        content: "You can use multiple adjectives together. The order can change the emphasis, but generally both orders are acceptable.",
        examples: [
          "jan suli pona (big good person)",
          "jan pona suli (good big person)",
          "ijo sin suwi (new cute thing)"
        ]
      },
      {
        title: "Adjectives as Predicates",
        content: "Adjectives can also be the main predicate of a sentence, describing what the subject is like.",
        examples: [
          "jan li pona. (The person is good.)",
          "ijo li suli. (The thing is big.)",
          "sina wawa. (You are strong.)"
        ]
      }
    ],
    exercises: [
      {
        id: "3-1",
        type: "translate-to-tp",
        question: "Translate: 'The new person is good.'",
        answer: "jan sin li pona",
        explanation: "Adjective 'sin' modifies noun 'jan', then 'li pona' describes them"
      },
      {
        id: "3-2",
        type: "translate-to-en",
        question: "Translate: 'ijo suli nasa'",
        answer: "big weird thing",
        explanation: "Multiple adjectives modify the noun 'ijo'"
      },
      {
        id: "3-3",
        type: "fill-blank",
        question: "Complete: 'jan ___ li suwi' (The strong person is cute)",
        answer: "wawa",
        explanation: "'wawa' (strong) modifies 'jan' (person)"
      }
    ],
    tips: [
      "Adjectives always come after the noun",
      "Multiple adjectives are fine - order matters less than in English",
      "Think about which meaning of an adjective makes sense in context"
    ]
  },

  {
    id: 4,
    title: "Verbs and Objects",
    description: "Learn about action words, direct objects, and the particle 'e'",
    difficulty: 'beginner',
    category: 'grammar',
    estimatedTime: 50,
    xp: 85,
    prerequisites: [3],
    vocabulary: [
      {
        word: "e",
        partOfSpeech: ["particle"],
        definition: "marks the direct object",
        examples: ["mi moku e kili", "sina lukin e ona"]
      },
      {
        word: "moku",
        partOfSpeech: ["verb", "noun"],
        definition: "to eat, to drink; food",
        examples: ["mi moku", "mi moku e kili"]
      },
      {
        word: "lukin",
        partOfSpeech: ["verb", "noun"],
        definition: "to see, to look at; eye, sight",
        examples: ["mi lukin", "mi lukin e sina"]
      },
      {
        word: "kama",
        partOfSpeech: ["verb", "noun"],
        definition: "to come, to arrive, to become; event",
        examples: ["mi kama", "ona li kama pona"]
      },
      {
        word: "pali",
        partOfSpeech: ["verb", "noun"],
        definition: "to do, to work, to make; work, activity",
        examples: ["mi pali", "mi pali e ijo"]
      },
      {
        word: "jo",
        partOfSpeech: ["verb"],
        definition: "to have, to contain, to hold",
        examples: ["mi jo e ijo", "sina jo e sona"]
      }
    ],
    sections: [
      {
        title: "Verbs and Actions",
        content: "Verbs in Toki Pona work as predicates, just like adjectives. They describe what the subject does or what happens to them.",
        examples: [
          "mi moku. (I eat.)",
          "sina lukin. (You look/see.)",
          "ona li kama. (They come/arrive.)"
        ]
      },
      {
        title: "Direct Objects with 'e'",
        content: "When a verb has a direct object (something that receives the action), you use the particle 'e' before the object.",
        examples: [
          "mi moku e kili. (I eat fruit.)",
          "sina lukin e jan. (You see a person.)",
          "ona li pali e ijo. (They make a thing.)"
        ]
      },
      {
        title: "Multiple Objects",
        content: "You can have multiple direct objects by using 'e' before each one.",
        examples: [
          "mi moku e kili e moku. (I eat fruit and food.)",
          "sina lukin e jan e soweli. (You see a person and an animal.)"
        ]
      }
    ],
    exercises: [
      {
        id: "4-1",
        type: "translate-to-tp",
        question: "Translate: 'I see you.'",
        answer: "mi lukin e sina",
        explanation: "'e' marks 'sina' as the direct object of 'lukin'"
      },
      {
        id: "4-2",
        type: "translate-to-en",
        question: "Translate: 'ona li moku e soweli.'",
        answer: "He/she/they eat(s) the animal",
        explanation: "'soweli' is the direct object of 'moku'"
      },
      {
        id: "4-3",
        type: "multiple-choice",
        question: "Which is correct for 'You make good things'?",
        options: ["sina pali ijo pona", "sina pali e ijo pona", "sina li pali e ijo pona", "sina e pali ijo pona"],
        answer: "sina pali e ijo pona",
        explanation: "Need 'e' before the direct object, no 'li' with 'sina'"
      }
    ],
    tips: [
      "Use 'e' before direct objects",
      "Verbs can also be nouns (like 'moku' = food)",
      "Practice identifying what receives the action"
    ]
  },

  // EXPANDING VOCABULARY (5-8)
  {
    id: 5,
    title: "Essential Vocabulary Building",
    description: "Expand your vocabulary with essential everyday words",
    difficulty: 'beginner',
    category: 'vocabulary',
    estimatedTime: 45,
    xp: 80,
    prerequisites: [4],
    vocabulary: [
      {
        word: "tomo",
        partOfSpeech: ["noun"],
        definition: "house, building, room, indoor space",
        examples: ["tomo li suli", "mi lon tomo"]
      },
      {
        word: "ma",
        partOfSpeech: ["noun"],
        definition: "earth, land, country, ground, soil",
        examples: ["ma li pona", "mi kama lon ma"]
      },
      {
        word: "telo",
        partOfSpeech: ["noun", "verb"],
        definition: "water, liquid; to wash, to clean",
        examples: ["telo li pona", "mi moku e telo"]
      },
      {
        word: "mani",
        partOfSpeech: ["noun"],
        definition: "money, wealth, currency",
        examples: ["mani li ike", "mi jo e mani"]
      },
      {
        word: "lipu",
        partOfSpeech: ["noun"],
        definition: "book, document, paper, page, website",
        examples: ["lipu li pona", "mi lukin e lipu"]
      },
      {
        word: "ilo",
        partOfSpeech: ["noun"],
        definition: "tool, device, machine, equipment",
        examples: ["ilo li pona", "mi kepeken e ilo"]
      }
    ],
    sections: [
      {
        title: "Building Your Vocabulary",
        content: "These words represent common concepts you'll use frequently. Notice how each word covers a broad category rather than specific items.",
        examples: [
          "tomo - any indoor space (house, room, building)",
          "ma - any earth/land area (country, ground, world)",
          "ilo - any tool or device (phone, computer, hammer)"
        ]
      },
      {
        title: "Compound Concepts",
        content: "Start thinking about how to combine words to express specific ideas.",
        examples: [
          "tomo telo (bathroom - water room)",
          "ilo lukin (camera - seeing tool)",
          "ma tomo (city - house land)"
        ]
      }
    ],
    exercises: [
      {
        id: "5-1",
        type: "translate-to-tp",
        question: "Translate: 'The house is big.'",
        answer: "tomo li suli",
        explanation: "Basic sentence structure with noun + adjective"
      },
      {
        id: "5-2",
        type: "multiple-choice",
        question: "What would 'ilo moku' most likely mean?",
        options: ["food tool (fork, spoon)", "eating machine", "kitchen", "restaurant"],
        answer: "food tool (fork, spoon)",
        explanation: "Compound words combine meanings: tool + food = eating utensil"
      }
    ]
  },

  {
    id: 6,
    title: "This and That - Demonstratives",
    description: "Learn to point to specific things and talk about location",
    difficulty: 'beginner',
    category: 'grammar',
    estimatedTime: 35,
    xp: 70,
    prerequisites: [5],
    vocabulary: [
      {
        word: "ni",
        partOfSpeech: ["pronoun", "determiner"],
        definition: "this, that",
        examples: ["ni li pona", "mi lukin e ni"]
      },
      {
        word: "ale",
        partOfSpeech: ["noun", "adjective"],
        definition: "all, everything, universe",
        examples: ["ale li pona", "mi sona e ale"]
      },
      {
        word: "wan",
        partOfSpeech: ["number", "adjective"],
        definition: "one, united",
        examples: ["ijo wan", "mi wan"]
      },
      {
        word: "tu",
        partOfSpeech: ["number", "verb"],
        definition: "two; to divide",
        examples: ["ijo tu", "mi tu e ijo"]
      }
    ],
    sections: [
      {
        title: "Pointing with 'ni'",
        content: "'ni' works like 'this' or 'that' in English. It can refer to objects, ideas, or entire sentences.",
        examples: [
          "ni li pona. (This is good.)",
          "mi lukin e ni. (I see this/that.)",
          "mi sona e ni: sina pona. (I know this: you are good.)"
        ]
      }
    ],
    exercises: [
      {
        id: "6-1",
        type: "translate-to-tp",
        question: "Translate: 'I like this.'",
        answer: "ni li pona tawa mi",
        explanation: "Using 'ni' to point to something specific"
      }
    ]
  },

  {
    id: 7,
    title: "Prepositions and Location",
    description: "Learn to express location, direction, and spatial relationships",
    difficulty: 'intermediate',
    category: 'grammar',
    estimatedTime: 50,
    xp: 90,
    prerequisites: [6],
    vocabulary: [
      {
        word: "lon",
        partOfSpeech: ["preposition", "verb"],
        definition: "at, in, on; to exist, to be real",
        examples: ["mi lon tomo", "jan li lon ma"]
      },
      {
        word: "tawa",
        partOfSpeech: ["preposition", "verb"],
        definition: "to, towards, for; to go, to move",
        examples: ["mi tawa tomo", "ona li pona tawa mi"]
      },
      {
        word: "tan",
        partOfSpeech: ["preposition", "noun"],
        definition: "from, because of; origin, cause",
        examples: ["mi kama tan ma", "tan ni"]
      },
      {
        word: "kepeken",
        partOfSpeech: ["preposition", "verb"],
        definition: "using, with; to use",
        examples: ["mi pali kepeken ilo", "mi kepeken e ilo"]
      }
    ],
    sections: [
      {
        title: "Location with 'lon'",
        content: "'lon' tells us where something is or where an action happens.",
        examples: [
          "mi lon tomo. (I am in the house.)",
          "kili li lon ma. (Fruit is on the ground.)",
          "soweli li moku lon tomo. (Animals eat in the house.)"
        ]
      },
      {
        title: "Movement with 'tawa'",
        content: "'tawa' indicates direction, destination, or who/what something is for.",
        examples: [
          "mi tawa tomo. (I go to the house.)",
          "ni li pona tawa mi. (This is good for me / I like this.)",
          "ona li pana e ijo tawa jan. (They give things to people.)"
        ]
      }
    ],
    exercises: [
      {
        id: "7-1",
        type: "translate-to-tp",
        question: "Translate: 'I am in the house.'",
        answer: "mi lon tomo",
        explanation: "'lon' indicates location"
      },
      {
        id: "7-2",
        type: "translate-to-tp",
        question: "Translate: 'She goes to the land.'",
        answer: "ona li tawa ma",
        explanation: "'tawa' indicates direction/destination"
      }
    ]
  },

  {
    id: 8,
    title: "Questions, Commands, and Names",
    description: "Learn to ask questions, give commands, and talk about names",
    difficulty: 'intermediate',
    category: 'grammar',
    estimatedTime: 55,
    xp: 95,
    prerequisites: [7],
    vocabulary: [
      {
        word: "seme",
        partOfSpeech: ["pronoun"],
        definition: "what, which (question word)",
        examples: ["sina seme?", "seme li lon ni?"]
      },
      {
        word: "anu",
        partOfSpeech: ["conjunction"],
        definition: "or",
        examples: ["sina jan anu soweli?", "telo anu moku?"]
      },
      {
        word: "o",
        partOfSpeech: ["particle"],
        definition: "hey! oh! (vocative/imperative)",
        examples: ["o kama!", "jan o!"]
      },
      {
        word: "nimi",
        partOfSpeech: ["noun"],
        definition: "name, word",
        examples: ["nimi sina li seme?", "nimi ni li pona"]
      }
    ],
    sections: [
      {
        title: "Asking Questions with 'seme'",
        content: "'seme' replaces the part of the sentence you want to ask about.",
        examples: [
          "sina seme? (What are you? / What do you do?)",
          "seme li lon tomo? (What is in the house?)",
          "sina lukin e seme? (What do you see?)"
        ]
      },
      {
        title: "Commands with 'o'",
        content: "'o' is used for commands, requests, and calling attention.",
        examples: [
          "o kama! (Come!)",
          "sina o moku! (You should eat!)",
          "jan o! (Hey person!)"
        ]
      }
    ],
    exercises: [
      {
        id: "8-1",
        type: "translate-to-tp",
        question: "Translate: 'What do you see?'",
        answer: "sina lukin e seme?",
        explanation: "'seme' replaces the unknown direct object"
      }
    ]
  },

  // ADVANCED TOPICS (9-16)
  {
    id: 9,
    title: "Colors and Descriptions",
    description: "Learn color words and advanced descriptive techniques",
    difficulty: 'intermediate',
    category: 'vocabulary',
    estimatedTime: 40,
    xp: 85,
    prerequisites: [8],
    vocabulary: [
      {
        word: "kule",
        partOfSpeech: ["noun", "adjective", "verb"],
        definition: "color, colorful; to color",
        examples: ["kule li pona", "mi kule e ijo"]
      },
      {
        word: "loje",
        partOfSpeech: ["adjective"],
        definition: "red, reddish",
        examples: ["ijo loje", "kili loje"]
      },
      {
        word: "laso",
        partOfSpeech: ["adjective"],
        definition: "blue, green",
        examples: ["telo laso", "kasi laso"]
      },
      {
        word: "jelo",
        partOfSpeech: ["adjective"],
        definition: "yellow, yellowish",
        examples: ["suno jelo", "kili jelo"]
      },
      {
        word: "walo",
        partOfSpeech: ["adjective"],
        definition: "white, light-colored",
        examples: ["ijo walo", "len walo"]
      },
      {
        word: "pimeja",
        partOfSpeech: ["adjective", "noun"],
        definition: "black, dark; darkness",
        examples: ["ijo pimeja", "pimeja li kama"]
      }
    ],
    sections: [
      {
        title: "Basic Colors",
        content: "Toki Pona has only a few basic color words that cover broad ranges.",
        examples: [
          "laso covers blue, green, and related colors",
          "loje covers red, orange, pink, and warm colors",
          "Colors can be modified: laso jelo (blue-yellow = green)"
        ]
      }
    ],
    exercises: [
      {
        id: "9-1",
        type: "translate-to-tp",
        question: "Translate: 'The fruit is red.'",
        answer: "kili li loje",
        explanation: "Using color as predicate adjective"
      }
    ]
  },

  {
    id: 10,
    title: "Complex Grammar and Context",
    description: "Master complex sentence structures and contextual usage",
    difficulty: 'intermediate',
    category: 'grammar',
    estimatedTime: 60,
    xp: 100,
    prerequisites: [9],
    vocabulary: [
      {
        word: "pi",
        partOfSpeech: ["particle"],
        definition: "of (regroups modifiers)",
        examples: ["jan pi ma tomo", "ilo pi moku suli"]
      },
      {
        word: "la",
        partOfSpeech: ["particle"],
        definition: "if, when (context marker)",
        examples: ["tenpo ni la", "sina moku la"]
      }
    ],
    sections: [
      {
        title: "Regrouping with 'pi'",
        content: "'pi' groups multiple modifiers together to modify a noun as a unit.",
        examples: [
          "jan pi ma tomo (person of the city)",
          "tomo pi jan pona (house of good people)",
          "ilo pi moku suli (tool of big food = large cooking tool)"
        ]
      },
      {
        title: "Context with 'la'",
        content: "'la' introduces context, conditions, or time frames for the main sentence.",
        examples: [
          "tenpo ni la, mi moku. (At this time, I eat.)",
          "sina lape la, mi pali. (When you sleep, I work.)",
          "tomo la, jan li lon. (In the house, people exist.)"
        ]
      }
    ],
    exercises: [
      {
        id: "10-1",
        type: "translate-to-tp",
        question: "Translate: 'house of good people'",
        answer: "tomo pi jan pona",
        explanation: "'pi' groups 'jan pona' together to modify 'tomo'"
      }
    ]
  },

  {
    id: 11,
    title: "Time and Pre-verbs",
    description: "Express time concepts and learn modal verbs",
    difficulty: 'intermediate',
    category: 'grammar',
    estimatedTime: 50,
    xp: 95,
    prerequisites: [10],
    vocabulary: [
      {
        word: "tenpo",
        partOfSpeech: ["noun"],
        definition: "time, moment, period",
        examples: ["tenpo ni", "tenpo pona"]
      },
      {
        word: "ken",
        partOfSpeech: ["verb", "noun"],
        definition: "can, to be able; possibility",
        examples: ["mi ken moku", "ken li lon"]
      },
      {
        word: "wile",
        partOfSpeech: ["verb", "noun"],
        definition: "to want, to need; desire, requirement",
        examples: ["mi wile moku", "wile sina"]
      },
      {
        word: "sona",
        partOfSpeech: ["verb", "noun"],
        definition: "to know, to understand; knowledge",
        examples: ["mi sona", "sona ni"]
      }
    ],
    sections: [
      {
        title: "Pre-verbs (Auxiliary Verbs)",
        content: "Some verbs can come before other verbs to modify their meaning.",
        examples: [
          "mi ken moku. (I can eat.)",
          "sina wile kama. (You want to come.)",
          "ona li sona pali. (They know how to work.)"
        ]
      },
      {
        title: "Time Expressions",
        content: "Use 'tenpo' to talk about time, often with 'la' for context.",
        examples: [
          "tenpo ni la, mi moku. (Now, I eat.)",
          "tenpo kama la, sina ken kama. (In the future, you can come.)"
        ]
      }
    ],
    exercises: [
      {
        id: "11-1",
        type: "translate-to-tp",
        question: "Translate: 'I want to see you.'",
        answer: "mi wile lukin e sina",
        explanation: "'wile' as pre-verb modifies 'lukin'"
      }
    ]
  },

  {
    id: 12,
    title: "Numbers and Counting",
    description: "Learn the Toki Pona number system and counting methods",
    difficulty: 'intermediate',
    category: 'vocabulary',
    estimatedTime: 45,
    xp: 85,
    prerequisites: [11],
    vocabulary: [
      {
        word: "wan",
        partOfSpeech: ["number", "adjective", "verb"],
        definition: "one; unique; to unite",
        examples: ["ijo wan", "mi wan e kulupu"]
      },
      {
        word: "tu",
        partOfSpeech: ["number", "verb"],
        definition: "two; to divide, to split",
        examples: ["jan tu", "mi tu e ijo"]
      },
      {
        word: "mute",
        partOfSpeech: ["adjective", "noun"],
        definition: "many, much, several; quantity",
        examples: ["jan mute", "mute li lon"]
      },
      {
        word: "ale",
        partOfSpeech: ["adjective", "noun"],
        definition: "all, every, everything; everything",
        examples: ["jan ale", "mi sona e ale"]
      },
      {
        word: "ala",
        partOfSpeech: ["adjective", "adverb"],
        definition: "no, not, zero, nothing",
        examples: ["jan ala", "mi sona ala"]
      }
    ],
    sections: [
      {
        title: "The Toki Pona Number System",
        content: "Toki Pona deliberately has very few number words, encouraging speakers to think about whether exact quantities matter.",
        examples: [
          "ala (0, nothing)",
          "wan (1, one)",
          "tu (2, two)",
          "mute (many, 3+)",
          "ale (all, everything)"
        ]
      },
      {
        title: "Advanced Counting",
        content: "For larger numbers, you can combine: tu wan (2+1=3), tu tu (2+2=4), etc. But consider if you really need exact numbers.",
        examples: [
          "luka (5, using body parts)",
          "tu tu wan (4+1=5)",
          "mute is often better than complex counting"
        ]
      }
    ],
    exercises: [
      {
        id: "12-1",
        type: "translate-to-tp",
        question: "Translate: 'I see two people.'",
        answer: "mi lukin e jan tu",
        explanation: "'tu' modifies 'jan' to specify quantity"
      }
    ]
  },

  {
    id: 13,
    title: "The Complete Vocabulary",
    description: "Learn the remaining essential words to complete your Toki Pona vocabulary",
    difficulty: 'intermediate',
    category: 'vocabulary',
    estimatedTime: 70,
    xp: 110,
    prerequisites: [12],
    vocabulary: [
      {
        word: "awen",
        partOfSpeech: ["verb", "adjective"],
        definition: "to stay, to remain; enduring, kept",
        examples: ["mi awen lon tomo", "ijo awen"]
      },
      {
        word: "open",
        partOfSpeech: ["verb", "adjective"],
        definition: "to open, to start; beginning",
        examples: ["mi open e ijo", "tenpo open"]
      },
      {
        word: "pini",
        partOfSpeech: ["verb", "adjective"],
        definition: "to end, to finish; completed, past",
        examples: ["mi pini e pali", "tenpo pini"]
      },
      {
        word: "pakala",
        partOfSpeech: ["verb", "adjective", "interjection"],
        definition: "to break, to damage; broken; damn!",
        examples: ["ijo li pakala", "pakala!"]
      }
    ],
    sections: [
      {
        title: "Completing Your Vocabulary",
        content: "These final words round out the essential vocabulary needed for fluent Toki Pona communication.",
        examples: [
          "Learn the remaining words gradually",
          "Focus on using what you know well",
          "Practice combining words creatively"
        ]
      }
    ],
    exercises: [
      {
        id: "13-1",
        type: "translate-to-tp",
        question: "Translate: 'I finish the work.'",
        answer: "mi pini e pali",
        explanation: "'pini' as verb with direct object"
      }
    ]
  },

  {
    id: 14,
    title: "Cultural Context and Philosophy",
    description: "Understand the philosophy behind Toki Pona and cultural usage",
    difficulty: 'advanced',
    category: 'culture',
    estimatedTime: 45,
    xp: 90,
    prerequisites: [13],
    vocabulary: [],
    sections: [
      {
        title: "The Philosophy of Toki Pona",
        content: "Toki Pona encourages simple thinking and focusing on what's truly important. The limited vocabulary forces speakers to break down complex ideas.",
        examples: [
          "Think about essential meanings",
          "Question if complexity is necessary",
          "Focus on clear communication"
        ]
      },
      {
        title: "Cultural Practices",
        content: "The Toki Pona community has developed certain cultural practices and conventions.",
        examples: [
          "Names: jan [Name] for people",
          "Respect for simplicity",
          "Acceptance of ambiguity"
        ]
      }
    ],
    culturalNotes: [
      "Toki Pona teaches you to think about what you really mean",
      "Ambiguity is not a bug, it's a feature",
      "The community values kindness and simplicity"
    ],
    exercises: [
      {
        id: "14-1",
        type: "multiple-choice",
        question: "What is the main philosophy of Toki Pona?",
        options: ["Express everything precisely", "Minimize and simplify communication", "Replace all languages", "Create confusion"],
        answer: "Minimize and simplify communication",
        explanation: "Toki Pona is about expressing ideas simply and focusing on what matters"
      }
    ]
  },

  {
    id: 15,
    title: "Advanced Expression Techniques",
    description: "Master advanced techniques for expressing complex ideas simply",
    difficulty: 'advanced',
    category: 'practice',
    estimatedTime: 55,
    xp: 105,
    prerequisites: [14],
    vocabulary: [],
    sections: [
      {
        title: "Breaking Down Complex Ideas",
        content: "Learn to deconstruct complex English concepts into simple Toki Pona expressions.",
        examples: [
          "friend = jan pona (good person)",
          "teacher = jan pi pana sona (person of giving knowledge)",
          "smartphone = ilo toki lili (small communication tool)"
        ]
      },
      {
        title: "Using Context Effectively",
        content: "Master the art of using context to make ambiguous statements clear.",
        examples: [
          "Same sentence, different contexts = different meanings",
          "Surrounding sentences provide clarity",
          "Shared understanding between speakers"
        ]
      }
    ],
    exercises: [
      {
        id: "15-1",
        type: "translate-to-tp",
        question: "How would you express 'computer programmer'?",
        answer: "jan pi pali ilo sona",
        explanation: "Person of working with knowledge tools - breaking down the complex concept"
      }
    ]
  },

  {
    id: 16,
    title: "Mastery and Beyond",
    description: "Complete your Toki Pona journey and explore advanced topics",
    difficulty: 'advanced',
    category: 'practice',
    estimatedTime: 60,
    xp: 120,
    prerequisites: [15],
    vocabulary: [],
    sections: [
      {
        title: "You've Learned Toki Pona!",
        content: "Congratulations! You now know all the essential elements of Toki Pona. The journey to fluency continues with practice and usage.",
        examples: [
          "Join the Toki Pona community",
          "Read Toki Pona texts",
          "Write your own Toki Pona content"
        ]
      },
      {
        title: "What's Next?",
        content: "Your Toki Pona journey can continue in many directions.",
        examples: [
          "Learn sitelen pona (the native writing system)",
          "Read 'Toki Pona: The Language of Good' by Sonja Lang",
          "Participate in community discussions"
        ]
      }
    ],
    culturalNotes: [
      "toki pona li pona! (Toki Pona is good!)",
      "sina sona e toki pona! (You know Toki Pona!)"
    ],
    exercises: [
      {
        id: "16-1",
        type: "translate-to-tp",
        question: "Translate: 'I have learned Toki Pona well.'",
        answer: "mi kama sona pona e toki pona",
        explanation: "Using 'kama sona' for learning and emphasizing the completeness"
      }
    ],
    nextSteps: "Continue practicing with the Toki Pona community! Visit https://discord.gg/mapona to join discussions, or explore the dictionary for review."
  }
];

// Helper functions for lesson management
export const getLessonById = (id: number): Lesson | undefined => {
  return tokiPonaLessons.find(lesson => lesson.id === id);
};

export const getLessonsByDifficulty = (difficulty: Lesson['difficulty']): Lesson[] => {
  return tokiPonaLessons.filter(lesson => lesson.difficulty === difficulty);
};

export const getLessonsByCategory = (category: Lesson['category']): Lesson[] => {
  return tokiPonaLessons.filter(lesson => lesson.category === category);
};

export const getNextLesson = (currentLessonId: number): Lesson | undefined => {
  const currentIndex = tokiPonaLessons.findIndex(lesson => lesson.id === currentLessonId);
  if (currentIndex >= 0 && currentIndex < tokiPonaLessons.length - 1) {
    return tokiPonaLessons[currentIndex + 1];
  }
  return undefined;
};

export const getPreviousLesson = (currentLessonId: number): Lesson | undefined => {
  const currentIndex = tokiPonaLessons.findIndex(lesson => lesson.id === currentLessonId);
  if (currentIndex > 0) {
    return tokiPonaLessons[currentIndex - 1];
  }
  return undefined;
};

export const isLessonUnlocked = (lessonId: number, completedLessons: number[]): boolean => {
  const lesson = getLessonById(lessonId);
  if (!lesson) return false;

  if (!lesson.prerequisites || lesson.prerequisites.length === 0) {
    return true;
  }

  return lesson.prerequisites.every(prereqId => completedLessons.includes(prereqId));
};

export const calculateTotalXP = (): number => {
  return tokiPonaLessons.reduce((total, lesson) => total + lesson.xp, 0);
};

export const getAllVocabulary = (): Vocabulary[] => {
  const allVocab: Vocabulary[] = [];
  tokiPonaLessons.forEach(lesson => {
    allVocab.push(...lesson.vocabulary);
  });
  return allVocab;
};