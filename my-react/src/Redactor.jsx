import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { buildApiUrl } from "./GetHost";
import {
    Box,
    Typography,
    Avatar,
    AppBar,
    Toolbar,
  } from "@mui/material";

const Redactor = ({ isLocal }) => {
  const { taskId } = useParams(); // Получаем ID задачи из URL
  const [taskData, setTaskData] = useState({
    task_id: "",
    task_name: "",
    description: "",
    editorial: "",
    creator_solution: "",
    difficult: "",
    tests: "",
    main_code: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        // Здесь предполагается, что у вас есть способ получить данные задачи
        // Например, данные могут быть переданы в компонент или сохранены в состоянии
        const token = localStorage.getItem("jwtToken"); // Получаем JWT токен
  
        // Если у вас есть данные задачи в состоянии, используйте их напрямую
        if (!taskData) {
          throw new Error("Данные задачи недоступны");
        }
  
        // Если вам нужно просто отобразить данные, можно использовать их напрямую
        setTaskData(taskData);
  
      } catch (error) {
        console.error("Ошибка:", error);
        alert("Не удалось загрузить данные задачи");
      }
    };
  
    fetchTaskData();
  }, [taskId, isLocal]);
  
  const handleUpdateTask = async (e) => {
    e.preventDefault();
  
    try {
      const url = buildApiUrl(isLocal, "/v2/update-task"); // URL для обновления задачи
      const token = localStorage.getItem("jwtToken"); // Получаем JWT токен
  
      const response = await fetch(url, {
        method: "POST", // Используем PUT для обновления
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `Bearer ${token}`, // Добавляем JWT токен
        },
        body: JSON.stringify(taskData), // Отправляем обновленные данные
      });
  
      if (!response.ok) {
        throw new Error("Ошибка при обновлении задачи");
      }
  
      alert("Задача успешно обновлена!");
      navigate("/ListTasks"); // Перенаправление после успешного обновления
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Не удалось обновить задачу");
    }
  };

  return (
    <div>
        <AppBar position="fixed" sx={{ backgroundColor: "#202020" }}>
        <Toolbar variant="dense">
          <Button
            onClick={() => navigate("/ListTasks")}
            sx={{
              marginBottom: 0,
              backgroundColor: "#202020",
              color: "#ffffff",
            }}
          >
            <img src="/logo-full.png" alt="Logo" />
          </Button>
          <Typography
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
            <Avatar alt="User  " onClick={() => navigate("/Account")} />
          </Box>
        </Toolbar>
      </AppBar>
      <h2>Редактировать задачу</h2>
      <form onSubmit={handleUpdateTask}>
        <TextField
          label="ID задачи"
          value={taskData.task_id || taskId} // Используем taskId, если taskData.task_id пуст
          disabled
        />
        <TextField
          label="Имя задачи"
          value={taskData.task_name}
          onChange={(e) => setTaskData({ ...taskData, task_name: e.target.value })}
          required
        />
        <TextField
          label="Описание"
          value={taskData.description}
          onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
          required
        />
        <TextField
          label="Редакция"
          value={taskData.editorial}
          onChange={(e) => setTaskData({ ...taskData, editorial: e.target.value })}
          required
        />
        <TextField
          label="Решение создателя"
          value={taskData.creator_solution}
          onChange={(e) => setTaskData({ ...taskData, creator_solution: e.target.value })}
          required
        />
        <TextField
          label="Сложность"
          value={taskData.difficult}
          onChange={(e) => setTaskData({ ...taskData, difficult: e.target.value })}
          required
        />
        <TextField
          label="Тесты"
          value={taskData.tests}
          onChange={(e) => setTaskData({ ...taskData, tests: e.target.value })}
        />
        <TextField
          label="Основной код"
          value={taskData.main_code}
          onChange={(e) => setTaskData({ ...taskData, main_code: e.target.value })}
        />
        <Button type="submit" variant="contained" color="primary">
          Обновить задачу
        </Button>
      </form>
    </div>
  );
};

export default Redactor;
