import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Portal } from 'react-native-paper';

import SessionProvider from './SessionProvider';
import ThemeProvider from './CustomThemeProvide';
import PaperProvider from './PaperProvide';
import SQLiteProvider from './SQLite/SQLite';
// import { KeyboardProvider } from 'react-native-keyboard-controller';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <PaperProvider>
        <SafeAreaProvider>
          {/* <Portal.Host> */}
          {/* <KeyboardProvider> */}
          <SQLiteProvider>
            <SessionProvider>{children}</SessionProvider>
          </SQLiteProvider>
          {/* </KeyboardProvider> */}
          {/* </Portal.Host> */}
        </SafeAreaProvider>
      </PaperProvider>
    </ThemeProvider>
  );
}
