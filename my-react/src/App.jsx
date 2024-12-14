import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";

function App() {
  const [text, setText] = useState(""); // Состояние для текста
  const [printText, setPrintText] = useState(""); // Состояние для текста на печать
  const [leftPanelWidth, setLeftPanelWidth] = useState(50); // Ширина левой панели в процентах
  const [isDragging, setIsDragging] = useState(false); // Флаг для отслеживания перетаскивания
  const [consoleHeight, setConsoleHeight] = useState(150); // Высота консоли в пикселях
  const [isDraggingConsole, setIsDraggingConsole] = useState(false); // Флаг для отслеживания перетаскивания консоли

  const handleTextChange = (e) => {
    setText(e.target.value); // Обновляем текст из текстового поля
    setPrintText(e.target.value); // Обновляем текст для отображения в "консоли"
  };

  const handlePrintText = () => {
    setPrintText(text); // Устанавливаем текст для печати
  };

  const handleRunCode = () => {
    console.log("Код запущен!"); // Здесь вы можете добавить свою логику
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newWidth = (e.clientX / window.innerWidth) * 100; // Вычисляем новую ширину
      if (newWidth > 10 && newWidth < 90) {
        // Ограничиваем ширину от 10% до 90%
        setLeftPanelWidth(newWidth);
      }
    }

    if (isDraggingConsole) {
      const newHeight = window.innerHeight - e.clientY; // Вычисляем новую высоту консоли
      if (newHeight > 50 && newHeight < window.innerHeight - 10) {
        // Ограничиваем высоту
        setConsoleHeight(newHeight);
      }
    }
  };

  const handleMouseDown = () => {
    setIsDragging(true); // Начинаем перетаскивание разделителя колонок
  };

  const handleMouseUp = () => {
    setIsDragging(false); // Останавливаем перетаскивание разделителя колонок
    setIsDraggingConsole(false); // Останавливаем перетаскивание консоли
  };

  return (
    <div
      className="container"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="header">Header</div>
      <div className="content">
        <div className="left-panel" style={{ width: `${leftPanelWidth}%` }}>
          <h2>Задача:</h2>
          <div className="print-content">
            {printText ? printText : "Постановка задачи"}
          </div>
        </div>
        <div
          className="divider"
          onMouseDown={handleMouseDown}
          style={{ cursor: "ew-resize", width: "10px", background: "#ccc" }}
        />
        <div
          className="right-panel"
          style={{ width: `${100 - leftPanelWidth}%` }}
        >
          <h2>Ваше решение:</h2>
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Введите текст здесь..."
            style={{ width: "100%", height: "150px" }} // Устанавливаем ширину и высоту textarea
          />
          <div
            className="console-container"
            style={{ height: `${consoleHeight}px` }}
          >
            <div className="console">
            {/* Здесь будет ваш текст консоли */}
            <p>Содержимое консоли</p>
            </div>
            <div
            className="console-divider"
            onMouseDown={() => setIsDraggingConsole(true)}
            />
          </div>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button onClick={handlePrintText}>Проверить</button>
            <button onClick={handleRunCode}>Запустить код</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
