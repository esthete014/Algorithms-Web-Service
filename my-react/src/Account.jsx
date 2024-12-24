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
  Toolbar
} from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { useNavigate } from "react-router-dom";
import tasksData from "./ListTasks.jsx";
import { completedTasksData, valueFormatter } from './webUsageStats';

const Account = () => {
  const navigate = useNavigate();

  const [userData] = React.useState({
    username: "JohnDoe",
    description: "Passionate coder and problem solver",
    avatar: "/path/to/avatar.jpg",
  });
  const [radius] = React.useState(65);
  const [itemNb] = React.useState(3);
    
  // const [radius, setRadius] = React.useState(50);
  // const [itemNb, setItemNb] = React.useState(5);
  const [skipAnimation] = React.useState(false);

  // Example tasks summary data
  const tasksSummary = {
    total: 4,
    completed: 0,
    easy: { total: 1, completed: 0 },
    medium: { total: 2, completed: 0 },
    hard: { total: 1, completed: 0 },
  };

  if (!tasksData || tasksData.length === 0) {
    console.error("No tasks data available");
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", backgroundColor: "#1a1a1a", height: "100dvh", width: "100dvw", 
            justifyContent: "center", alignItems: "center"}}>

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

      <Box sx={{ padding: 2, backgroundColor: "#202020", height: "80dvh", width: "76dvw" }}>
        <Grid container spacing={2} paddingTop={2} >
          {/* Left section: Avatar, username, description */}
          <Grid item xs={12} md={4} borderRadius={4} >
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                backgroundColor: "#3a3f47",
                color: "#fff",
                // border-radius: "4px",
              }}
            >
              <Box display="flex" flexDirection="column" alignItems="center">
                <Avatar
                  alt={userData.username}
                  src={userData.avatar}
                  sx={{ width: 100, height: 100, marginBottom: 2 }}
                />
                <Typography variant="h6" gutterBottom>
                  {userData.username}
                </Typography>
                <TextField
                  label="About Me"
                  multiline
                  rows={2}
                  value={userData.description}
                  fullWidth
                  variant="outlined"
                  slotProps={{
                    input: { readOnly: true },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': { borderColor: 'white' },
                      '&:hover fieldset': { borderColor: 'white' },
                    },
                    '& .MuiInputLabel-root': { color: 'white' },
                    '& .MuiInputBase-input': { color: 'white' },
                  }}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Right section: Pie chart and summary */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ padding: 2, backgroundColor: "#3a3f47", color: "#fff", }} >
              <Box sx={{ width: '100%' }} display="flex" flexDirection="column" alignItems="center">
                <PieChart
                  height={300}
                  series={[
                    {
                      data: completedTasksData.slice(0, itemNb),  // Используем список завершённых задач
                      innerRadius: radius,
                      arcLabel: (params) => params.label ?? '',
                      arcLabelMinAngle: 20,
                      valueFormatter,
                    },
                  ]}
                  skipAnimation={skipAnimation}
                />

                {/* <FormControlLabel
                  checked={skipAnimation}
                  control={
                    <Checkbox onChange={(event) => setSkipAnimation(event.target.checked)} />
                  }
                  label="skipAnimation"
                  labelPlacement="end"
                /> */}

                {/* <Typography id="input-item-number" gutterBottom>
                  Number of items
                </Typography>

                <Slider
                  value={itemNb}
                  onChange={handleItemNbChange}
                  valueLabelDisplay="auto"
                  min={1}
                  max={8}
                  aria-labelledby="input-item-number"
                />

                  <Typography id="input-radius" gutterBottom>
                    Radius
                  </Typography>

                <Slider
                  value={radius}
                  onChange={handleRadius}
                  valueLabelDisplay="auto"
                  min={15}
                  max={100}
                  aria-labelledby="input-radius"
                /> */}

                <Typography variant="h6" gutterBottom>
                  {tasksSummary.completed}/{tasksSummary.total} задач выполнено
                </Typography>

                {/* Сводка по уровням сложности */}
                <Box textAlign="center">
                  <Typography sx={{ color: "green" }}>Легкий</Typography>
                  <Typography>
                    {tasksSummary.completed}/{tasksSummary.easy.total}
                  </Typography>
                  <Typography sx={{ color: "yellow" }}>Средний</Typography>
                  <Typography>
                    {tasksSummary.completed}/{tasksSummary.medium.total}
                  </Typography>
                  <Typography sx={{ color: "red" }}>Сложный</Typography>
                  <Typography>
                    {tasksSummary.completed}/{tasksSummary.hard.total}
                  </Typography>
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
              backgroundColor: "#3a3f47",
              color: "#fff",
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
  );
};

export default Account;