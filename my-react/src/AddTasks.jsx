import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import {
  Box,
  Typography,
  Avatar,
  Button,
  AppBar,
  Toolbar,
  TextField,
  Paper,
} from "@mui/material";

const AddTasks = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const navigate = useNavigate();

  const handleAddTask = () => {
    if (taskName && taskDescription) {
      const newTask = {
        name: taskName,
        description: taskDescription,
      };
      onAddTask(newTask); // Вызов функции для добавления задачи
      navigate("/ListTasks"); // Перенаправление на страницу со списком задач
    } else {
      alert("Пожалуйста, заполните все поля.");
    }
  };

  return (
    <div style={{ color: "#fff" }}>
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
            <Avatar alt="User " onClick={() => navigate("/Account")} />
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "100px",
          padding: "20px",
        }}
      >
        <Paper elevation={3} sx={{ padding: "20px", width: "400px" }}>
          <Typography variant="h5" gutterBottom>
            Добавить задачу
          </Typography>
          <TextField
            label="Название задачи"
            variant="outlined"
            fullWidth
            margin="normal"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <TextField
            label="Описание задачи"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddTask}
            sx={{ marginTop: "10px" }}
          >
            Добавить задачу
          </Button>
        </Paper>
      </Box>
    </div>
  );
};

export default AddTasks;
