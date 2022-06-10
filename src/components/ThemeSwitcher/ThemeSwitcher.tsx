import { Box, IconButton } from '@material-ui/core';
import React, { useContext } from 'react';
import { ColorModeContext } from '../../AppThemeWrapper';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@material-ui/core';

const ThemeSwitcher: React.FC = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Box
      sx={{
        width: '30px',
        marginLeft: 'auto',
        marginRight: 0,
      }}
    >
      <IconButton onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.type === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  )
};

export default ThemeSwitcher;
