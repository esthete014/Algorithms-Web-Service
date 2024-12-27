import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { buildApiUrl } from "./GetHost";
import { host } from "./apiConfig";
import {
  Box,
  Typography,
  Avatar,
  AppBar,
  Toolbar,
} from "@mui/material";

const Redactor = ({ isLocal }) => {
  const location = useLocation(); // Используем useLocation для получения состояния
  const { task } = location.state || {}; // Получаем данные о задаче
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

  // useEffect для заполнения полей формы данными о задаче
  useEffect(() => {
    if (task) {
      setTaskData({
        task_id: task.task_id || "",
        task_name: task.task_name || "",
        description: task.description || "",
        editorial: task.editorial || "",
        creator_solution: task.creator_solution || "",
        difficult: task.difficult || "",
        tests: task.tests || "",
        main_code: task.main_code || ""
      });
    }
  }, [task]);

  const handleUpdateTask = async (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы

    try {
      // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
      // console.log(task)
      taskData.token = document.cookie;
      //const url = buildApiUrl(`${host}/v2/update-task`); // URL для обновления задачи
      //const token = localStorage.getItem("jwtToken"); // Получаем JWT токен

      const response = await fetch(`${host}/v2/update-task`, {
        method: "POST", // Используем POST для обновления
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Изменяем на application/json
        },
        body: JSON.stringify(taskData) // Отправляем обновленные данные
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
      <Typography
        position="static"
        variant="h3"
        //padding="10px"
        marginLeft={5}
        width="90%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        color="#ffffff"
      >
        Редактировать задачу
      </Typography>
      <div className="container_3"
        style={{
          width: "35dvw", // Фиксированная ширина
          height: "70dvh", // Фиксированная высота
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "static",
          padding: "20px",
          marginTop:15,
          overflowY: "auto", // Вертикальная прокрутка
          backgroundColor: "#282828", // Фоновый цвет для контейнера
          borderRadius: "8px", // Закругленные углы
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)", // Тень для контейнера
        }}>
      <form onSubmit={handleUpdateTask}
      style={{
        position: "static",
        padding: "20px",
        marginBottom: 350,
        height: "70dvh",
        width: "60%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Занять всю ширину контейнера
      }}
      >
        <TextField
          label="ID задачи"
          variant="outlined"
          fullWidth
          backgroundColor="#fff"
          margin="0"
          padding="0"
          color="#ffffff"
          multiline
          value={taskData.task_id}
          disabled
          InputProps={{
            style: {
              borderColor: "#ffffff", // Белая рамка
              color: "#ffffff", // Белый текст
            },
          }}
          InputLabelProps={{
            style: {
              color: "#ffffff", // Белый цвет для метки
            },
          }}
          sx={{
            width: "150%",

            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ffffff", // Белая рамка
              },
              "&:hover fieldset": {
                borderColor: "#ffffff", // Белая рамка при наведении
              },
              "&.Mui-focused fieldset": {
                borderColor: "#ffffff", // Белая рамка при фокусе
              },
            },
          }}
        
        />
        <TextField
          label="Имя задачи"
          variant="outlined"
          value={taskData.task_name}
          onChange={(e) => setTaskData({ ...taskData, task_name: e.target.value })}
          required
          color="#fff"
          fullWidth
          backgroundColor="#ffffff"
          margin="normal"
          multiline
          rows={4}
          InputProps={{
            style: {
              borderColor: "#ffffff", // Белая рамка
              color: "#ffffff", // Белый текст
            },
          }}
          InputLabelProps={{
            style: {
              color: "#ffffff", // Белый цвет для метки
            },
          }}
          sx={{
            width: "150%",

            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ffffff", // Белая рамка
              },
              "&:hover fieldset": {
                borderColor: "#ffffff", // Белая рамка при наведении
              },
              "&.Mui-focused fieldset": {
                borderColor: "#ffffff", // Белая рамка при фокусе
              },
            },
          }}
        
        />
        <TextField
          label="Описание"
          variant="outlined"
          value={taskData.description}
          onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
          required
          color="#fff"
          fullWidth
          backgroundColor="#ffffff"
          margin="normal"
          multiline
          rows={4}
          InputProps={{
            style: {
              borderColor: "#ffffff", // Белая рамка
              color: "#ffffff", // Белый текст
            },
          }}
          InputLabelProps={{
            style: {
              color: "#ffffff", // Белый цвет для метки
            },
          }}
          sx={{
            width: "150%",

            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ffffff", // Белая рамка
              },
              "&:hover fieldset": {
                borderColor: "#ffffff", // Белая рамка при наведении
              },
              "&.Mui-focused fieldset": {
                borderColor: "#ffffff", // Белая рамка при фокусе
              },
            },
          }}
        
        />
        <TextField
          label="Редакция"
          value={taskData.editorial}
          onChange={(e) => setTaskData({ ...taskData, editorial: e.target.value })}
          required
          variant="outlined"
          color="#fff"
          fullWidth
          backgroundColor="#ffffff"
          margin="normal"
          multiline
          rows={4}
          InputProps={{
            style: {
              borderColor: "#ffffff", // Белая рамка
              color: "#ffffff", // Белый текст
            },
          }}
          InputLabelProps={{
            style: {
              color: "#ffffff", // Белый цвет для метки
            },
          }}
          sx={{
            width: "150%",

            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ffffff", // Белая рамка
              },
              "&:hover fieldset": {
                borderColor: "#ffffff", // Белая рамка при наведении
              },
              "&.Mui-focused fieldset": {
                borderColor: "#ffffff", // Белая рамка при фокусе
              },
            },
          }}
        
        />
        <TextField
          label="Решение создателя"
          value={taskData.creator_solution}
          onChange={(e) => setTaskData({ ...taskData, creator_solution: e.target.value })}
          required
          variant="outlined"
          color="#fff"
          fullWidth
          backgroundColor="#ffffff"
          margin="normal"
          multiline
          rows={4}
          InputProps={{
            style: {
              borderColor: "#ffffff", // Белая рамка
              color: "#ffffff", // Белый текст
            },
          }}
          InputLabelProps={{
            style: {
              color: "#ffffff", // Белый цвет для метки
            },
          }}
          sx={{
            width: "150%",

            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ffffff", // Белая рамка
              },
              "&:hover fieldset": {
                borderColor: "#ffffff", // Белая рамка при наведении
              },
              "&.Mui-focused fieldset": {
                borderColor: "#ffffff", // Белая рамка при фокусе
              },
            },
          }}
        
        />
        <TextField
          label="Сложность"
          value={taskData.difficult}
          onChange={(e) => setTaskData({ ...taskData, difficult: e.target.value })}
          required
          fullWidth
          backgroundColor="#ffffff"
          margin="0"
          padding="0"
          color="#ffffff"
          multiline
          InputProps={{
            style: {
              borderColor: "#ffffff", // Белая рамка
              color: "#ffffff", // Белый текст
            },
          }}
          InputLabelProps={{
            style: {
              color: "#ffffff", // Белый цвет для метки
            },
          }}
          sx={{
            width: "150%",

            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ffffff", // Белая рамка
              },
              "&:hover fieldset": {
                borderColor: "#ffffff", // Белая рамка при наведении
              },
              "&.Mui-focused fieldset": {
                borderColor: "#ffffff", // Белая рамка при фокусе
              },
            },
          }}
        
        />
        <TextField
          label="Тесты"
          value={taskData.tests}
          onChange={(e) => setTaskData({ ...taskData, tests: e.target.value })}
          variant="outlined"
          color="#fff"
          fullWidth
          backgroundColor="#ffffff"
          margin="normal"
          multiline
          rows={4}
          InputProps={{
            style: {
              borderColor: "#ffffff", // Белая рамка
              color: "#ffffff", // Белый текст
            },
          }}
          InputLabelProps={{
            style: {
              color: "#ffffff", // Белый цвет для метки
            },
          }}
          sx={{
            width: "150%",

            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ffffff", // Белая рамка
              },
              "&:hover fieldset": {
                borderColor: "#ffffff", // Белая рамка при наведении
              },
              "&.Mui-focused fieldset": {
                borderColor: "#ffffff", // Белая рамка при фокусе
              },
            },
          }}
        
        />
        <TextField
          label="Основной код"
          value={taskData.main_code}
          onChange={(e) => setTaskData({ ...taskData, main_code: e.target.value })}
          variant="outlined"
          color="#fff"
          fullWidth
          backgroundColor="#ffffff"
          margin="normal"
          multiline
          rows={4}
          InputProps={{
            style: {
              borderColor: "#ffffff", // Белая рамка
              color: "#ffffff", // Белый текст
            },
          }}
          InputLabelProps={{
            style: {
              color: "#ffffff", // Белый цвет для метки
            },
          }}
          sx={{
            width: "150%",

            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ffffff", // Белая рамка
              },
              "&:hover fieldset": {
                borderColor: "#ffffff", // Белая рамка при наведении
              },
              "&.Mui-focused fieldset": {
                borderColor: "#ffffff", // Белая рамка при фокусе
              },
            },
          }}
        
        />
        <Button type="submit" variant="contained" color="primary" sx={{marginLeft:30, marginTop:3}} >
          Обновить задачу
        </Button>
        
      </form>
      </div>
      
    </div>
  );
};

export default Redactor;
