// Импортируем необходимые хуки и стили
import { useState , useEffect} from 'react';
//import React from "react";
import { useNavigate } from 'react-router-dom';
import "./styles.css";
//import { Box, Button, Tabs } from '@mui/material';
import { buildApiUrl } from './GetHost';
import {
    Box,
    Typography,
    Avatar,
    Button,
    AppBar,
    Toolbar,
}from "@mui/material";

// Данные задач
const tasksData = [
    { id: 1, title: 'Two Sum', difficulty: 'Easy' },
    { id: 2, title: 'Add Two Numbers', difficulty: 'Medium' },
    { id: 3, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium' },
    { id: 4, title: 'Median of Two Sorted Arrays', difficulty: 'Hard' },
];

const ListTasks = () => {
    const [tasks, setTasks] = useState([]);
    // const [value, setValue] = useState('one');
    //   const handleChange = (event, newValue) => {
    //     setValue(newValue);
    //   };
    const [sortOrder, setSortOrder] = useState('all'); // Хранит текущую выбранную категорию
    const navigate = useNavigate(); // Хук для программной навигации

    const fetchTasks = async () => {
        try {
            const apiUrl = buildApiUrl(true, '/problems'); // Получаем URL с помощью функции
            const response = await fetch(apiUrl); // Используем полученный URL
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setTasks(data); // Устанавливаем полученные задачи в состояние
        } catch (error) {
            console.error('Ошибка при получении задач:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    console.log(tasks);

    // Фильтрация задач в зависимости от выбранной сложности
    const filterTasks = () => {
        if (sortOrder === 'all') {
            return tasksData; // Если выбрано "все", возвращаем весь список
        }
        return tasksData.filter(task => task.difficulty.toLowerCase() === sortOrder); // Фильтрация по сложности
    };

    // Обновление выбранного уровня сложности
    const handleSortChange = (event) => {
        setSortOrder(event.target.value); // Обновляем состояние на основе выбранного значения
    };

    // Переход к задаче по клику
    const handleTaskClick = (taskId) => {
        navigate('/problems', { state: { taskId } }); // Передаём ID задачи через state
    };

    const filteredTasks = filterTasks(); // Получаем список отфильтрованных задач

    return (
        <Box sx={{ zIndex: -5, display: "flex", flexDirection: "column", backgroundColor: "#1a1a1a", height: "100dvh", width: "100dvw", 
                    justifyContent: "center", alignItems: "center", margin: 0}}>
            <AppBar position="fixed" sx={{backgroundColor: "#202020"}}>
                <Toolbar variant="dense">
                    <Button ///кнопка лого
                    onClick={() => navigate("/ListTasks")}
                    sx={{
                        marginBottom: 0,
                        backgroundColor: "#202020",
                        color: "#ffffff",
                    }}
                    >
                    <img src="/logo-full.png" alt="Logo" />
                    </Button>
                    <Typography ///расстояние между иконками
                    variant="h5"
                    noWrap
                    component="a"
                    href="#app-bar-with-responsive-menu"
                    sx={{
                        mr: 2,
                        display: "flex",
                        flexGrow: 1,
                        fontFamily: "monospace",
                        fontWeight: 700,
                        letterSpacing: ".3rem",
                        color: "inherit",
                        textDecoration: "none",
                    }}
                    ></Typography>
                    <Box ////личный кабинет
                    sx={{ flexGrow: 0 }}
                    >
                        <Avatar alt="User" onClick={() => navigate("/Account")}/>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box className="container_2">
                <h1 className="header">Список задач</h1>
                {/* Группа радиокнопок для фильтрации */}
                <div className="radio-group">
                    <label>
                        <input
                            type="radio"
                            value="all"
                            checked={sortOrder === 'all'} // Устанавливаем активное состояние
                            onChange={handleSortChange} // Обработчик изменения
                        />
                        Все задачи
                    </label>
                    <label style={{ color: "#00c853" }}>
                        <input
                            type="radio"
                            value="easy"
                            checked={sortOrder === 'easy'}
                            onChange={handleSortChange}
                        />
                        Easy
                    </label>
                    <label style={{ color: "#FFC01E" }}>
                        <input
                            type="radio"
                            value="medium"
                            checked={sortOrder === 'medium'}
                            onChange={handleSortChange}
                        />
                        Medium
                    </label>
                    <label style={{ color: "#FF375F" }}>
                        <input
                            type="radio"
                            value="hard"
                            checked={sortOrder === 'hard'}
                            onChange={handleSortChange}
                        />
                        Hard
                    </label>
                </div>
                {/* Список задач */}
                <ul className="list">
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map((task) => (
                            <li 
                                key={task.id} 
                                onClick={() => handleTaskClick(task.id)} // Переход к задаче
                                className="list-item"
                            >
                                {task.title} - {task.difficulty} {/* Название задачи и её сложность */}
                            </li>
                        ))
                    ) : (
                        <li className="list-item">Нет задач для выбранного уровня сложности.</li> // Пустое состояние
                    )}
                </ul>
            </Box>
        </Box>
    );
};

export default ListTasks; // Экспорт компонента