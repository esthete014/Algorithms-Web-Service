import React from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import TerminalIcon from "@mui/icons-material/Terminal";
import ButtonGroup from "@mui/material/ButtonGroup";
import CircularProgress from '@mui/material/CircularProgress';

const theme = createTheme({
  palette: {
    customColor: {
      main: "#1b5e20",
    },
    primary: {
        main: '#1976d2', // Цвет индикатора загрузки
      },
  },
});

function BasicGroup() {
  const [loading, setLoading] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleClick2 = () => {
    setLoading2(true);
    setTimeout(() => {
      setLoading2(false);
    }, 2000);
  };

  return (
    <ThemeProvider theme={theme}>
      <ButtonGroup
        color="customColor"
        variant="outlined"
        aria-label="Small button group"
      >
        <LoadingButton
          onClick={handleClick}
          loading={loading}
          startIcon={<PlayArrowIcon />}
          loadingIndicator={<CircularProgress color="customColor" size={16} />}
          sx={{
            borderColor: theme.palette.customColor.main, // Установите цвет обводки
            '&.MuiLoadingButton-loading': {
              borderColor: theme.palette.customColor.main, // Сохраните цвет обводки при загрузке
            },
          }}
        >
          Run
        </LoadingButton>
        <LoadingButton
          onClick={handleClick2}
          loading={loading2}
          startIcon={<TerminalIcon />}
          loadingIndicator={<CircularProgress color="customColor" size={16} />}
          sx={{
            borderColor: theme.palette.customColor.main, // Установите цвет обводки
            '&.MuiLoadingButton-loading': {
              borderColor: theme.palette.customColor.main, // Сохраните цвет обводки при загрузке
            },
          }}
        >
          Submit
        </LoadingButton>
      </ButtonGroup>
    </ThemeProvider>
  );
}

export default BasicGroup; // Убедитесь, что это корректно
