
import Splitter, { SplitDirection } from '@devbookhq/splitter';
import './styles.css';
import BasicGroup from './Button.jsx';
// import AccountMenu from './AccountButton.jsx';
import {
    Box,
    Typography,
    Avatar,
    Button,
    AppBar,
    Toolbar,
}from "@mui/material";
//import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Problems = () => {
    const location = useLocation();
    const { taskId } = location.state || {};
    const tasksData = [
        { id: 1, title: 'Two Sum', difficulty: 'Easy' },
        { id: 2, title: 'Add Two Numbers', difficulty: 'Medium' },
        { id: 3, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium' },
        { id: 4, title: 'Median of Two Sorted Arrays', difficulty: 'Hard' },
    ];


    // Находим задачу по taskId
    const selectedTask = tasksData.find(task => task.id === taskId);

    const navigate = useNavigate();

    return (
        <Box sx={{ display: "flex", flexDirection: "column", backgroundColor: "#1a1a1a", height: "100dvh", width: "100dvw", 
            justifyContent: "center", alignItems: "center"}}>
            <AppBar position="fixed" sx={{backgroundColor: "#202020"}}>
                <Toolbar variant="dense"  sx={{ padding: 0 }}>
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
                    <Box sx={{ flexGrow: 0 }}>
                        <Avatar alt="User" onClick={() => navigate("/Account")}/>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box style={{position: "fixed", top: "60px", width: '100dvw', height: '89dvh', flexDirection: 'column' }}>
                {/* Верхняя панель с кнопками */}
                <Box sx={{ position:"relative", marginBottom:"7px",height: '5dvh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <BasicGroup /> {/* Компонент с кнопками */}
                    {/* <AccountMenu /> */}
                </Box>
                {/* Разделение контента на горизонтальные и вертикальные панели */}
                <Splitter direction={SplitDirection.Horizontal}>
                {/* Левый блок с описанием задачи */}
                    <div style={{ padding: '20px', height: '100dvh' }}>
                        <h3>Задача:</h3>
                        {selectedTask ? (
                            <p>{selectedTask.title} - {selectedTask.difficulty}</p>
                        ) : (
                            <p>Задача не найдена.</p>
                        )}
                    </div>
                    {/* Правый блок с кодом и консолью */}
                    <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column' }}>
                        <Splitter direction={SplitDirection.Vertical}>
                            {/* Текстовое поле для написания кода */}
                            <div style={{height: '100%' }}>
                                <textarea placeholder="Ваш код..." style={{ width: '100%', height: '100%' }}></textarea>
                            </div>
                            {/* Консоль */}
                            <div style={{ height: '20%' }}>
                                <h3>Консоль:</h3> {/* Место для вывода консольных сообщений */}
                            </div>
                        </Splitter>
                    </div>
                </Splitter>
            </Box>
        </Box>
    );
};

export default Problems;