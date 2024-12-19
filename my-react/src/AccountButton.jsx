import React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate для перехода

function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null); // Состояние для открытия меню
  const open = Boolean(anchorEl); // Определяет, открыто ли меню
  const navigate = useNavigate(); // Хук для программной навигации

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Устанавливает текущий элемент (иконку) как якорь для меню
  };

  const handleClose = () => {
    setAnchorEl(null); // Закрывает меню
  };

  const handleLogout = () => {
    console.log("User logged out");
    localStorage.removeItem('user'); // Удаляет пользователя из localStorage
    handleClose();
    window.location.reload(); // Перезагружает страницу
  };

  const handleProfileClick = () => {
    handleClose(); // Закрываем меню
    navigate('/account'); // Переходим на страницу личного кабинета
  };

  // Получаем никнейм пользователя из localStorage
  const user = JSON.parse(localStorage.getItem('user')) || { username: 'Guest' };

  return (
    <React.Fragment>
      <Box
        sx={{
          position: 'absolute',
          right: 10, // Отступ справа
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              {user.username.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>

      {/* Dropdown меню */}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={handleProfileClick} // Добавляем обработчик клика для перехода
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 220 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
              {user.username.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="body1" sx={{ fontWeight: '500' }}>
              {user.username}
            </Typography>
          </Box>
          <IconButton onClick={handleLogout}>
            <Logout fontSize="small" />
          </IconButton>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default AccountMenu;