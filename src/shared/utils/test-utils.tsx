import React from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import ThemeProvider from '@/src/shared/contexts/CustomThemeProvide';

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <PaperProvider>{children}</PaperProvider>
    </ThemeProvider>
  );
};

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react-native';
export { customRender as render };
