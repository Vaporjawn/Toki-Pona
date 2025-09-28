// Complete Toki Pona dictionary data extracted from nimi-ale.md
// Based on the official dictionary with comprehensive definitions and examples

export interface WordEntry {
  word: string;
  partOfSpeech: string[];
  definitions: string[];
  etymology?: string;
  examples: string[];
  sitelen: string;
  categories: string[];
  notes?: string;
}

export const tokiPonaDictionary: WordEntry[] = [
  {
    word: 'a',
    partOfSpeech: ['interjection', 'particle', 'adverb'],
    definitions: [
      'emotion word',
      'emphasis or confirmation',
      'so, ha, wow, yay',
      'also, indeed, too, yes'
    ],
    etymology: 'ha',
    examples: ['a!', 'pona a!', 'sina pona a!'],
    sitelen: '/sitelen-pona/a.png',
    categories: ['interjection']
  },
  {
    word: 'akesi',
    partOfSpeech: ['noun', 'adjective'],
    definitions: [
      'non-cute animal',
      'amphibian, reptile',
      'cold-blooded, treacherous',
      'monster'
    ],
    etymology: 'hagedis',
    examples: ['akesi lili', 'akesi suli', 'pipi akesi'],
    sitelen: '/sitelen-pona/akesi.png',
    categories: ['life-form']
  },
  {
    word: 'ala',
    partOfSpeech: ['particle', 'adverb', 'noun', 'adjective'],
    definitions: [
      'negation',
      'not',
      'nothingness',
      'zero, 0',
      'no, nothing'
    ],
    etymology: 'ara',
    examples: ['mi ala', 'ona li ala', 'ijo ala'],
    sitelen: '/sitelen-pona/ala.png',
    categories: ['interjection', 'number']
  },
  {
    word: 'alasa',
    partOfSpeech: ['verb', 'noun'],
    definitions: [
      'to hunt, forage',
      'prey'
    ],
    etymology: 'a-la-ŝas',
    examples: ['mi alasa e soweli', 'alasa li pona'],
    sitelen: '/sitelen-pona/alasa.png',
    categories: ['verb']
  },
  {
    word: 'ale',
    partOfSpeech: ['adjective', 'noun'],
    definitions: [
      'all, every',
      'everything',
      'infinity, countless',
      'abundant, bountiful, plentiful',
      'abundance, life, universe'
    ],
    etymology: 'ale',
    examples: ['ale li pona', 'mi lukin e ale', 'ijo ale'],
    sitelen: '/sitelen-pona/ale.png',
    categories: ['correlative', 'number', 'thing'],
    notes: 'Same as ali'
  },
  {
    word: 'anpa',
    partOfSpeech: ['adjective', 'noun', 'verb'],
    definitions: [
      'low, lower, downward',
      'area below or under',
      'humble, lowly, dependent',
      'to conquer',
      'powerlessness'
    ],
    etymology: 'an-ba',
    examples: ['lon anpa', 'kama anpa', 'anpa tawa sewi'],
    sitelen: '/sitelen-pona/anpa.png',
    categories: ['area', 'thing']
  },
  {
    word: 'ante',
    partOfSpeech: ['preposition', 'adjective', 'noun'],
    definitions: [
      'than, unlike',
      'altered, changed, different',
      'change'
    ],
    etymology: 'ander',
    examples: ['ante la', 'ijo ante', 'kama ante'],
    sitelen: '/sitelen-pona/ante.png',
    categories: ['preposition']
  },
  {
    word: 'anu',
    partOfSpeech: ['particle'],
    definitions: [
      'alternative',
      'or'
    ],
    etymology: 'an',
    examples: ['sina anu mi', 'pona anu ike', 'kala anu soweli'],
    sitelen: '/sitelen-pona/anu.png',
    categories: ['conjunction']
  },
  {
    word: 'awen',
    partOfSpeech: ['pre-verb', 'adjective', 'verb'],
    definitions: [
      'to continue to',
      'enduring, kept, staying, waiting',
      'continuous',
      'protected, safe'
    ],
    etymology: 'hawen',
    examples: ['mi awen lon tomo', 'awen pona', 'awen e ijo'],
    sitelen: '/sitelen-pona/awen.png',
    categories: ['pre-verb', 'area']
  },
  {
    word: 'e',
    partOfSpeech: ['marker'],
    definitions: [
      'before the direct object'
    ],
    etymology: 'e',
    examples: ['mi lukin e sina', 'ona li jo e kili'],
    sitelen: '/sitelen-pona/e.png',
    categories: ['case-marker']
  },
  {
    word: 'en',
    partOfSpeech: ['particle'],
    definitions: [
      'between multiple subjects',
      'and'
    ],
    etymology: 'en',
    examples: ['mi en sina', 'jan en soweli'],
    sitelen: '/sitelen-pona/en.png',
    categories: ['conjunction']
  },
  {
    word: 'esun',
    partOfSpeech: ['preposition', 'adjective', 'noun'],
    definitions: [
      'instead of',
      'other, else',
      'business transaction',
      'shop, bazaar, fair, market',
      'seven'
    ],
    etymology: 'eĝum',
    examples: ['tomo esun', 'esun e kili', 'sike esun'],
    sitelen: '/sitelen-pona/esun.png',
    categories: ['preposition', 'number']
  },
  {
    word: 'ijo',
    partOfSpeech: ['noun', 'adjective'],
    definitions: [
      'being, matter, object, phenomenon, something, thing',
      'context, case, place',
      "something's"
    ],
    etymology: 'ijo',
    examples: ['ijo ni', 'ijo pona', 'ijo ike'],
    sitelen: '/sitelen-pona/ijo.png',
    categories: ['noun']
  },
  {
    word: 'ike',
    partOfSpeech: ['adjective', 'noun'],
    definitions: [
      'bad, harmful, hostile, negative',
      'irrelevant, needless, non-essential',
      'bad things, evil, fault, negativity'
    ],
    etymology: 'ilkea',
    examples: ['tenpo ike', 'ijo ike', 'ike li kama'],
    sitelen: '/sitelen-pona/ike.png',
    categories: ['adjective']
  },
  {
    word: 'ilo',
    partOfSpeech: ['noun', 'adjective'],
    definitions: [
      'device, implement, machine, tool',
      'useful'
    ],
    etymology: 'ilo',
    examples: ['ilo tawa', 'ilo sona', 'ilo moku'],
    sitelen: '/sitelen-pona/ilo.png',
    categories: ['thing']
  },
  {
    word: 'insa',
    partOfSpeech: ['adjective', 'noun', 'verb'],
    definitions: [
      'central, inner, internal',
      'centre, inside, content',
      'between, within',
      'internal organ, stomach, womb',
      'to mediate'
    ],
    etymology: 'insait',
    examples: ['lon insa', 'insa tomo', 'insa sijelo'],
    sitelen: '/sitelen-pona/insa.png',
    categories: ['area', 'thing', 'organ']
  },
  {
    word: 'jaki',
    partOfSpeech: ['adjective', 'noun'],
    definitions: [
      'bitter, disgusting, obscene, sickly, toxic, unclean, unsanitary, yucky',
      'dirt, poison, waste'
    ],
    etymology: 'jaki',
    examples: ['ijo jaki', 'telo jaki', 'ma jaki'],
    sitelen: '/sitelen-pona/jaki.png',
    categories: ['thing']
  },
  {
    word: 'jan',
    partOfSpeech: ['noun', 'adjective'],
    definitions: [
      'folks, guy, human being, person, people, somebody',
      "somebody's"
    ],
    etymology: 'jan',
    examples: ['jan pona', 'jan suli', 'jan lili'],
    sitelen: '/sitelen-pona/jan.png',
    categories: ['noun']
  },
  {
    word: 'jelo',
    partOfSpeech: ['adjective'],
    definitions: [
      'yellow, yellowish'
    ],
    etymology: 'jelo',
    examples: ['kili jelo', 'suno jelo', 'kule jelo'],
    sitelen: '/sitelen-pona/jelo.png',
    categories: ['adjective']
  },
  {
    word: 'jo',
    partOfSpeech: ['verb', 'noun'],
    definitions: [
      'to have, carry, contain, hold, wear',
      'property'
    ],
    etymology: 'jou',
    examples: ['mi jo e kili', 'sina jo e sona', 'jo e pona'],
    sitelen: '/sitelen-pona/jo.png',
    categories: ['verb']
  },
  {
    word: 'kala',
    partOfSpeech: ['noun', 'adjective'],
    definitions: [
      'fish, marine animal, sea creature',
      'diving, swimming'
    ],
    etymology: 'kala',
    examples: ['kala lili', 'kala suli', 'moku kala'],
    sitelen: '/sitelen-pona/kala.png',
    categories: ['life-form']
  },
  {
    word: 'kalama',
    partOfSpeech: ['adjective', 'verb', 'noun'],
    definitions: [
      'producing a sound',
      'to recite, utter aloud',
      'noise'
    ],
    etymology: 'galama',
    examples: ['kalama musi', 'kalama pona', 'kalama ike'],
    sitelen: '/sitelen-pona/kalama.png',
    categories: ['adjective']
  },
  {
    word: 'kama',
    partOfSpeech: ['pre-verb', 'adjective', 'noun'],
    definitions: [
      'to become, arriving, being summoned, coming',
      'manage to, succeed in',
      'emerging, future, next',
      'advent'
    ],
    etymology: 'kam-ap',
    examples: ['kama sona', 'kama jo', 'tenpo kama'],
    sitelen: '/sitelen-pona/kama.png',
    categories: ['pre-verb']
  },
  {
    word: 'kasi',
    partOfSpeech: ['noun', 'adjective'],
    definitions: [
      'plant, vegetation, herb, leaf',
      'vegetating, growing'
    ],
    etymology: 'kasvi',
    examples: ['kasi suli', 'kasi kule', 'moku kasi'],
    sitelen: '/sitelen-pona/kasi.png',
    categories: ['life-form']
  },
  {
    word: 'ken',
    partOfSpeech: ['pre-verb', 'adjective'],
    definitions: [
      'to be able to, be allowed to, can, may',
      'possible'
    ],
    etymology: 'ken',
    examples: ['mi ken tawa', 'ken la', 'ijo ken'],
    sitelen: '/sitelen-pona/ken.png',
    categories: ['pre-verb']
  },
  {
    word: 'kepeken',
    partOfSpeech: ['preposition', 'adjective'],
    definitions: [
      'by means of, using, with',
      'usufructuary'
    ],
    etymology: 'ĥebrejken',
    examples: ['kepeken ilo', 'kepeken nasin', 'kepeken toki'],
    sitelen: '/sitelen-pona/kepeken.png',
    categories: ['preposition']
  },
  {
    word: 'kili',
    partOfSpeech: ['noun', 'adjective'],
    definitions: [
      'fruit, banana, blueberry, kiwi, kumquat, lingonberry, orange',
      'mushroom, vegetable, turnip',
      'hanging'
    ],
    etymology: 'ĥili',
    examples: ['kili pona', 'kili suli', 'moku kili'],
    sitelen: '/sitelen-pona/kili.png',
    categories: ['thing']
  },
  {
    word: 'kiwen',
    partOfSpeech: ['noun', 'adjective'],
    definitions: [
      'hard object, bone, metal, rock, stone',
      'hard, sharp, rigid'
    ],
    etymology: 'kiven',
    examples: ['kiwen suli', 'kiwen lili', 'tomo kiwen'],
    sitelen: '/sitelen-pona/kiwen.png',
    categories: ['thing']
  },
  {
    word: 'ko',
    partOfSpeech: ['noun', 'adjective'],
    definitions: [
      'semi-solid, clay, clinging form, dough, paste, powder',
      'semi-solid'
    ],
    etymology: 'gou',
    examples: ['ko pimeja', 'ko walo', 'ko seli'],
    sitelen: '/sitelen-pona/ko.png',
    categories: ['thing']
  },
  {
    word: 'kon',
    partOfSpeech: ['noun', 'adjective'],
    definitions: [
      'air, breath, essence, spirit, meaning, soul',
      'hidden reality, unseen agent',
      'floating, hovering'
    ],
    etymology: 'koŋ',
    examples: ['kon sewi', 'kon lete', 'kon tawa'],
    sitelen: '/sitelen-pona/kon.png',
    categories: ['thing']
  },
  {
    word: 'kule',
    partOfSpeech: ['noun', 'adjective'],
    definitions: [
      'paint, pigment',
      'colourful, painted, pigmented'
    ],
    etymology: 'kuler',
    examples: ['kule pona', 'kule jelo', 'kule loje'],
    sitelen: '/sitelen-pona/kule.png',
    categories: ['thing']
  },
  {
    word: 'kulupu',
    partOfSpeech: ['noun', 'adjective'],
    definitions: [
      'community, company, group, nation, society, tribe',
      'interaction, relationship',
      'fellow, in common, shared'
    ],
    etymology: 'kulupu',
    examples: ['kulupu jan', 'kulupu pona', 'kulupu suli'],
    sitelen: '/sitelen-pona/kulupu.png',
    categories: ['thing']
  },
  {
    word: 'kute',
    partOfSpeech: ['noun', 'verb'],
    definitions: [
      'ear',
      'to hear, listen, pay attention to, obey'
    ],
    etymology: 'ekute',
    examples: ['kute e kalama', 'kute pona', 'kute e toki'],
    sitelen: '/sitelen-pona/kute.png',
    categories: ['organ']
  },
  {
    word: 'la',
    partOfSpeech: ['particle'],
    definitions: [
      'between the context phrase and the main sentence',
      'separates context from main sentence'
    ],
    etymology: 'la',
    examples: ['sina la', 'tenpo ni la', 'lon ni la'],
    sitelen: '/sitelen-pona/la.png',
    categories: ['conjunction']
  },
  {
    word: 'lape',
    partOfSpeech: ['adjective', 'noun'],
    definitions: [
      'resting, sleeping',
      'sleep'
    ],
    etymology: 'slape',
    examples: ['lape pona', 'tenpo lape', 'mi lape'],
    sitelen: '/sitelen-pona/lape.png',
    categories: ['adjective']
  },
  {
    word: 'laso',
    partOfSpeech: ['adjective'],
    definitions: [
      'blue, bluish, green, greenish',
      'immature, pale'
    ],
    etymology: 'glas',
    examples: ['sewi laso', 'kasi laso', 'kule laso'],
    sitelen: '/sitelen-pona/laso.png',
    categories: ['adjective']
  },
  {
    word: 'lawa',
    partOfSpeech: ['noun', 'verb', 'adjective'],
    definitions: [
      'head, mind',
      'highest part',
      'to control, direct, guide, lead, own, plan, regulate, rule',
      'guidance',
      'upper, main'
    ],
    etymology: 'glava',
    examples: ['lawa jan', 'lawa e kulupu', 'nasin lawa'],
    sitelen: '/sitelen-pona/lawa.png',
    categories: ['area', 'organ']
  },
  {
    word: 'len',
    partOfSpeech: ['noun', 'verb'],
    definitions: [
      'cloth, clothing, fabric, textile, vest',
      'cover, layer of privacy',
      'to hide'
    ],
    etymology: 'lenĵ',
    examples: ['len pona', 'len kule', 'len e sijelo'],
    sitelen: '/sitelen-pona/len.png',
    categories: ['organ']
  },
  {
    word: 'lete',
    partOfSpeech: ['adjective', 'noun'],
    definitions: [
      'cold, cool, uncooked, raw',
      'frost, ice'
    ],
    etymology: 'fret',
    examples: ['telo lete', 'tenpo lete', 'moku lete'],
    sitelen: '/sitelen-pona/lete.png',
    categories: ['thing']
  },
  {
    word: 'li',
    partOfSpeech: ['marker'],
    definitions: [
      'indicative',
      'between any subject except mi alone or sina alone and its predicate',
      'introduces a new predicate for the same subject'
    ],
    etymology: 'li',
    examples: ['ona li pona', 'jan li tawa'],
    sitelen: '/sitelen-pona/li.png',
    categories: ['predicate-marker']
  },
  {
    word: 'lili',
    partOfSpeech: ['adjective', 'noun'],
    definitions: [
      'little, micro-, narrow, small, short',
      'momentary, temporary',
      'few, a bit, young',
      'building block, detail, element, member, unit, part, particle, piece'
    ],
    etymology: 'liklik',
    examples: ['jan lili', 'tomo lili', 'ijo lili'],
    sitelen: '/sitelen-pona/lili.png',
    categories: ['thing']
  },
  {
    word: 'linja',
    partOfSpeech: ['noun', 'adjective', 'verb'],
    definitions: [
      'long flexible thing, chain, cord, hair, rope, string, thread, yarn',
      'curve, line, row',
      'long and flexible',
      'to tie'
    ],
    etymology: 'linja',
    examples: ['linja pona', 'linja suli', 'linja lawa'],
    sitelen: '/sitelen-pona/linja.png',
    categories: ['thing']
  },
  {
    word: 'lipu',
    partOfSpeech: ['noun', 'adjective'],
    definitions: [
      'flat object, book, card, clay tablet, document, paper',
      'piece of paper, postcard, printed book, record, website',
      'flat, thin'
    ],
    etymology: 'lipu',
    examples: ['lipu pona', 'lipu sona', 'lipu musi'],
    sitelen: '/sitelen-pona/lipu.png',
    categories: ['thing']
  },
  {
    word: 'loje',
    partOfSpeech: ['adjective'],
    definitions: [
      'red, reddish'
    ],
    etymology: 'roje',
    examples: ['suno loje', 'kule loje', 'len loje'],
    sitelen: '/sitelen-pona/loje.png',
    categories: ['adjective']
  },
  {
    word: 'lon',
    partOfSpeech: ['preposition', 'adjective', 'adverb'],
    definitions: [
      'along, at, located at, present at, during, in',
      'if, when',
      'existing, real, true'
    ],
    etymology: 'loŋ',
    examples: ['lon tomo', 'lon tenpo', 'lon ni la'],
    sitelen: '/sitelen-pona/lon.png',
    categories: ['preposition']
  },
  {
    word: 'luka',
    partOfSpeech: ['noun', 'verb', 'adjective'],
    definitions: [
      'arm, fingers, hand, tactile organ',
      'to touch',
      '5, five',
      'quintet'
    ],
    etymology: 'ruka',
    examples: ['luka mi', 'luka tu', 'luka pona'],
    sitelen: '/sitelen-pona/luka.png',
    categories: ['organ', 'number']
  },
  {
    word: 'lukin',
    partOfSpeech: ['noun', 'verb', 'pre-verb'],
    definitions: [
      'eye',
      'to look at, see, examine, observe, read, search, watch',
      'to try to, to seek to, to look for',
      'to care for'
    ],
    etymology: 'luk-im',
    examples: ['lukin e ijo', 'lukin pona', 'lukin tawa'],
    sitelen: '/sitelen-pona/lukin.png',
    categories: ['organ', 'pre-verb']
  },
  {
    word: 'lupa',
    partOfSpeech: ['noun', 'adjective'],
    definitions: [
      'cave, orifice, womb, hole, door, window',
      'concave, empty, hollow'
    ],
    etymology: 'rupa',
    examples: ['lupa tomo', 'lupa suno', 'lupa meli'],
    sitelen: '/sitelen-pona/lupa.png',
    categories: ['thing']
  },
  {
    word: 'ma',
    partOfSpeech: ['noun', 'adjective', 'verb'],
    definitions: [
      'outdoors, world, planet',
      'earth, land, soil, country, territory',
      'outside',
      'to orient'
    ],
    etymology: 'maa',
    examples: ['ma tomo', 'ma mama', 'ma suli'],
    sitelen: '/sitelen-pona/ma.png',
    categories: ['area', 'thing']
  },
  {
    word: 'mama',
    partOfSpeech: ['noun', 'adjective'],
    definitions: [
      'parent, father, mother, ancestor, creator, originator',
      'caretaker, sustainer',
      'giving origin, of origin'
    ],
    etymology: 'mama',
    examples: ['mama mi', 'mama mije', 'mama meli'],
    sitelen: '/sitelen-pona/mama.png',
    categories: ['person']
  },
  {
    word: 'mani',
    partOfSpeech: ['noun', 'adjective'],
    definitions: [
      'large domesticated animal',
      'cash, money, savings, wealth',
      'domesticated, refined, valuable'
    ],
    etymology: 'mani',
    examples: ['mani mute', 'mani pona', 'jo e mani'],
    sitelen: '/sitelen-pona/mani.png',
    categories: ['thing']
  },
  {
    word: 'meli',
    partOfSpeech: ['noun', 'adjective'],
    definitions: [
      'female, feminine person, woman, wife',
      'female'
    ],
    etymology: 'meri',
    examples: ['meli pona', 'jan meli', 'meli suli'],
    sitelen: '/sitelen-pona/meli.png',
    categories: ['person']
  },
  {
    word: 'mi',
    partOfSpeech: ['noun', 'adjective'],
    definitions: [
      'I, me, myself, we, us, ourselves',
      'my, our'
    ],
    etymology: 'mi',
    examples: ['mi pona', 'mi tawa', 'mi sona'],
    sitelen: '/sitelen-pona/mi.png',
    categories: ['pronoun']
  },
  {
    word: 'mije',
    partOfSpeech: ['noun', 'adjective'],
    definitions: [
      'male, man, masculine person, husband',
      'male'
    ],
    etymology: 'mies',
    examples: ['mije pona', 'jan mije', 'mije suli'],
    sitelen: '/sitelen-pona/mije.png',
    categories: ['person']
  },
  {
    word: 'moku',
    partOfSpeech: ['verb', 'noun'],
    definitions: [
      'to consume, drink, ingest, swallow, eat',
      'the act of eating',
      'food'
    ],
    etymology: 'mogu',
    examples: ['mi moku', 'moku pona', 'moku kili'],
    sitelen: '/sitelen-pona/moku.png',
    categories: ['verb']
  },
  {
    word: 'moli',
    partOfSpeech: ['adjective'],
    definitions: [
      'dead',
      'dying'
    ],
    etymology: 'muri',
    examples: ['kama moli', 'soweli moli', 'jan moli'],
    sitelen: '/sitelen-pona/moli.png',
    categories: ['adjective']
  },
  {
    word: 'monsi',
    partOfSpeech: ['noun', 'adjective', 'verb'],
    definitions: [
      'area behind, back, rear',
      'back, backbone',
      'rear, dorsal',
      'to endorse'
    ],
    etymology: 'mon-ĉi',
    examples: ['lon monsi', 'monsi tomo', 'monsi sijelo'],
    sitelen: '/sitelen-pona/monsi.png',
    categories: ['area', 'thing']
  },
  {
    word: 'mu',
    partOfSpeech: ['particle', 'adverb'],
    definitions: [
      'animal noise or communication',
      'indifference',
      '-ish, sort-of, cock-a-doodle-doo, moo, blah'
    ],
    etymology: 'mu',
    examples: ['soweli li mu', 'mu!', 'kalama mu'],
    sitelen: '/sitelen-pona/mu.png',
    categories: ['interjection']
  },
  {
    word: 'mun',
    partOfSpeech: ['noun', 'adjective'],
    definitions: [
      'night sky object, moon, star',
      'orbiting, sky-walking'
    ],
    etymology: 'mun',
    examples: ['mun pona', 'mun suli', 'sewi mun'],
    sitelen: '/sitelen-pona/mun.png',
    categories: ['thing']
  },
  {
    word: 'musi',
    partOfSpeech: ['adjective', 'noun', 'verb'],
    definitions: [
      'artistic, entertaining, frivolous, playful, recreational',
      'game',
      'to play with'
    ],
    etymology: 'amuzi',
    examples: ['ijo musi', 'musi pona', 'musi e ijo'],
    sitelen: '/sitelen-pona/musi.png',
    categories: ['thing']
  },
  {
    word: 'mute',
    partOfSpeech: ['adjective', 'adverb', 'verb', 'noun'],
    definitions: [
      '3+, 20, a lot, many, several',
      'much, very, more',
      'to multiply',
      'amount, quantity, trio, multitude, set'
    ],
    etymology: 'multe',
    examples: ['jan mute', 'ijo mute', 'mute la'],
    sitelen: '/sitelen-pona/mute.png',
    categories: ['thing', 'number']
  },
  {
    word: 'nanpa',
    partOfSpeech: ['adjective', 'noun', 'verb', 'particle'],
    definitions: [
      'digital, numeric',
      'data, numbers',
      'to count, calculate',
      'ordinal number, -nd, -rd, -th',
      'first, most fundamental'
    ],
    etymology: 'namba',
    examples: ['nanpa wan', 'nanpa tu', 'nanpa mute'],
    sitelen: '/sitelen-pona/nanpa.png',
    categories: ['thing', 'name']
  },
  {
    word: 'nasa',
    partOfSpeech: ['adjective'],
    definitions: [
      'strange, unconventional, unusual',
      'crazy, foolish',
      'drunk, intoxicated'
    ],
    etymology: 'nasau',
    examples: ['ijo nasa', 'jan nasa', 'nasin nasa'],
    sitelen: '/sitelen-pona/nasa.png',
    categories: ['adjective']
  },
  {
    word: 'nasin',
    partOfSpeech: ['noun', 'adjective', 'verb'],
    definitions: [
      'connection, passage, path, road, street, way',
      'dimension, direction',
      'custom, doctrine, method, system, way of doing things',
      'connecting',
      'to connect'
    ],
    etymology: 'naĉin',
    examples: ['nasin pona', 'nasin tawa', 'nasin sona'],
    sitelen: '/sitelen-pona/nasin.png',
    categories: ['area']
  },
  {
    word: 'nena',
    partOfSpeech: ['noun', 'adjective'],
    definitions: [
      'bump, hill, mountain, protuberance',
      'button, nose',
      'convex, full, outstanding, thick'
    ],
    etymology: 'nena',
    examples: ['nena suli', 'nena lili', 'nena sinpin'],
    sitelen: '/sitelen-pona/nena.png',
    categories: ['thing']
  },
  {
    word: 'ni',
    partOfSpeech: ['adjective', 'noun'],
    definitions: [
      'that, this',
      'the following'
    ],
    etymology: 'ni',
    examples: ['ni li pona', 'ijo ni', 'ni:'],
    sitelen: '/sitelen-pona/ni.png',
    categories: ['correlative']
  },
  {
    word: 'nimi',
    partOfSpeech: ['noun', 'verb'],
    definitions: [
      'name, word',
      'to call, define'
    ],
    etymology: 'nimi',
    examples: ['nimi mi', 'nimi pona', 'nimi e ijo'],
    sitelen: '/sitelen-pona/nimi.png',
    categories: ['verb']
  },
  {
    word: 'noka',
    partOfSpeech: ['noun', 'adjective', 'verb'],
    definitions: [
      'lowest part, bottom, foundation',
      'foot, leg, organ of locomotion',
      'bottom',
      'to step on, kick'
    ],
    etymology: 'noga',
    examples: ['noka mi', 'lon noka', 'noka tawa'],
    sitelen: '/sitelen-pona/noka.png',
    categories: ['area', 'organ']
  },
  {
    word: 'o',
    partOfSpeech: ['marker'],
    definitions: [
      'deontic',
      'vocative or imperative',
      'call or command',
      'shows who is being called or addressed',
      'command or request',
      'wish or desire',
      'hey, o'
    ],
    etymology: 'ho',
    examples: ['sina o kute', 'jan Ali o', 'o moku'],
    sitelen: '/sitelen-pona/o.png',
    categories: ['predicate-marker']
  },
  {
    word: 'olin',
    partOfSpeech: ['verb', 'noun', 'adjective'],
    definitions: [
      'to be a fan of, have compassion for, love, respect, show affection to',
      'love',
      'beloved'
    ],
    etymology: 'volim',
    examples: ['mi olin e sina', 'olin pona', 'jan olin'],
    sitelen: '/sitelen-pona/olin.png',
    categories: ['verb']
  },
  {
    word: 'ona',
    partOfSpeech: ['noun', 'adjective'],
    definitions: [
      'he, him, it, she, her, they, them',
      'her, his, its, their'
    ],
    etymology: 'ona',
    examples: ['ona li pona', 'tomo ona', 'jan ona'],
    sitelen: '/sitelen-pona/ona.png',
    categories: ['pronoun']
  },
  {
    word: 'open',
    partOfSpeech: ['adjective', 'verb', 'noun'],
    definitions: [
      'open, accessible, ready, in working order',
      'to open, unseal, set up, turn on, begin, start',
      'aperture, opening, beginning, start'
    ],
    etymology: 'open',
    examples: ['lupa open', 'open e tomo', 'lon open'],
    sitelen: '/sitelen-pona/open.png',
    categories: ['area']
  },
  {
    word: 'pakala',
    partOfSpeech: ['adjective'],
    definitions: [
      'botched, broken, damaged, harmed, messed up'
    ],
    etymology: 'bagar-ap',
    examples: ['ilo pakala', 'tomo pakala', 'ijo pakala'],
    sitelen: '/sitelen-pona/pakala.png',
    categories: ['adjective']
  },
  {
    word: 'pali',
    partOfSpeech: ['adjective', 'noun', 'verb'],
    definitions: [
      'busy, serious',
      'business, work, action',
      'to do, take action on, work on, build, make, prepare'
    ],
    etymology: 'fari',
    examples: ['mi pali', 'pali pona', 'pali e tomo'],
    sitelen: '/sitelen-pona/pali.png',
    categories: ['thing']
  },
  {
    word: 'palisa',
    partOfSpeech: ['noun', 'adjective', 'verb'],
    definitions: [
      'long hard thing, antler, bone, branch, rod, stick, column',
      'finger',
      'long and hard',
      'to point at'
    ],
    etymology: 'palica',
    examples: ['palisa kasi', 'palisa luka', 'palisa kiwen'],
    sitelen: '/sitelen-pona/palisa.png',
    categories: ['thing', 'organ']
  },
  {
    word: 'pan',
    partOfSpeech: ['noun', 'adjective'],
    definitions: [
      'seed, cereal, grain, barley, corn, oat, rice, wheat, bread, pasta',
      'fallen, dropped, sown'
    ],
    etymology: 'fan',
    examples: ['pan pona', 'moku pan', 'kasi pan'],
    sitelen: '/sitelen-pona/pan.png',
    categories: ['thing']
  },
  {
    word: 'pana',
    partOfSpeech: ['verb', 'noun'],
    definitions: [
      'to emit, give, grant, provide, put, release, send, send out, serve',
      'gift'
    ],
    etymology: 'pana',
    examples: ['pana e ijo', 'pana tawa', 'pana moku'],
    sitelen: '/sitelen-pona/pana.png',
    categories: ['verb']
  },
  {
    word: 'pi',
    partOfSpeech: ['marker'],
    definitions: [
      'divides a second noun phrase that describes a first noun phrase',
      'of, about'
    ],
    etymology: 'biloŋ',
    examples: ['jan pi ma tomo', 'ijo pi pona mute', 'toki pi telo suli'],
    sitelen: '/sitelen-pona/pi.png',
    categories: ['case-marker']
  },
  {
    word: 'pilin',
    partOfSpeech: ['noun', 'verb', 'adjective'],
    definitions: [
      'heart (physical or emotional)',
      'to have the impression that, sense, think',
      'feeling (an emotion, a direct experience)'
    ],
    etymology: 'fil-im',
    examples: ['pilin pona', 'mi pilin e ni', 'pilin ike'],
    sitelen: '/sitelen-pona/pilin.png',
    categories: ['organ']
  },
  {
    word: 'pimeja',
    partOfSpeech: ['adjective', 'noun'],
    definitions: [
      'black, blackish, grey, brown, brownish',
      'dark, unlit',
      'shadow'
    ],
    etymology: 'pimea',
    examples: ['kule pimeja', 'tenpo pimeja', 'len pimeja'],
    sitelen: '/sitelen-pona/pimeja.png',
    categories: ['adjective', 'thing']
  },
  {
    word: 'pini',
    partOfSpeech: ['adjective', 'verb', 'noun'],
    definitions: [
      'completed, done, ended, finished, ago, last, past, previous, closed',
      'to close',
      'end'
    ],
    etymology: 'pinis',
    examples: ['pini e pali', 'tenpo pini', 'lon pini'],
    sitelen: '/sitelen-pona/pini.png',
    categories: ['area']
  },
  {
    word: 'pipi',
    partOfSpeech: ['noun', 'adjective'],
    definitions: [
      'ant, bug, insect, spider',
      'crawling, creeping'
    ],
    etymology: 'bibit',
    examples: ['pipi lili', 'pipi suli', 'pipi mute'],
    sitelen: '/sitelen-pona/pipi.png',
    categories: ['life-form']
  },
  {
    word: 'poka',
    partOfSpeech: ['noun', 'adjective'],
    definitions: [
      'area beside, vicinity, next to, among, with',
      'side, square, hip',
      'nearby, lateral'
    ],
    etymology: 'boka',
    examples: ['lon poka', 'poka tawa', 'jan poka'],
    sitelen: '/sitelen-pona/poka.png',
    categories: ['area', 'thing']
  },
  {
    word: 'poki',
    partOfSpeech: ['noun', 'verb'],
    definitions: [
      'bag, bowl, box, container, cup, cupboard, drawer, vessel, bladder',
      'to capture'
    ],
    etymology: 'bokis',
    examples: ['poki moku', 'poki telo', 'poki e ijo'],
    sitelen: '/sitelen-pona/poki.png',
    categories: ['organ']
  },
  {
    word: 'pona',
    partOfSpeech: ['adjective', 'verb', 'noun'],
    definitions: [
      'beneficial, beautiful, good, great, OK, positive, right',
      'friendly, peaceful',
      'basic, elementary, primitive, simple',
      'to improve, tidy up',
      'good, peace, simplicity, sophistication'
    ],
    etymology: 'bona',
    examples: ['ijo pona', 'pona tawa sina', 'jan pona'],
    sitelen: '/sitelen-pona/pona.png',
    categories: ['adjective']
  },
  {
    word: 'pu',
    partOfSpeech: ['preposition', 'adjective', 'particle'],
    definitions: [
      'according to',
      'compatible, compliant',
      'interacting with the official Toki Pona book',
      'name of the official Toki Pona book',
      'the official Toki Pona book, Pu'
    ],
    etymology: 'buk',
    examples: ['lipu pu', 'pu e lipu', 'nasin pu'],
    sitelen: '/sitelen-pona/pu.png',
    categories: ['preposition', 'name']
  },
  {
    word: 'sama',
    partOfSpeech: ['preposition', 'adjective', 'noun'],
    definitions: [
      'as, like',
      'same, similar',
      '-self, -selves',
      'harmony'
    ],
    etymology: 'sama',
    examples: ['sama mi', 'jan sama', 'nasin sama'],
    sitelen: '/sitelen-pona/sama.png',
    categories: ['preposition']
  },
  {
    word: 'seli',
    partOfSpeech: ['adjective', 'noun', 'verb'],
    definitions: [
      'hot, warm, cooked',
      'chemical reaction, fire, heat source, cooking element',
      'to cook'
    ],
    etymology: 'ĉeli',
    examples: ['moku seli', 'seli pona', 'seli e moku'],
    sitelen: '/sitelen-pona/seli.png',
    categories: ['thing']
  },
  {
    word: 'selo',
    partOfSpeech: ['noun', 'verb'],
    definitions: [
      'form, outer form, outer layer, bark, peel, shell, skin, boundary',
      'to isolate'
    ],
    etymology: 'ŝelo',
    examples: ['selo sijelo', 'selo kasi', 'selo e ijo'],
    sitelen: '/sitelen-pona/selo.png',
    categories: ['organ']
  },
  {
    word: 'seme',
    partOfSpeech: ['adjective', 'noun'],
    definitions: [
      'what, which',
      'what, which one'
    ],
    etymology: 'ŝenme',
    examples: ['ijo seme', 'sina seme', 'tan seme'],
    sitelen: '/sitelen-pona/seme.png',
    categories: ['correlative']
  },
  {
    word: 'sewi',
    partOfSpeech: ['noun', 'adjective'],
    definitions: [
      'area above, something elevated, sky, heaven',
      'the Divine, that which is divine, God, the Lord',
      'high',
      'awe-inspiring, divine, sacred, supernatural'
    ],
    etymology: 'sevit',
    examples: ['lon sewi', 'sewi pona', 'jan sewi'],
    sitelen: '/sitelen-pona/sewi.png',
    categories: ['area', 'thing']
  },
  {
    word: 'sijelo',
    partOfSpeech: ['noun', 'adjective', 'verb'],
    definitions: [
      'health, physical state, configuration, mode',
      'life-form, body (of person or animal), torso',
      'being born, alive, healthy',
      'to give birth to'
    ],
    etymology: 'tijelo',
    examples: ['sijelo pona', 'sijelo mi', 'mama sijelo'],
    sitelen: '/sitelen-pona/sijelo.png',
    categories: ['organ']
  },
  {
    word: 'sike',
    partOfSpeech: ['noun', 'adjective'],
    definitions: [
      'round or circular thing, ball, circle, sphere, wheel',
      'cycle, iteration, lap, year',
      'round, periodic',
      'of one year, old'
    ],
    etymology: 'sirkel',
    examples: ['sike suno', 'sike mun', 'sike pona'],
    sitelen: '/sitelen-pona/sike.png',
    categories: ['thing', 'area']
  },
  {
    word: 'sin',
    partOfSpeech: ['preposition', 'adjective'],
    definitions: [
      'in addition to, with',
      'new, fresh, additional, another, extra',
      'artificial, enhanced'
    ],
    etymology: 'ŝin',
    examples: ['ijo sin', 'sin la', 'sin tawa'],
    sitelen: '/sitelen-pona/sin.png',
    categories: ['preposition']
  },
  {
    word: 'sina',
    partOfSpeech: ['noun', 'adjective'],
    definitions: [
      'you, thou, thee, thyself',
      'the person who',
      'your, thy'
    ],
    etymology: 'sina',
    examples: ['sina pona', 'tomo sina', 'jan sina'],
    sitelen: '/sitelen-pona/sina.png',
    categories: ['pronoun']
  },
  {
    word: 'sinpin',
    partOfSpeech: ['noun', 'adjective', 'verb'],
    definitions: [
      'area in front, front, wall, chest, face',
      'foremost, blocking, upright, vertical',
      'to block, to confront, face'
    ],
    etymology: 'cinpin',
    examples: ['lon sinpin', 'sinpin tomo', 'sinpin lawa'],
    sitelen: '/sitelen-pona/sinpin.png',
    categories: ['area', 'thing']
  },
  {
    word: 'sitelen',
    partOfSpeech: ['verb', 'noun'],
    definitions: [
      'to draw, indicate, project, represent, sculpture',
      'image, picture, projection, representation, sculpture, symbol, mark, writing'
    ],
    etymology: 'ŝilderen',
    examples: ['sitelen pona', 'sitelen e ijo', 'sitelen toki'],
    sitelen: '/sitelen-pona/sitelen.png',
    categories: ['verb']
  },
  {
    word: 'sona',
    partOfSpeech: ['verb', 'noun', 'pre-verb'],
    definitions: [
      'to be skilled in, be knowledgeable of, be wise about, have information on, know, testify',
      'insight, knowledge, wisdom',
      'to know how to'
    ],
    etymology: 'ĉodna',
    examples: ['mi sona', 'sona pona', 'sona e toki'],
    sitelen: '/sitelen-pona/sona.png',
    categories: ['verb', 'pre-verb']
  },
  {
    word: 'soweli',
    partOfSpeech: ['noun', 'adjective'],
    definitions: [
      'cute animal, animal, beast, land mammal',
      'badger, hare, moose, Procyonidae, meat',
      'warm-blooded, innocent'
    ],
    etymology: 'ĉoveli',
    examples: ['soweli lili', 'soweli suli', 'moku soweli'],
    sitelen: '/sitelen-pona/soweli.png',
    categories: ['life-form']
  },
  {
    word: 'suli',
    partOfSpeech: ['adjective', 'verb', 'noun'],
    definitions: [
      'big, heavy, large, long, tall, important, responsible, adult',
      'enlarge',
      'cargo, role'
    ],
    etymology: 'suuri',
    examples: ['jan suli', 'tomo suli', 'suli e ijo'],
    sitelen: '/sitelen-pona/suli.png',
    categories: ['thing']
  },
  {
    word: 'suno',
    partOfSpeech: ['noun', 'adjective'],
    definitions: [
      'brightness, glow, light, radiance, shine',
      'sun, light source',
      'bright'
    ],
    etymology: 'suno',
    examples: ['suno pona', 'tenpo suno', 'kama suno'],
    sitelen: '/sitelen-pona/suno.png',
    categories: ['thing']
  },
  {
    word: 'supa',
    partOfSpeech: ['noun', 'adjective'],
    definitions: [
      'horizon, horizontal surface',
      'thing to put or rest something on, sofa, block, ladder, step, stairs',
      'horizontal, sustaining'
    ],
    etymology: 'surfas',
    examples: ['lon supa', 'supa lape', 'supa moku'],
    sitelen: '/sitelen-pona/supa.png',
    categories: ['area', 'thing']
  },
  {
    word: 'suwi',
    partOfSpeech: ['adjective', 'noun'],
    definitions: [
      'fragrant, sweet, adorable, cute',
      'sweets'
    ],
    etymology: 'swit',
    examples: ['jan suwi', 'moku suwi', 'kili suwi'],
    sitelen: '/sitelen-pona/suwi.png',
    categories: ['thing']
  },
  {
    word: 'tan',
    partOfSpeech: ['preposition', 'adjective'],
    definitions: [
      'because of, by, from, since'
    ],
    etymology: 'dan',
    examples: ['tan seme', 'tan ni', 'kama tan'],
    sitelen: '/sitelen-pona/tan.png',
    categories: ['preposition']
  },
  {
    word: 'taso',
    partOfSpeech: ['preposition', 'adjective'],
    definitions: [
      'free from, independent from, without',
      'but, however',
      'just, only'
    ],
    etymology: 'ta-s-ol',
    examples: ['taso ni la', 'wan taso', 'sina taso'],
    sitelen: '/sitelen-pona/taso.png',
    categories: ['preposition']
  },
  {
    word: 'tawa',
    partOfSpeech: ['preposition', 'adjective'],
    definitions: [
      'going to, to, moving to, toward, towards, for, until',
      'at the receiving end of, from the perspective of',
      'moving, running, leaving, departure'
    ],
    etymology: 'tawards',
    examples: ['tawa tomo', 'tawa sina', 'ijo tawa'],
    sitelen: '/sitelen-pona/tawa.png',
    categories: ['preposition']
  },
  {
    word: 'telo',
    partOfSpeech: ['noun', 'adjective', 'verb'],
    definitions: [
      'fluid, liquid, lake, water, wet substance, beverage',
      'wet',
      'to water'
    ],
    etymology: 'de-l-o',
    examples: ['telo pona', 'telo suli', 'telo e kasi'],
    sitelen: '/sitelen-pona/telo.png',
    categories: ['thing']
  },
  {
    word: 'tenpo',
    partOfSpeech: ['noun', 'adjective'],
    definitions: [
      'moment, occasion, period, situation, time, duration',
      'ephemeral, provisional, transitory'
    ],
    etymology: 'tempo',
    examples: ['tenpo ni', 'tenpo pini', 'tenpo kama'],
    sitelen: '/sitelen-pona/tenpo.png',
    categories: ['area']
  },
  {
    word: 'toki',
    partOfSpeech: ['verb', 'adjective', 'noun'],
    definitions: [
      'to communicate, explain, say, speak, think',
      'talking, using language',
      'communication, speech, language',
      'message, news'
    ],
    etymology: 'tok',
    examples: ['mi toki', 'toki pona', 'toki e ijo'],
    sitelen: '/sitelen-pona/toki.png',
    categories: ['verb']
  },
  {
    word: 'tomo',
    partOfSpeech: ['noun', 'verb'],
    definitions: [
      'roof, shelter, protected, safe',
      'indoor space, building, home, house, room, shed',
      'to help in peril, protect'
    ],
    etymology: 'domo',
    examples: ['tomo mi', 'tomo tawa', 'tomo e jan'],
    sitelen: '/sitelen-pona/tomo.png',
    categories: ['organ']
  },
  {
    word: 'tu',
    partOfSpeech: ['adjective', 'verb', 'noun'],
    definitions: [
      '2, two, four',
      'to divide',
      'pair'
    ],
    etymology: 'tu',
    examples: ['jan tu', 'tu e ijo', 'luka tu'],
    sitelen: '/sitelen-pona/tu.png',
    categories: ['number']
  },
  {
    word: 'unpa',
    partOfSpeech: ['verb'],
    definitions: [
      'to have sex with'
    ],
    etymology: 'umf',
    examples: ['unpa e jan'],
    sitelen: '/sitelen-pona/unpa.png',
    categories: ['verb']
  },
  {
    word: 'uta',
    partOfSpeech: ['noun', 'verb'],
    definitions: [
      'jaw, lips, mouth, oral cavity',
      'to kiss, suck, taste'
    ],
    etymology: 'usta',
    examples: ['uta mi', 'uta e jan', 'kalama uta'],
    sitelen: '/sitelen-pona/uta.png',
    categories: ['organ']
  },
  {
    word: 'utala',
    partOfSpeech: ['adjective', 'verb', 'noun'],
    definitions: [
      'aggressive',
      'to attack, battle, challenge, compete against, fight, hit, provoke, struggle against',
      'battle, fighting'
    ],
    etymology: 'udara',
    examples: ['utala ike', 'utala e jan', 'tenpo utala'],
    sitelen: '/sitelen-pona/utala.png',
    categories: ['adjective']
  },
  {
    word: 'walo',
    partOfSpeech: ['adjective'],
    definitions: [
      'white, whitish, light-coloured, pale'
    ],
    etymology: 'valko',
    examples: ['kule walo', 'len walo', 'suno walo'],
    sitelen: '/sitelen-pona/walo.png',
    categories: ['adjective']
  },
  {
    word: 'wan',
    partOfSpeech: ['adjective', 'noun'],
    definitions: [
      '1, one, united',
      'singleton',
      'certain, specific, unique'
    ],
    etymology: 'wan',
    examples: ['jan wan', 'ijo wan', 'wan taso'],
    sitelen: '/sitelen-pona/wan.png',
    categories: ['number', 'correlative']
  },
  {
    word: 'waso',
    partOfSpeech: ['noun', 'adjective'],
    definitions: [
      'bird, flying creature, winged animal',
      'flying, winging'
    ],
    etymology: 'wazo',
    examples: ['waso lili', 'waso suli', 'kalama waso'],
    sitelen: '/sitelen-pona/waso.png',
    categories: ['life-form']
  },
  {
    word: 'wawa',
    partOfSpeech: ['adjective', 'verb', 'noun'],
    definitions: [
      'energetic, intense, powerful, stable, strong',
      'independent, dependable, reliable, confident, sure, loud',
      'strengthen, to bear witness',
      'might, power, force'
    ],
    etymology: 'vahva',
    examples: ['jan wawa', 'wawa e ijo', 'pilin wawa'],
    sitelen: '/sitelen-pona/wawa.png',
    categories: ['thing']
  },
  {
    word: 'weka',
    partOfSpeech: ['adjective', 'verb', 'noun'],
    definitions: [
      'absent, away, remote, ignored',
      'to eliminate, erase, omit, remove',
      'distance, isolation',
      'vast, space, vacuum, void'
    ],
    etymology: 'weĥ',
    examples: ['lon weka', 'weka e ijo', 'jan weka'],
    sitelen: '/sitelen-pona/weka.png',
    categories: ['area', 'thing']
  },
  {
    word: 'wile',
    partOfSpeech: ['pre-verb', 'adjective'],
    definitions: [
      'must, need, require, should, want, wish',
      'inevitable, necessary'
    ],
    etymology: 'wile',
    examples: ['mi wile moku', 'wile pona', 'wile e ijo'],
    sitelen: '/sitelen-pona/wile.png',
    categories: ['pre-verb']
  }
];

// Helper function to get words by category
export const getWordsByCategory = (category: string): WordEntry[] => {
  return tokiPonaDictionary.filter(word => word.categories.includes(category));
};

// Helper function to get words by part of speech
export const getWordsByPartOfSpeech = (partOfSpeech: string): WordEntry[] => {
  return tokiPonaDictionary.filter(word => word.partOfSpeech.includes(partOfSpeech));
};

// Helper function to search words with advanced filtering
export const searchWords = (query: string): WordEntry[] => {
  const searchTerm = query.toLowerCase().trim();
  if (!searchTerm) return tokiPonaDictionary;

  return tokiPonaDictionary.filter(word =>
    // Search in word
    word.word.toLowerCase().includes(searchTerm) ||
    // Search in definitions
    word.definitions.some(def => def.toLowerCase().includes(searchTerm)) ||
    // Search in examples
    word.examples.some(example => example.toLowerCase().includes(searchTerm)) ||
    // Search in parts of speech
    word.partOfSpeech.some(pos => pos.toLowerCase().includes(searchTerm)) ||
    // Search in etymology
    (word.etymology && word.etymology.toLowerCase().includes(searchTerm)) ||
    // Search in categories
    word.categories.some(cat => cat.toLowerCase().includes(searchTerm)) ||
    // Search in notes
    (word.notes && word.notes.toLowerCase().includes(searchTerm))
  );
};

// Get all unique categories
export const getAllCategories = (): string[] => {
  const categories = new Set<string>();
  tokiPonaDictionary.forEach(word => {
    word.categories.forEach(cat => categories.add(cat));
  });
  return Array.from(categories).sort();
};

// Get all unique parts of speech
export const getAllPartsOfSpeech = (): string[] => {
  const partsOfSpeech = new Set<string>();
  tokiPonaDictionary.forEach(word => {
    word.partOfSpeech.forEach(pos => partsOfSpeech.add(pos));
  });
  return Array.from(partsOfSpeech).sort();
};

// Get random words for word of the day or random learning
export const getRandomWords = (count: number = 5): WordEntry[] => {
  const shuffled = [...tokiPonaDictionary].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Get word statistics
export const getWordStatistics = () => {
  const totalWords = tokiPonaDictionary.length;
  const partsOfSpeech = getAllPartsOfSpeech();
  const categories = getAllCategories();

  const posCount = partsOfSpeech.reduce((acc, pos) => {
    acc[pos] = getWordsByPartOfSpeech(pos).length;
    return acc;
  }, {} as Record<string, number>);

  const categoryCount = categories.reduce((acc, cat) => {
    acc[cat] = getWordsByCategory(cat).length;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalWords,
    partsOfSpeech: posCount,
    categories: categoryCount,
    wordsWithEtymology: tokiPonaDictionary.filter(w => w.etymology).length,
    wordsWithNotes: tokiPonaDictionary.filter(w => w.notes).length,
  };
};