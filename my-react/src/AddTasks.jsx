import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { host } from "./apiConfig";
import {
  Box,
  Typography,
  Avatar,
  Button,
  AppBar,
  Toolbar,
  TextField,
} from "@mui/material";

const AddTasks = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [editorial, setEditorial] = useState("");
  const [creatorSolution, setCreatorSolution] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [tests, setTests] = useState("");
  const [mainCode, setMainCode] = useState("");
  const navigate = useNavigate();

  const handleAddTask = async () => {
    console.log(taskName);
    console.log(taskDescription);
    console.log(editorial);
    console.log(creatorSolution);
    console.log(difficulty);
    console.log(tests);
    console.log(mainCode);
    if (taskName && taskDescription && editorial && creatorSolution && difficulty && tests && mainCode) {
      const newTask = {
        task_name: taskName,
        description: taskDescription,
        editorial: editorial,
        creator_solution: creatorSolution,
        difficult: difficulty,
        tests: JSON.parse(tests), // Преобразуем строку в массив объектов
        main_code: mainCode,
        token: ""
      };

      try {
        const cookies = document.cookie;

        // Разбиваем строку на отдельные куки
        const cookieArray = cookies.split('; ');

        // Находим куку с названием jwt
        const jwtCookie = cookieArray.find(cookie => cookie.startsWith('JWT='));
        console.log(JSON.stringify(newTask));
        console.log(jwtCookie);
        console.log(document.cookie);
        newTask.token = document.cookie;
        const response = await fetch(`${host}/v2/add-task`, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          body: JSON.stringify(newTask),
        });

        if (!response.ok) {
          throw new Error("Ошибка при добавлении задачи");
        }

        const data = await response.json();
        alert(data.msg); // Уведомляем об успешном добавлении задачи
        navigate("/ListTasks"); // Перенаправляем на страницу со списком задач
      } catch (error) {
        console.error("Ошибка:", error);
        alert("Произошла ошибка. Пожалуйста, попробуйте снова.");
      }
    } else {
      alert("Пожалуйста, заполните все поля.");
    }
  };

  return (
    <div style={{ color: "#202020" }}>
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
        padding="10px"
        marginLeft={15}
        width="60%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        color="#ffffff"
      >
        Добавить задачу
      </Typography>
      <div
        className="container_3"
        style={{
          width: "35dvw", // Фиксированная ширина
          height: "70dvh", // Фиксированная высота
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "static",
          padding: "20px",
          overflowY: "auto", // Вертикальная прокрутка
          backgroundColor: "#282828", // Фоновый цвет для контейнера
          borderRadius: "8px", // Закругленные углы
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)", // Тень для контейнера
        }}
      >
        <form
          style={{
            position: "static",
            padding: "20px",
            marginBottom: 250,
            height: "70dvh",
            width: "60%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // Занять всю ширину контейнера
          }}
        >
          <TextField
            label="Task_name"
            variant="outlined"
            fullWidth
            backgroundColor="#fff"
            margin="0"
            padding="0"
            color="#ffffff"
            multiline
            onChange={(e) => setTaskName(e.target.value)}
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
            label="Description"
            variant="outlined"
            color="#fff"
            fullWidth
            backgroundColor="#ffffff"
            margin="normal"
            multiline
            rows={4}
            onChange={(e) => setTaskDescription(e.target.value)}
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
            label="Editorial"
            variant="outlined"
            color="#fff"
            fullWidth
            backgroundColor="#ffffff"
            margin="normal"
            multiline
            rows={4}
            onChange={(e) => setEditorial(e.target.value)}
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
            label="Create_solution"
            variant="outlined"
            color="#fff"
            fullWidth
            backgroundColor="#ffffff"
            margin="normal"
            multiline
            rows={4}
            onChange={(e) => setCreatorSolution(e.target.value)}
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
            label="Dificulty"
            fullWidth
            backgroundColor="#ffffff"
            margin="0"
            padding="0"
            color="#ffffff"
            multiline
            onChange={(e) => setDifficulty(e.target.value)}
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
            label="Tests"
            variant="outlined"
            color="#fff"
            fullWidth
            backgroundColor="#ffffff"
            margin="normal"
            multiline
            rows={4}
            onChange={(e) => setTests(e.target.value)}
            helperText='Пример: [{"input": "1 2 3", "expected": "6"}, {"input": "4 5 6", "expected": "15"}]'
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
            label="Main_code"
            variant="outlined"
            color="#fff"
            fullWidth
            backgroundColor="#ffffff"
            margin="normal"
            multiline
            rows={4}
            onChange={(e) => setMainCode(e.target.value)}
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
        </form>
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddTask}
        sx={{ marginTop: 2, marginLeft: 30 }}
      >
        Добавить задачу
      </Button>
    </div>
  );
};

export default AddTasks;
