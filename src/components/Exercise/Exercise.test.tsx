import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, userEvent } from '../../test/test-utils';
import Exercise from './Exercise';
import type { Exercise as ExerciseType } from '../../data/lessons';

// Mock SpeechSynthesis API
Object.defineProperty(window, 'speechSynthesis', {
  writable: true,
  value: {
    speak: vi.fn(),
    cancel: vi.fn(),
    pause: vi.fn(),
    resume: vi.fn(),
    getVoices: vi.fn(() => [])
  }
});

// Mock data
const mockExercise: ExerciseType = {
  id: 'test-exercise',
  type: 'translate-to-en',
  question: 'Translate "mi moku" to English',
  answer: 'I eat',
  explanation: 'mi means "I" and moku means "eat"',
  hint: 'Think about the subject and verb'
};

const defaultProps = {
  exercise: mockExercise,
  onComplete: vi.fn(),
  showHints: true,
  allowRetry: true
};

describe('Exercise', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders exercise component correctly', () => {
    render(<Exercise {...defaultProps} />);

    expect(screen.getByText('Translate "mi moku" to English')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('displays exercise question', () => {
    render(<Exercise {...defaultProps} />);

    expect(screen.getByText(mockExercise.question)).toBeInTheDocument();
  });

  it('displays exercise type chip', () => {
    render(<Exercise {...defaultProps} />);

    expect(screen.getByText('Translate To-En')).toBeInTheDocument();
  });

  it('calls onComplete when answer is submitted', async () => {
    const user = userEvent.setup();
    render(<Exercise {...defaultProps} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'I eat');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    expect(defaultProps.onComplete).toHaveBeenCalledWith(
      mockExercise.id,
      true,
      expect.any(Number)
    );
  });

  it('shows different exercise types correctly', () => {
    const multipleChoiceExercise: ExerciseType = {
      ...mockExercise,
      type: 'multiple-choice',
      options: ['I eat', 'You eat', 'They eat', 'We eat']
    };

    render(<Exercise {...defaultProps} exercise={multipleChoiceExercise} />);

    expect(screen.getByText('I eat')).toBeInTheDocument();
    expect(screen.getByText('You eat')).toBeInTheDocument();
    expect(screen.getByText('They eat')).toBeInTheDocument();
    expect(screen.getByText('We eat')).toBeInTheDocument();
  });

  it('handles pronunciation exercise with audio button', () => {
    const pronunciationExercise: ExerciseType = { ...mockExercise, type: 'pronunciation' };
    render(<Exercise {...defaultProps} exercise={pronunciationExercise} />);

    const playButton = screen.getByText('exercises.playAudio');
    expect(playButton).toBeInTheDocument();
  });

  it('validates user input correctly', async () => {
    const user = userEvent.setup();
    render(<Exercise {...defaultProps} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'I eat');

    expect(input).toHaveValue('I eat');
  });

  it('shows correct feedback for correct answers', async () => {
    const user = userEvent.setup();
    render(<Exercise {...defaultProps} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'I eat');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    expect(screen.getByText(/correct/i)).toBeInTheDocument();
  });

  it('shows incorrect feedback for wrong answers', async () => {
    const user = userEvent.setup();
    render(<Exercise {...defaultProps} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'wrong answer');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    expect(screen.getByText(/incorrect/i)).toBeInTheDocument();
  });

  it('disables submit button when no input provided', () => {
    render(<Exercise {...defaultProps} />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeDisabled();
  });

  it('enables submit button when input is provided', async () => {
    const user = userEvent.setup();
    render(<Exercise {...defaultProps} />);

    const input = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await user.type(input, 'test');

    expect(submitButton).toBeEnabled();
  });

  it('shows hint when hint button is clicked', async () => {
    const user = userEvent.setup();
    render(<Exercise {...defaultProps} />);

    const hintButton = screen.getByText('exercises.showHint');
    await user.click(hintButton);

    expect(screen.getByText(mockExercise.hint!)).toBeInTheDocument();
  });

  it('shows explanation after submission', async () => {
    const user = userEvent.setup();
    render(<Exercise {...defaultProps} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'I eat');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    expect(screen.getByText(/correct/i)).toBeInTheDocument();
    const answerElements = screen.getAllByText(mockExercise.answer);
    expect(answerElements.length).toBeGreaterThan(0);
  });

  it('shows retry button for wrong answers when allowed', async () => {
    const user = userEvent.setup();
    render(<Exercise {...defaultProps} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'wrong answer');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });

  it('does not show retry button when allowRetry is false', async () => {
    const user = userEvent.setup();
    render(<Exercise {...defaultProps} allowRetry={false} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'wrong answer');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    expect(screen.queryByRole('button', { name: /retry/i })).not.toBeInTheDocument();
  });

  it('resets form when retry button is clicked', async () => {
    const user = userEvent.setup();
    render(<Exercise {...defaultProps} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'wrong answer');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    const retryButton = screen.getByRole('button', { name: /retry/i });
    await user.click(retryButton);

    expect(input).toHaveValue('');
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('handles keyboard enter for submission', async () => {
    const fillBlankExercise: ExerciseType = { ...mockExercise, type: 'fill-blank' };
    const user = userEvent.setup();
    render(<Exercise {...defaultProps} exercise={fillBlankExercise} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'I eat');
    await user.keyboard('{Enter}');

    expect(defaultProps.onComplete).toHaveBeenCalled();
  });

  it('displays explanation when expanded', async () => {
    const user = userEvent.setup();
    render(<Exercise {...defaultProps} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'I eat');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    const explanationButton = screen.getByRole('button', { name: /explanation/i });
    await user.click(explanationButton);

    expect(screen.getByText(mockExercise.explanation!)).toBeInTheDocument();
  });

  it('tracks attempt count', async () => {
    const user = userEvent.setup();
    render(<Exercise {...defaultProps} />);

    // First attempt
    const input = screen.getByRole('textbox');
    await user.type(input, 'wrong answer');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    // Retry
    const retryButton = screen.getByRole('button', { name: /retry/i });
    await user.click(retryButton);

    // Second attempt
    await user.type(input, 'I eat');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText(/attempts/i)).toBeInTheDocument();
  });

  it('handles fill-blank exercise type', () => {
    const fillBlankExercise: ExerciseType = {
      ...mockExercise,
      type: 'fill-blank',
      question: 'Fill in the blank: mi ___ e kili'
    };

    render(<Exercise {...defaultProps} exercise={fillBlankExercise} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText('Fill in the blank: mi ___ e kili')).toBeInTheDocument();
  });

  it('handles writing exercise type with multiline input', () => {
    const writingExercise: ExerciseType = {
      ...mockExercise,
      type: 'writing',
      question: 'Write a short paragraph using these words'
    };

    render(<Exercise {...defaultProps} exercise={writingExercise} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('rows', '3');
  });
});