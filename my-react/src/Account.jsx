import React from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Grid,
  Button,
  Paper,
  AppBar,
  Toolbar,
  // List,
  // ListItem,
  // ListItemText,
  // ListItemAvatar,
  // ListItemIcon
} from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { useNavigate } from "react-router-dom";
import tasksData from "./ListTasks.jsx";
import { completedTasksData } from "./webUsageStats";
import "./styles.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Account = () => {
  const navigate = useNavigate();

  const theme = createTheme({
    typography: {
      fontFamily: "Roboto, Arial, sans-serif", // Задание шрифтов
      h5: {
        fontWeight: 600, // Настройка для h5
        letterSpacing: ".2rem",
      },
    },
  });

  const [userData] = React.useState({
    username: "SosiPopku(jepu)",
    avatar: "/path/to/avatar.jpg",
  });

  const [itemNb] = React.useState(4);
  const [skipAnimation] = React.useState(false);

  // const [radius] = React.useState(65);

  // Example tasks summary data
  // const tasksSummary = {
  //   total: 4,
  //   completed: 0,
  //   easy: { total: 1, completed: 0 },
  //   medium: { total: 2, completed: 0 },
  //   hard: { total: 1, completed: 0 },
  // };

  if (!tasksData || tasksData.length === 0) {
    console.error("No tasks data available");
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#1a1a1a",
          height: "100dvh",
          width: "100dvw",
          justifyContent: "center",
          alignItems: "center",
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
            <Typography
              // variant="h1"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: "flex",
                flexGrow: 1,
                fontFamily: "arial",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            ></Typography>
            <Button
              value="two"
              label="Log out"
              variant="text"
              onClick={() => navigate("/")}
              sx={{
                marginLeft: 2,
                marginBottom: 0,
                backgroundColor: "#202020",
                color: "#ffffff",
              }}
            >
              Log Out
            </Button>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            padding: 2,
            backgroundColor: "#2a2a2a",
            height: "80dvh",
            width: "76dvw",
          }}
        >
          <Grid container spacing={2} paddingTop={2}>
            {/* Left section: Avatar, username, description */}
            <Grid item xs={12} md={4} borderRadius={4}>
              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  backgroundColor: "#1D21261A",
                  color: "#fff",
                  height: "100%",
                  // border-radius: "4px",
                }}
              >
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Avatar
                    alt={userData.username}
                    src={userData.avatar}
                    sx={{ width: 100, height: 100, marginBottom: 2 }}
                  />
                  <Typography
                    sx={{ marginBottom: 2 }}
                    variant="h6"
                    gutterBottom
                  >
                    {userData.username}
                  </Typography>
                  <TextField
                    label="About Me"
                    multiline
                    rows={2}
                    fullWidth
                    variant="outlined"
                    slotProps={{
                      input: { readOnly: false },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        color: "gray",
                        "& fieldset": { borderColor: "gray" },
                        "&:hover fieldset": { borderColor: "gray" },
                      },
                      "& .MuiInputLabel-root": { color: "gray" },
                      "& .MuiInputBase-input": { color: "gray" },
                    }}
                  />
                </Box>
              </Paper>
            </Grid>

            {/* Right section: Pie chart and summary */}
            <Grid item xs={12} md={8}>
              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  backgroundColor: "#1D21261A",
                  color: "#fff",
                }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="row"
                  flexWrap="wrap"
                  gap={2}
                >
                  {/* Диаграмма */}
                  <Box
                    sx={{
                      flex: "1 1 250px",
                      maxWidth: 300, // Ограничение ширины диаграммы
                      minWidth: 200, // Минимальная ширина для предотвращения сжатия
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <PieChart
                      slotProps={{
                        legend: {
                          hidden: true,
                        },
                      }}
                      height={250}
                      series={[
                        {
                          data: completedTasksData.slice(0, itemNb), // Данные для диаграммы
                          innerRadius: 100,
                          outerRadius: 110,
                          paddingAngle: 3,
                          cornerRadius: 8,
                          startAngle: 0,
                          endAngle: 360,
                          cx: 150,
                          cy: 120,
                        },
                      ]}
                      skipAnimation={skipAnimation}
                    />
                  </Box>

                  {/* Легенда */}
                  <Box
                    sx={{
                      flex: "1 1 250px", // Адаптивное распределение пространства
                      maxWidth: 300, // Ограничение ширины легенды
                      minWidth: 200, // Минимальная ширина для предотвращения перекрытия
                      textAlign: "left",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    {completedTasksData
                      .filter((task) => task.label !== "Unsolved") // Игнорируем задачу с label = "unsolved"
                      .map((task) => (
                        <Box
                          key={task.label}
                          display="flex"
                          alignItems="center"
                          sx={{ marginBottom: 1 }}
                        >
                          <Box
                            sx={{
                              width: 16,
                              height: 16,
                              backgroundColor: task.color,
                              marginRight: 1,
                              borderRadius: 4,
                            }}
                          />
                          <Typography variant="body2" sx={{ color: "#fff" }}>
                            {task.label}: {task.value}
                          </Typography>
                        </Box>
                      ))}
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* Bottom section: List of tasks */}
          <Box mt={4}>
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                backgroundColor: "#1D21261A",
                color: "#fff",
                height: "100%",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Tasks
              </Typography>

              {tasksData && tasksData.length > 0 ? (
                tasksData.map((task, index) => (
                  <Box key={index} sx={{ marginBottom: 1 }}>
                    <Typography>
                      {task.title} - {task.difficulty}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography>No tasks available</Typography>
              )}
            </Paper>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Account;
