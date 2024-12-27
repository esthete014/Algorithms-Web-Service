import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
//import AddTasks from "./AddTasks";
//import { Box, Button, Tabs } from '@mui/material';
//import { buildApiUrl } from "./GetHost";
import AddIcon from "@mui/icons-material/Add";
// import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import {
  Box,
  Typography,
  Avatar,
  Button,
  AppBar,
  Toolbar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

const columns = [
  { id: "task_name", label: "Title", minWidth: 250 },
  { id: "difficult", label: "Difficult", minWidth: 186 },
];

const ListTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();
  const difficultyColors = {
    easy: "#00c853", // Цвет для легких задач
    medium: "#FFC01E", // Цвет для средних задач
    hard: "#FF375F", // Цвет для сложных задач
  };
  // const handleAddTask = (newTask) => {
  //   setTasks((prevTasks) => [...prevTasks, newTask]);
  // };

  useEffect(() => {
    const checkAdminStatus = () => {
      const adminStatus = localStorage.getItem("isAdmin"); // Получаем информацию о администраторе из localStorage
      setIsAdmin(adminStatus === "true"); // Устанавливаем состояние isAdmin
    };

    checkAdminStatus();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://26.13.2.150:8080/v2/get-tasks', {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      //  // Your API endpoint
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTasks(data.tasks); // Assuming the response structure is like the backend example
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  
  useEffect(() => {
    fetchTasks();
  }, []);

  console.log(tasks);

  const [sortOrder, setSortOrder] = useState("all");
  // Фильтрация задач в зависимости от выбранной сложности
  const filterTasks = () => {
    if (sortOrder === "all") {
      return tasks; // Если выбрано "все", возвращаем весь список
    }
    return tasks.filter(
      (task) => task.difficult.toLowerCase() === sortOrder // Используем difficult
    );
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // Обновление выбранного уровня сложности
  const handleSortChange = (event) => {
    setSortOrder(event.target.value); // Обновляем состояние на основе выбранного значения
  };

  // Переход к задаче по клику
  const handleTaskClick = (task) => {
    navigate("/problems", { state: { task } }); // Передаём ID задачи через state
  };

  // const handleEditClick = (taskId) => {
  //   navigate(`/Redactor/${taskId}`); // Переход к редактированию задачи
  // };

  const filteredTasks = filterTasks(); // Получаем список отфильтрованных задач

  return (
    <Box
      sx={{
        zIndex: -5,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#1a1a1a",
        height: "100dvh",
        width: "100dvw",
        justifyContent: "center",
        alignItems: "center",
        margin: 0,
      }}
    >
      <AppBar position="fixed" sx={{ backgroundColor: "#202020" }}>
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
            <Avatar alt="User" onClick={() => navigate("/Account")} />
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
              checked={sortOrder === "all"} // Устанавливаем активное состояние
              onChange={handleSortChange} // Обработчик изменения
            />
            Все задачи
          </label>
          <label style={{ color: "#00c853" }}>
            <input
              type="radio"
              value="easy"
              checked={sortOrder === "easy"}
              onChange={handleSortChange}
            />
            Easy
          </label>
          <label style={{ color: "#FFC01E" }}>
            <input
              type="radio"
              value="medium"
              checked={sortOrder === "medium"}
              onChange={handleSortChange}
            />
            Medium
          </label>
          <label style={{ color: "#FF375F" }}>
            <input
              type="radio"
              value="hard"
              checked={sortOrder === "hard"}
              onChange={handleSortChange}
            />
            Hard
          </label>
        </div>
        {/* Список задач */}
        <Paper
          position="fixed"
          sx={{
            width: "100%",
            overflow: "auto",
            backgroundColor: "#1a1a1a",
            borderRadius: 5,
          }}
        >
          {/* Кнопка для админа */}
          {isAdmin && (
            <Button
              sx={{
                marginRight: 0,
                borderRadius: 5,
                marginLeft: 1,
                color: "#fff",
              }}
              onClick={() => navigate("/AddTasks")} // Добавляем обработчик нажатия
            >
              <AddIcon />
              Add Task
            </Button>
          )}
          {/* <AddTasks onAddTask={handleAddTask} /> */}
          {/* /////////// */}
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        color: "#ffffff",
                        backgroundColor: "#1a1a1a",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTasks
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((task) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={task.id}
                        onClick={() => handleTaskClick(task)}
                         // Переход к задаче
                      >
                        {columns.map((column) => {
                          const value = task[column.id];
                          return (
                            <TableCell
                              sx={{
                                color:
                                  column.id === "difficult"
                                    ? difficultyColors[value.toLowerCase()]
                                    : "#ffffff",
                                backgroundColor: "#1a1a1a",
                              }}
                              key={column.id}
                              align={column.align}
                            >
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            sx={{
              color: "#ffffff",
              backgroundColor: "#1a1a1a",
            }}
            rowsPerPageOptions={[1, 3, 10]}
            component="div"
            //count={filteredTasks.length}
            count={tasks.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default ListTasks; // Экспорт компонента
