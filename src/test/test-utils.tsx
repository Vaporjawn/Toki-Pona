import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { I18nextProvider } from 'react-i18next';
import { ProgressProvider } from '../contexts/ProgressContext';
import theme from '../theme';
import i18n from './mockI18n';

interface AllProvidersProps {
  children: React.ReactNode;
}

const AllProviders = ({ children }: AllProvidersProps) => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <I18nextProvider i18n={i18n}>
          <ProgressProvider>
            {children}
          </ProgressProvider>
        </I18nextProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  wrapper?: React.ComponentType<{ children: React.ReactNode }>;
}

const customRender = (
  ui: ReactElement,
  options?: CustomRenderOptions
) => render(ui, { wrapper: AllProviders, ...options });

// Re-export everything from testing library
export { customRender as render };
export { default as userEvent } from '@testing-library/user-event';
export {
  cleanup,
  waitFor,
  waitForElementToBeRemoved,
  screen,
  fireEvent,
  getByRole,
  getByText,
  getByLabelText,
  getByTestId,
  queryByRole,
  queryByText,
  queryByLabelText,
  queryByTestId,
  findByRole,
  findByText,
  findByLabelText,
  findByTestId,
  act
} from '@testing-library/react';