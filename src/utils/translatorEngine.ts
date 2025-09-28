/*
 * Translator Engine for Toki Pona ↔ English
 * Phase 1: Baseline word-by-word translation with direction auto-detection.
 * Later phases will extend with sentence and grammar-aware heuristics.
 */

import { tokiPonaDictionary } from '../data/dictionary';

export type TranslationMode = 'word' | 'sentence' | 'grammar';
export type Direction = 'tp-en' | 'en-tp';

export interface TranslationResult {
  input: string;
  output: string;
  direction: Direction;
  unknownWords: string[];
  mode: TranslationMode;
  autoDetected: boolean;
}

// Build quick lookup maps (forward & reverse)
const tpToEnMap: Record<string, string[]> = {};
const enToTpMap: Record<string, string[]> = {};

for (const entry of tokiPonaDictionary) {
  const base = entry.word.toLowerCase();
  const defs = entry.definitions.map(d => d.toLowerCase());
  tpToEnMap[base] = Array.from(new Set((tpToEnMap[base] || []).concat(defs)));
  for (const def of defs) {
    // split definition phrases into individual candidate words (basic heuristic)
    // retain the full phrase if multi-word
    const parts = def.split(/[^a-zA-Z]+/).filter(Boolean);
    if (parts.length === 1) {
      const w = parts[0];
      enToTpMap[w] = Array.from(new Set((enToTpMap[w] || []).concat(base)));
    }
  }
}

const TOKI_PONA_CORE_WORDS = new Set(Object.keys(tpToEnMap));

// ------------------------------
// Enhanced English -> Toki Pona helpers (heuristic layer)
// ------------------------------

// High-frequency stop words or function words we usually omit in Toki Pona translation.
const EN_STOPWORDS = new Set([
  'the', 'a', 'an', 'of', 'and', 'but', 'or', 'if', 'then', 'so', 'that', 'this', 'these', 'those', 'very', 'really',
  'to', 'at', 'in', 'on', 'for', 'with', 'as', 'by', 'from', 'into', 'about', 'over', 'under', 'through',
  'is', 'are', 'am', 'was', 'were', 'be', 'being', 'been', 'do', 'does', 'did', 'not'
]);

// Pronoun mapping (simple baseline)
const PRONOUN_MAP: Record<string, string> = {
  i: 'mi', me: 'mi', my: 'mi', we: 'mi', us: 'mi', our: 'mi',
  you: 'sina', your: 'sina', yours: 'sina',
  he: 'ona', him: 'ona', his: 'ona', she: 'ona', her: 'ona', they: 'ona', them: 'ona', their: 'ona', theirs: 'ona', it: 'ona'
};

// Core verb & concept mapping (single-word baseline). For multi-word outputs we include spaces.
const VERB_MAP: Record<string, string> = {
  have: 'jo', has: 'jo', had: 'jo',
  eat: 'moku', eating: 'moku', ate: 'moku',
  drink: 'moku', drank: 'moku', drinking: 'moku',
  go: 'tawa', went: 'tawa', going: 'tawa',
  come: 'kama', came: 'kama', coming: 'kama',
  want: 'wile', wants: 'wile', wanted: 'wile',
  will: 'wile', would: 'wile',
  need: 'wile', needs: 'wile', needed: 'wile',
  like: 'olin', likes: 'olin', liked: 'olin', love: 'olin', loves: 'olin', loved: 'olin',
  speak: 'toki', speaks: 'toki', spoke: 'toki', speaking: 'toki', talk: 'toki', talks: 'toki', talked: 'toki', talking: 'toki', say: 'toki', says: 'toki', said: 'toki',
  see: 'lukin', sees: 'lukin', saw: 'lukin', seen: 'lukin', look: 'lukin', looks: 'lukin', looked: 'lukin', looking: 'lukin', watch: 'lukin', watching: 'lukin',
  hear: 'kute', hears: 'kute', heard: 'kute', listen: 'kute', listening: 'kute',
  give: 'pana', gives: 'pana', gave: 'pana', giving: 'pana', send: 'pana', sent: 'pana',
  make: 'pali', makes: 'pali', made: 'pali', making: 'pali', create: 'pali', creating: 'pali', do: 'pali', doing: 'pali', did: 'pali',
  work: 'pali', working: 'pali', worked: 'pali',
  think: 'pilin', thinks: 'pilin', thought: 'pilin', feel: 'pilin', feels: 'pilin', felt: 'pilin',
  know: 'sona', knows: 'sona', knew: 'sona', known: 'sona', learn: 'kama sona', learned: 'kama sona', learning: 'kama sona',
  teach: 'pana sona', taught: 'pana sona', teaching: 'pana sona',
  live: 'lon', lives: 'lon', lived: 'lon', living: 'lon', dwell: 'lon',
  die: 'moli', died: 'moli', dying: 'moli', dead: 'moli',
  play: 'musi', played: 'musi', playing: 'musi', game: 'musi',
  sleep: 'lape', sleeping: 'lape', slept: 'lape',
  help: 'pona', helped: 'pona', helping: 'pona',
  clean: 'pona', cleaned: 'pona', cleaning: 'pona',
  dirty: 'jaki',
  bad: 'ike', worse: 'ike', worst: 'ike',
  good: 'pona', better: 'pona', best: 'pona'
};

// Phrase map (longest match wins). Only a small curated baseline.
const PHRASE_MAP: Record<string, string> = {
  'thank you': 'pona tawa sina',
  'good morning': 'tenpo suno pona',
  'good night': 'tenpo pimeja pona',
  'good evening': 'tenpo pimeja pona',
  'good day': 'tenpo suno pona',
  'hello': 'toki',
  'hi': 'toki',
  'my name is': 'nimi mi li',
  'what is your name': 'nimi sina li seme',
  'how are you': 'sina pona ala',
  'i love you': 'mi olin e sina'
};

// Candidate adjective roots (those commonly used attributively) & noun roots for simple reordering heuristic.
const ADJECTIVE_ROOTS = new Set([
  'pona','ike','suli','lili','sin','nasa','wawa','jaki','lete','walo','pimeja','loje','jelo','laso','kule','mute','pakala','utala'
]);
const NOUN_ROOTS = new Set([
  'jan','soweli','kili','tomo','ma','ilo','kala','kasi','len','lupa','suno','mun','sijelo','lawa','pali','toki','meli','mije','mani','sike','suwi','kala','poki','supa','tenpo','sina','mi','ona','lipu','moku'
]);

interface EnhancedEnTokenInfo { source: string; mapped: string; unknown: boolean; }

function enhancedEnglishTokensToTokiPona(tokens: string[]): { mappedTokens: EnhancedEnTokenInfo[]; unknown: string[] } {
  const used: boolean[] = new Array(tokens.length).fill(false);
  const result: EnhancedEnTokenInfo[] = new Array(tokens.length);
  const unknown: string[] = [];

  // Phrase detection (try 3 -> 2 -> 1 length windows)
  for (let i = 0; i < tokens.length; i++) {
    if (used[i]) continue;
    let matched = false;
    for (let span = 3; span >= 2; span--) {
      if (i + span <= tokens.length) {
        const phrase = tokens.slice(i, i + span).join(' ');
        const mappedPhrase = PHRASE_MAP[phrase];
        if (mappedPhrase) {
          result[i] = { source: phrase, mapped: mappedPhrase, unknown: false };
            // mark consumed
          for (let k = 0; k < span; k++) {
            used[i + k] = true;
            if (k > 0) {
              result[i + k] = { source: tokens[i + k], mapped: '', unknown: false };
            }
          }
          matched = true;
          break;
        }
      }
    }
    if (matched) continue;
    // Single token processing
    const t = tokens[i];
    used[i] = true;
    // Pronouns
    if (PRONOUN_MAP[t]) {
      result[i] = { source: t, mapped: PRONOUN_MAP[t], unknown: false };
      continue;
    }
    // Stopwords (skip)
    if (EN_STOPWORDS.has(t)) {
      result[i] = { source: t, mapped: '', unknown: false };
      continue;
    }
    // Core verbs / concepts
    if (VERB_MAP[t]) {
      result[i] = { source: t, mapped: VERB_MAP[t], unknown: false };
      continue;
    }
    // Try dictionary reverse map (exact or stemmed)
    const direct = enToTpMap[t];
    const stemmed = enToTpMap[stripEnglishSuffix(t)];
    if (direct && direct.length) {
      result[i] = { source: t, mapped: direct[0], unknown: false };
      continue;
    }
    if (stemmed && stemmed.length) {
      result[i] = { source: t, mapped: stemmed[0], unknown: false };
      continue;
    }
    // If token looks like a number maybe map digits? (Optional future). For now mark unknown.
    result[i] = { source: t, mapped: t, unknown: true };
    unknown.push(t);
  }

  // Adjective-Noun reordering: (adj, noun) -> noun adj
  for (let i = 0; i < result.length - 1; i++) {
    const a = result[i];
    const b = result[i + 1];
    if (!a || !b) continue;
    if (!a.mapped || !b.mapped) continue;
    // Skip if first mapping contains spaces (phrase) or second does
    if (a.mapped.includes(' ') || b.mapped.includes(' ')) continue;
    if (ADJECTIVE_ROOTS.has(a.mapped) && NOUN_ROOTS.has(b.mapped)) {
      // swap mapped outputs only
      const tmp = a.mapped;
      a.mapped = b.mapped;
      b.mapped = tmp;
    }
  }

  return { mappedTokens: result, unknown };
}

function translateEnglishTextToTokiPona(text: string): { output: string; unknown: string[] } {
  const { tokens, segments } = tokenizeWithSegments(text);
  const { mappedTokens, unknown } = enhancedEnglishTokensToTokiPona(tokens);
  let tokenIndex = 0;
  const rebuilt = segments
    .map(seg => {
      if (!seg.isWord) return seg.value;
      const info = mappedTokens[tokenIndex++];
      if (!info) return seg.value;
      return info.mapped;
    })
    .join('')
    .replace(/\s+/g, ' ') // collapse multi-spaces from skipped tokens
    .replace(/\s+([.,!?;:])/g, '$1')
    .trim();
  return { output: rebuilt, unknown };
}

// Capture both tokens and separators so we can preserve punctuation & spacing during reconstruction.
// Returns tuple: [tokensOnly, segments] where segments preserve order of tokens & separators.
export function tokenizeWithSegments(input: string): { tokens: string[]; segments: { value: string; isWord: boolean }[] } {
  const segments: { value: string; isWord: boolean }[] = [];
  const tokens: string[] = [];
  const regex = /([a-zA-ZäöüÄÖÜßñáéíóúàèìòùâêîôûç’']+)|([^a-zA-ZäöüÄÖÜßñáéíóúàèìòùâêîôûç’']+)/g;
  const lower = input.toLowerCase();
  let match: RegExpExecArray | null;
  while ((match = regex.exec(lower)) !== null) {
    if (match[1]) {
      tokens.push(match[1]);
      segments.push({ value: match[1], isWord: true });
    } else if (match[2]) {
      segments.push({ value: match[2], isWord: false });
    }
  }
  return { tokens, segments };
}

export function tokenize(input: string): string[] {
  return tokenizeWithSegments(input).tokens;
}

// Auto-detect direction using ratio of recognized TP words vs recognized English words.
export function detectDirection(tokens: string[]): Direction {
  if (tokens.length === 0) return 'tp-en';
  let tpScore = 0;
  let enScore = 0;
  const tpParticles = new Set(['li', 'e', 'la', 'pi', 'o', 'anu', 'taso', 'kin']);
  for (const t of tokens) {
    if (TOKI_PONA_CORE_WORDS.has(t)) {
      tpScore += 1;
      if (tpParticles.has(t)) tpScore += 0.5; // weight structural particles higher
    }
    if (enToTpMap[t]) enScore += 1;
  }
  if (tpScore === 0 && enScore === 0) return 'tp-en';
  return tpScore >= enScore ? 'tp-en' : 'en-tp';
}

function translateWordTPtoEN(token: string): { out: string; unknown: boolean } {
  const defs = tpToEnMap[token];
  if (!defs) return { out: token, unknown: true };
  // Provide first two definitions for richer baseline context
  return { out: defs.slice(0, 2).join('/'), unknown: false };
}


// Very light stemming (plural & simple past/continuous) to expand matching.
function stripEnglishSuffix(word: string): string {
  if (word.endsWith('ing') && word.length > 5) return word.slice(0, -3);
  if (word.endsWith('ed') && word.length > 4) return word.slice(0, -2);
  if (word.endsWith('es') && word.length > 4) return word.slice(0, -2);
  if (word.endsWith('s') && word.length > 3) return word.slice(0, -1);
  return word;
}

// Sentence mode: split into sentences then word-translate each; preserves punctuation.
function translateSentenceMode(text: string, direction: Direction): { output: string; unknown: string[] } {
  if (direction === 'en-tp') {
    return translateEnglishTextToTokiPona(text);
  }
  const { tokens, segments } = tokenizeWithSegments(text);
  const unknown: string[] = [];
  const translatedTokens: Record<number, string> = {};
  tokens.forEach((tok, idx) => {
    const { out, unknown: isUnk } = translateWordTPtoEN(tok);
    if (isUnk) unknown.push(tok);
    translatedTokens[idx] = out;
  });
  let tokenIndex = 0;
  const rebuilt = segments.map(seg => (seg.isWord ? translatedTokens[tokenIndex++] ?? seg.value : seg.value)).join('');
  return { output: rebuilt, unknown };
}

// Grammar mode: apply light structural filtering (remove structural particles in EN output) while translating words.
function translateGrammarMode(text: string, direction: Direction): { output: string; unknown: string[] } {
  if (direction === 'en-tp') {
    // Use enhanced EN->TP pathway
    return translateEnglishTextToTokiPona(text);
  }
  const structural = new Set(['li', 'e', 'la', 'pi', 'o']);
  const { tokens, segments } = tokenizeWithSegments(text);
  const unknown: string[] = [];
  const translatedTokens: Record<number, string> = {};
  tokens.forEach((tok, idx) => {
    if (structural.has(tok)) {
      translatedTokens[idx] = ''; // drop structural marker in EN
      return;
    }
    const { out, unknown: isUnk } = translateWordTPtoEN(tok);
    if (isUnk) unknown.push(tok);
    translatedTokens[idx] = out;
  });
  let tokenIndex = 0;
  const rebuilt = segments
    .map(seg => {
      if (seg.isWord) {
        const val = translatedTokens[tokenIndex++] ?? seg.value;
        return val;
      }
      return seg.value;
    })
    .join('')
    .replace(/\s+/g, ' ')
    .replace(/\s+([.,!?;:])/g, '$1')
    .trim();
  return { output: rebuilt, unknown };
}

// Public translation function (Phase 1: word mode only; other modes will reuse pipeline)
export function translate(input: string, opts?: { mode?: TranslationMode; direction?: Direction }): TranslationResult {
  const mode: TranslationMode = opts?.mode || 'word';
  const manualDirection = opts?.direction;
  const basicTokens = tokenize(input);
  const autoDirection = manualDirection || detectDirection(basicTokens);

  if (!input.trim()) {
    return {
      input,
      output: '',
      direction: autoDirection,
      unknownWords: [],
      mode,
      autoDetected: manualDirection ? false : true,
    };
  }

  if (mode === 'sentence') {
    const { output, unknown } = translateSentenceMode(input, autoDirection);
    return {
      input,
      output,
      direction: autoDirection,
      unknownWords: unknown,
      mode,
      autoDetected: manualDirection ? false : true,
    };
  }
  if (mode === 'grammar') {
    const { output, unknown } = translateGrammarMode(input, autoDirection);
    return {
      input,
      output,
      direction: autoDirection,
      unknownWords: unknown,
      mode,
      autoDetected: manualDirection ? false : true,
    };
  }

  // Word mode (legacy simple join, preserve order but not punctuation detail)
  const unknown: string[] = [];
  let output: string;
  if (autoDirection === 'en-tp') {
    const { output: outStr, unknown: unk } = translateEnglishTextToTokiPona(input);
    output = outStr;
    unk.forEach(u => unknown.push(u));
  } else {
    const translatedTokens = basicTokens.map(tok => {
      const { out, unknown: isUnknown } = translateWordTPtoEN(tok);
      if (isUnknown) unknown.push(tok);
      return out;
    });
    output = translatedTokens.join(' ');
  }
  return {
    input,
    output,
    direction: autoDirection,
    unknownWords: unknown,
    mode,
    autoDetected: manualDirection ? false : true,
  };
}

export const translatorDebug = {
  tpToEnMap,
  enToTpMap,
};
