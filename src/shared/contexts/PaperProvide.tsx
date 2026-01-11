import React, { ReactNode } from 'react';
import { PaperProvider as ReactPaperProvider } from 'react-native-paper';

import { useTheme } from './CustomThemeProvide';

export default function PaperProvider({ children }: { children: ReactNode }) {
  const { theme } = useTheme();

  return <ReactPaperProvider theme={theme}>{children}</ReactPaperProvider>;
}
