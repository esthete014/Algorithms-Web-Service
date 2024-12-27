import Splitter, { SplitDirection } from "@devbookhq/splitter";
import "./styles.css";
import BasicGroup from "./Button.jsx";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  AppBar,
  Toolbar,
  ButtonGroup,
  Tab,
  Tabs,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { cpp } from "@codemirror/lang-cpp";
import { json } from "@codemirror/lang-json";
import Chip from "@mui/material/Chip";

const Problems = () => {
  const location = useLocation();
  const { task } = location.state || {};
  const [isAdmin, setIsAdmin] = useState(false);
  const [code, setCode] = useState(""); // Состояние для кода
  const [tests, setTests] = useState([]);
  const [consoleOutput, setConsoleOutput] = useState("");
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState({
    task_id: "",
  });
  const difficultColors = {
    Easy: "#00c853", // Цвет для легких задач
    Medium: "#FFC01E", // Цвет для средних задач
    Hard: "#FF375F", // Цвет для сложных задач
  };
  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (task) {
      setTaskData({
        task_id: task.task_id || "",
      });
    }
  }, [task]);

  // Находим задачу по taskId
  //const selectedTask = tasksData.find((task) => task.id === task);

  useEffect(() => {
    const checkAdminStatus = () => {
      const adminStatus = localStorage.getItem("isAdmin"); // Получаем информацию о администраторе из localStorage
      setIsAdmin(adminStatus === "true"); // Устанавливаем состояние isAdmin
    };

    checkAdminStatus();
  }, []);

  useEffect(() => {
    console.log("Received task:", task);
  }, [task]);
  const handleEditClick = () => {
    navigate("/Redactor", { state: { task: task } }); // Передаем данные задачи в state
  };

  const handleSubmit = async () => {
    const payload = {
      code: code,
      task_id: String(taskData.task_id),
      tests:tests,
      token: ""
    };
  
    try {
      console.log("Отправляемые данные:", payload);
      //console.log(task_id);
      payload.token=document.cookie;
      const response = await fetch("http://26.13.2.150:8080/v2/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Изменено на application/json
        },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
  
      if (result.success) {
        setConsoleOutput(
          `Успешно! Пройдено тестов: ${result.successful_tests}, Неудачных: ${result.failed_tests}`
        );
        //navigate("/problems", { state: { task: task } });
      } else {
        setConsoleOutput("Произошла ошибка при выполнении тестов.");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      setConsoleOutput("Не удалось отправить данные на сервер.");
    }
  };
  return (
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
        <Toolbar variant="dense" sx={{ padding: 0 }}>
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
            <Avatar alt="User" onClick={() => navigate("/Account")} />
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        style={{
          position: "fixed",
          top: "60px",
          width: "100dvw",
          height: "89dvh",
          flexDirection: "column",
        }}
      >
        {/* Верхняя панель с кнопками */}
        <Box
          sx={{
            position: "relative",
            marginBottom: "7px",
            height: "5dvh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isAdmin && (
            <ButtonGroup
              color="#fff"
              sx={{
                position: "fixed",
                height: "4dvh",
                display: "flex",
                justifyContent: "start",
                alignItems: "start",
                left: 20,
              }}
              aria-label="Small button group"
            >
              <Button>
                <ModeEditOutlineIcon onClick={handleEditClick} />
              </Button>
              <Button>
                <DeleteIcon onClick={handleSubmit}/>
              </Button>
            </ButtonGroup>
          )}
          <Button onClick={() => handleSubmit(task?.id, tests)}>Run</Button>
          {/* <BasicGroup onClick={() => handleSubmit(task?.id, tests)} />  */}
          {/* <AccountMenu /> */}
        </Box>
        {/* Разделение контента на горизонтальные и вертикальные панели */}
        <Splitter
          gutterClassName="custom-gutter-horizontal"
          draggerClassName="custom-dragger-horizontal"
          minWidths={[150, 0]}
          direction={SplitDirection.Horizontal}
          TileOverflowY
        >
          {/* Левый блок с описанием задачи */}
          <div
            style={{
              padding: "20px",
              height: "100dvh",
              backgroundColor: "#202020",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3>Задача:</h3>
            {task ? (
              <>
                <Chip
                  label={task.difficult}
                  sx={{
                    position: "static",
                    width: "4dvw",
                    backgroundColor: difficultColors[task.difficult],
                  }}
                />
                <p>
                  {task.task_name} - {task.difficult}
                </p>
                <p>{task.description}</p> {/* Отображение описания задачи */}
                <p>{task.editorial}</p> {/* Отображение редакции задачи */}
              </>
            ) : (
              <p>Задача не найдена.</p>
            )}
          </div>
          {/* Правый блок с кодом и консолью */}
          <div
            style={{
              height: "100dvh",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#202020",
            }}
          >
            <div className="flex items-center justify-between bg-dark-layer-2 h-11 w-full">
              <div className="flex items-center text-white">
                <button className="flex cursor-pointer items-center rounded focus:outline-none bg-dark-fill-3 text-dark-label-2 hover:bg-dark-fill-2  px-2 py-1.5 font-medium">
                  <div className="flex items-center px-1">
                    <div className="text-xs text-label-2 dark:text-dark-label-2">
                      C++
                    </div>
                  </div>
                </button>
              </div>
            </div>
            <Splitter
              gutterClassName="custom-gutter-vertical"
              draggerClassName="custom-dragger-vertical"
              direction={SplitDirection.Vertical}
            >
              {/* Текстовое поле для написания кода */}
              <div className="overflow-auto" style={{ height: "100%" }}>
                <CodeMirror
                  value={code}
                  theme={vscodeDark}
                  extensions={[cpp()]}
                  style={{ fontSize: 16 }}
                  onChange={(value) => setCode(value)}
                />
              </div>
              <div
                className="w-full px-5 overflow-auto"
                style={{ height: "100%" }}
              >
                {/* testcase heading */}
                <Box sx={{ width: "100%" }}>
                  {/* Tabs */}
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="#202020"
                    // indicatorColor="white"
                    // aria-label="secondary tabs example"
                  >
                    <Tab value="one" label="Testcase" />
                    <Tab value="two" label="Console" />
                  </Tabs>

                  {/* Tab content */}
                  <Box sx={{ mt: 2 }}>
                    {value === "one" && (
                      <div className="font-semibold my-4">
                        <p className="text-sm font-medium mt-4 text-white">
                          Input:
                        </p>
                        <div
                          className="w-full cursor-text rounded-lg border px-3 py-[10px]
                        bg-dark-fill-3 border-transparent text-white mt-2 overflow-auto"
                          style={{ maxHeight: "200px" }}
                        >
                          <div>
                            <CodeMirror
                              value={tests.join("\n")}
                              theme={vscodeDark}
                              extensions={[json()]}
                              style={{ fontSize: 16 }}
                              onChange={(value) => setTests(value.split("\n"))}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    {value === "two" && (
                      <div>
                        <h3>Console</h3>
                        <pre style={{ color: "white" }}>
                          {consoleOutput}
                        </pre>{" "}
                        {/* Выводим результат в консоли */}
                      </div>
                    )}
                  </Box>
                </Box>
              </div>
            </Splitter>
          </div>
        </Splitter>
      </Box>
    </Box>
  );
};

export default Problems;
