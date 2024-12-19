import { useState } from 'react';
import { Box, Avatar, Button, TextField, Typography, Stack, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Account() {
  const navigate = useNavigate();

  // Состояние для аватара
  const [avatarSrc, setAvatarSrc] = useState('');

  // Данные профиля пользователя
  const userData = {
    username: 'Guest',
    description: 'Любитель решать задачи на платформе.',
    totalTasks: 84,
    tasks: { hard: 10, medium: 15, easy: 59 },
    lastTasks: ['Задача 1', 'Задача 2', 'Задача 3', 'Задача 4']
  };
  
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarSrc(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Stack spacing={3} alignItems="center">
        {/* Аватар */}
        <Avatar
          src={avatarSrc}
          alt={userData.username}
          sx={{ width: 100, height: 100 }}
        />
        <label htmlFor="avatar-upload">
          <input
            type="file"
            id="avatar-upload"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleAvatarChange}
          />
          <Button variant="outlined" component="span">
            Изменить аватар
          </Button>
        </label>

        {/* Имя пользователя */}
        <Typography variant="h5" fontWeight="600">
          {userData.username}
        </Typography>

        {/* Описание */}
        <TextField
            label="Описание о себе"
            multiline
            rows={2}
            value={userData.description}
            fullWidth
            variant="outlined"
            slotProps={{
                input: { readOnly: true }, // Новая версия InputProps
            }}
            sx={{
                '& .MuiOutlinedInput-root': {
                color: 'white', // Цвет текста внутри
                '& fieldset': { borderColor: 'white' }, // Цвет рамки
                '&:hover fieldset': { borderColor: 'white' }, // Цвет рамки при наведении
                },
                '& .MuiInputLabel-root': { color: 'white' }, // Цвет лейбла
                '& .MuiInputBase-input': { color: 'white' }, // Цвет вводимого текста
            }}
        />

        {/* Статистика задач */}
        <Box>
          <Typography variant="h6">Выполненные задачи: {userData.totalTasks}</Typography>
          <Typography>
            Сложные: {userData.tasks.hard}, Средние: {userData.tasks.medium}, Легкие:{' '}
            {userData.tasks.easy}
          </Typography>
        </Box>

        <Divider flexItem />

        {/* Список последних задач */}
        <Box>
          <Typography variant="h6">Последние задачи:</Typography>
          <ul>
            {userData.lastTasks.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
        </Box>

        {/* Кнопка возврата */}
        {/* <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/problems')}
        >
          Назад к задач
        </Button> */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/ListTasks')}
        >
          Назад к задачам
        </Button>
      </Stack>
    </Box>
  );
}

export default Account;