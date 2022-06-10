import React, { useState, useMemo } from 'react';
import './index.css';
import App from './App';
import { Box, createTheme, ThemeProvider } from '@material-ui/core';

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const AppThemeWrapper: React.FC = () => {
  const [type, setType] = useState<'light' | 'dark'>('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setType((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: { type },
      }),
    [type],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Box sx={{ bgcolor: 'background.default', color: 'text.primary' }} width="100%" height="100%">
            <App />
          </Box>
        </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default AppThemeWrapper
