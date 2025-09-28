import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Extend window interface for SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: new () => MockSpeechRecognition;
    webkitSpeechRecognition: new () => MockSpeechRecognition;
  }

  var global: typeof globalThis;
}

class MockSpeechRecognition {
  continuous = false;
  interimResults = false;
  lang = 'en-US';

  start = vi.fn();
  stop = vi.fn();
  abort = vi.fn();

  onstart = null;
  onend = null;
  onresult = null;
  onerror = null;
}

// Mock Web Speech API
Object.defineProperty(window, 'speechSynthesis', {
  value: {
    speak: vi.fn(),
    cancel: vi.fn(),
    getVoices: vi.fn(() => []),
    onvoiceschanged: null,
  },
  writable: true,
});

// Mock SpeechRecognition
Object.defineProperty(window, 'SpeechRecognition', {
  value: MockSpeechRecognition,
  writable: true,
});

Object.defineProperty(window, 'webkitSpeechRecognition', {
  value: window.SpeechRecognition,
  writable: true,
});

// Mock ResizeObserver
Object.defineProperty(window, 'ResizeObserver', {
  value: class MockResizeObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  },
  writable: true,
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
  writable: true,
});

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Mock sessionStorage
const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock,
  writable: true,
});

// Mock URL.createObjectURL
Object.defineProperty(URL, 'createObjectURL', {
  value: vi.fn(() => 'mocked-url'),
  writable: true,
});

// Mock navigator.share
Object.defineProperty(navigator, 'share', {
  value: vi.fn(),
  writable: true,
});

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  warn: vi.fn(),
  error: vi.fn(),
  log: vi.fn(),
};