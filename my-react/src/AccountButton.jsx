import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

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
    console.log("User logged out"); // Логируем выход пользователя
    localStorage.removeItem("user"); // Удаляем информацию о пользователе из localStorage
    handleClose(); // Закрываем меню
    window.location.reload(); // Перезагружаем страницу для обновления состояния
  };

  const handleProfileClick = () => {
    handleClose(); // Закрываем меню
    navigate("/account"); // Переходим на страницу личного кабинета
  };

  // Получаем данные пользователя из localStorage. Если их нет, используем значения по умолчанию
  const user = JSON.parse(localStorage.getItem("user")) || {
    username: "Guest",
  };

  return (
    <React.Fragment>
      {/* Блок для отображения аватара и меню */}
      <Box
        sx={{
          zIndex: 100,
          position: "absolute", // Абсолютное позиционирование
          right: 10, // Отступ от правого края
          display: "flex", // Выравнивание элементов по горизонтали
          alignItems: "center", // Центрирование элементов по вертикали
        }}
      >
        {/* Подсказка при наведении на аватар */}
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick} // Обработчик открытия меню
            size="small"
            aria-controls={open ? "account-menu" : undefined} // Привязка к якорю меню
            aria-haspopup="true" // Указывает, что меню будет контекстным
            aria-expanded={open ? "true" : undefined} // Указывает на состояние меню
          >
            {/* Аватар пользователя, первая буква имени */}
            <Avatar sx={{ width: 32, height: 32 }}>
              {"A"}
              {/* {user.username.charAt(0).toUpperCase()} Берем первую букву имени */}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>

      {/* Контекстное меню для пользователя */}
      <Menu
        anchorEl={anchorEl} // Привязываем меню к якорю
        id="account-menu"
        open={open} // Состояние открытия меню
        onClose={handleClose} // Закрытие меню
        transformOrigin={{ horizontal: "right", vertical: "top" }} // Точка трансформации меню
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }} // Точка привязки меню
      >
        {/* Элемент меню с информацией о пользователе */}
        <MenuItem
          onClick={handleProfileClick} // Переход в личный кабинет по клику
          sx={{
            display: "flex", // Выравнивание элементов по горизонтали
            justifyContent: "space-between", // Пространство между аватаром и кнопкой
            alignItems: "center", // Центрирование элементов по вертикали
            width: 220, // Ширина меню
          }}
        >
          {/* Блок с аватаром и именем */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
              {"A"}
              {/* {user.username.charAt(0).toUpperCase()} Аватар с первой буквой имени */}
            </Avatar>
            <Typography variant="body1" sx={{ fontWeight: "500" }}>
              {user.username} {/* Имя пользователя */}
            </Typography>
          </Box>
          {/* Кнопка выхода из аккаунта */}
          <IconButton onClick={handleLogout}>
            <Logout fontSize="small" />
          </IconButton>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default AccountMenu; // Экспорт компонента для использования в других файлах
