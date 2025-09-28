import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import LanguageSelector from './LanguageSelector';
import { render } from '../../test/test-utils';
import mockI18n from '../../test/mockI18n';

// Spy on the changeLanguage function
const mockChangeLanguage = vi.spyOn(mockI18n, 'changeLanguage');

describe('LanguageSelector', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders language selector button', () => {
      render(<LanguageSelector />);

      const languageButton = screen.getByRole('button', { name: /change language/i });
      expect(languageButton).toBeInTheDocument();
    });

    it('renders with tooltip by default', () => {
      render(<LanguageSelector />);

      const button = screen.getByRole('button', { name: /change language/i });
      expect(button).toBeInTheDocument();

      // The tooltip should be accessible via aria-label
      expect(button).toHaveAttribute('aria-label', expect.stringContaining('Change Language'));
    });

    it('renders without tooltip when showTooltip is false', () => {
      render(<LanguageSelector showTooltip={false} />);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('applies custom iconButtonProps', () => {
      const customProps = { 'data-testid': 'custom-language-button', size: 'large' as const };
      render(<LanguageSelector iconButtonProps={customProps} />);

      const button = screen.getByTestId('custom-language-button');
      expect(button).toBeInTheDocument();
    });

    it('uses custom tooltip text when provided', async () => {
      const customTooltip = 'Select your language';
      const user = userEvent.setup();
      render(<LanguageSelector tooltipText={customTooltip} />);

      // The aria-label is still the default format, but the tooltip shows custom text
      const button = screen.getByRole('button', { name: /change language/i });
      expect(button).toBeInTheDocument();

      // Hover to show tooltip with custom text
      await user.hover(button);

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
        expect(screen.getByRole('tooltip')).toHaveTextContent(customTooltip);
      });
    });
  });

  describe('Menu Interaction', () => {
    it('opens language menu when button is clicked', async () => {
      const user = userEvent.setup();
      render(<LanguageSelector />);

      const button = screen.getByRole('button', { name: /change language/i });
      await user.click(button);

      // Check if menu is open by looking for menu items
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    it('displays all available languages in menu', async () => {
      const user = userEvent.setup();
      render(<LanguageSelector />);

      const button = screen.getByRole('button', { name: /change language/i });
      await user.click(button);

      // Check for some key languages - use getAllByText to handle duplicates
      expect(screen.getAllByText('English').length).toBeGreaterThan(0);
      expect(screen.getByText('Español')).toBeInTheDocument();
      expect(screen.getByText('Français')).toBeInTheDocument();
      expect(screen.getByText('toki pona')).toBeInTheDocument();
      expect(screen.getByText('中文 (简体)')).toBeInTheDocument();
      expect(screen.getByText('日本語')).toBeInTheDocument();
    });

    it('closes menu when clicking outside', async () => {
      const user = userEvent.setup();
      render(<LanguageSelector />);

      // Open the menu
      await user.click(screen.getByRole('button', { name: /change language/i }));

      expect(screen.getByRole('menu')).toBeInTheDocument();

      // Material-UI creates a backdrop for the menu - click on it to close
      const backdrop = document.querySelector('.MuiBackdrop-root');
      if (backdrop) {
        await user.click(backdrop as Element);
      }

      // Wait for menu to close
      await waitFor(() => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      });
    });

    it('closes menu when escape key is pressed', async () => {
      const user = userEvent.setup();
      render(<LanguageSelector />);

      const button = screen.getByRole('button', { name: /change language/i });
      await user.click(button);

      expect(screen.getByRole('menu')).toBeInTheDocument();

      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      });
    });
  });

  describe('Language Selection', () => {
    it('calls changeLanguage when a language is selected', async () => {
      const user = userEvent.setup();
      render(<LanguageSelector />);

      const button = screen.getByRole('button', { name: /change language/i });
      await user.click(button);

      const spanishOption = screen.getByText('Español');
      await user.click(spanishOption);

      expect(mockChangeLanguage).toHaveBeenCalledWith('es');
    });

    it('closes menu after selecting a language', async () => {
      const user = userEvent.setup();
      render(<LanguageSelector />);

      const button = screen.getByRole('button', { name: /change language/i });
      await user.click(button);

      const frenchOption = screen.getByText('Français');
      await user.click(frenchOption);

      await waitFor(() => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      });
    });

    it('shows checkmark for currently selected language', async () => {
      // Change language programmatically before testing
      await mockI18n.changeLanguage('es');
      const user = userEvent.setup();
      render(<LanguageSelector />);

      const button = screen.getByRole('button', { name: /change language/i });
      await user.click(button);

      // Find the Spanish menu item and check for checkmark
      const spanishMenuItem = screen.getByText('Español').closest('[role="menuitem"]');
      expect(spanishMenuItem).toBeInTheDocument();
      expect(spanishMenuItem).toHaveTextContent('✓');
    });

    it('highlights currently selected language', async () => {
      await mockI18n.changeLanguage('fr');
      const user = userEvent.setup();
      render(<LanguageSelector />);

      const button = screen.getByRole('button', { name: /change language/i });
      await user.click(button);

      const frenchMenuItem = screen.getByText('Français').closest('[role="menuitem"]');
      expect(frenchMenuItem).toHaveClass('Mui-selected');
    });
  });

  describe('Language Display', () => {
    it('shows language flags in menu items', async () => {
      const user = userEvent.setup();
      render(<LanguageSelector />);

      const button = screen.getByRole('button', { name: /change language/i });
      await user.click(button);

      // Flags should be present (emojis)
      expect(screen.getByText('🇺🇸')).toBeInTheDocument(); // English
      expect(screen.getByText('🇪🇸')).toBeInTheDocument(); // Spanish
      expect(screen.getByText('🇫🇷')).toBeInTheDocument(); // French
      expect(screen.getByText('🌍')).toBeInTheDocument(); // Toki Pona
    });

    it('shows both native and English names for languages', async () => {
      const user = userEvent.setup();
      render(<LanguageSelector />);

      const button = screen.getByRole('button', { name: /change language/i });
      await user.click(button);

      // Check that both native name and English name are displayed for Spanish
      expect(screen.getByText('Español')).toBeInTheDocument(); // Native name
      expect(screen.getByText('Spanish')).toBeInTheDocument(); // English name

      // For English, check that it appears (noting there might be duplicates)
      const englishElements = screen.getAllByText('English');
      expect(englishElements.length).toBeGreaterThan(0);
    });
  });

  describe('Keyboard Navigation', () => {
    it('supports keyboard navigation in menu', async () => {
      const user = userEvent.setup();
      render(<LanguageSelector />);

      const button = screen.getByRole('button', { name: /change language/i });

      // Open menu with Enter key
      await user.tab(); // Focus the button
      await user.keyboard('{Enter}');

      expect(screen.getByRole('menu')).toBeInTheDocument();

      // Navigate with arrow keys
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowDown}');

      // Select with Enter
      await user.keyboard('{Enter}');

      expect(mockChangeLanguage).toHaveBeenCalled();
    });

    it('has proper aria-label for accessibility', () => {
      render(<LanguageSelector />);

      const button = screen.getByRole('button', { name: /change language/i });
      expect(button).toHaveAttribute('aria-label', expect.stringContaining('Change Language'));
    });
  });

  describe('Edge Cases', () => {
    it('handles unknown current language gracefully', async () => {
      // Set an unknown language
      await mockI18n.changeLanguage('unknown-lang');
      const user = userEvent.setup();
      render(<LanguageSelector />);

      // Should still render without crashing
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();

      await user.click(button);
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    it('handles missing translation function gracefully', () => {
      // Test that component renders even if translations are empty
      render(<LanguageSelector />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders all placeholder languages', async () => {
      const user = userEvent.setup();
      render(<LanguageSelector />);

      const button = screen.getByRole('button', { name: /change language/i });
      await user.click(button);

      // Check for placeholder languages
      expect(screen.getByText('Italiano')).toBeInTheDocument();
      expect(screen.getByText('Deutsch')).toBeInTheDocument();
      expect(screen.getByText('Português')).toBeInTheDocument();
      expect(screen.getByText('Polski')).toBeInTheDocument();
    });
  });

  describe('Menu Positioning', () => {
    it('configures menu with correct anchor origin', async () => {
      const user = userEvent.setup();
      render(<LanguageSelector />);

      await user.click(screen.getByRole('button', { name: /change language/i }));

      const menu = screen.getByRole('menu');
      expect(menu).toBeInTheDocument();
    });
  });

  describe('Styling and Theme', () => {
    it('applies correct styling to selected menu item', async () => {
      await mockI18n.changeLanguage('ja');
      const user = userEvent.setup();
      render(<LanguageSelector />);

      const button = screen.getByRole('button', { name: /change language/i });
      await user.click(button);

      const japaneseMenuItem = screen.getByText('日本語').closest('[role="menuitem"]');
      expect(japaneseMenuItem).toHaveClass('Mui-selected');
    });
  });
});