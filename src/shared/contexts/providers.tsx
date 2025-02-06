import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { KeyboardProvider } from 'react-native-keyboard-controller';

import SessionProvider from './SessionProvider';
import ThemeProvider from './CustomThemeProvide';
import PaperProvider from './PaperProvide';
import SQLiteProvider from './SQLite/SQLite';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <PaperProvider>
        <SafeAreaProvider>
          {/* <KeyboardProvider> */}
          <SQLiteProvider>
            <SessionProvider>{children}</SessionProvider>
          </SQLiteProvider>
          {/* </KeyboardProvider> */}
        </SafeAreaProvider>
      </PaperProvider>
    </ThemeProvider>
  );
}
