
import Splitter, { SplitDirection } from '@devbookhq/splitter';
import './styles.css';
import BasicGroup from './Button.jsx';
// import AccountMenu from './AccountButton.jsx';
import { Box, Button, Tabs } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Problems = () => {
    const [value, setValue] = useState('one');
    
      const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    const navigate = useNavigate(); // Хук для программной навигации

    return (
        <Box sx={{ zIndex: -5, display: "flex", flexDirection: "column", backgroundColor: "#1a1a1a", height: "100dvh", width: "100dvw", 
            justifyContent: "center", alignItems: "center", margin: 0}}>
        
            <Box sx={{  paddingLeft: "215px", marginBottom: 5, marginTop: -22, width: "calc(100% - 215px)", backgroundColor: "#202020"}}>
                <Tabs 
                value={value}
                onChange={handleChange}
                textColor="#ffffff"
                indicatorColor="#ffffff"
                aria-label="secondary tabs example"
                >
                <Button onClick={() => navigate("/ListTasks")}
                    //variant='text'
                    sx={{ marginBottom: 0, backgroundColor: "#202020", color: "#202020" }}>
                    
                    <img src="/logo-full.png" alt="Logo"/>
                </Button>
                </Tabs>
            </Box>
        
            <div style={{ width: '100dvw', height: '89%', marginBottom: -155, display: 'flex', flexDirection: 'column' }}>
                {/* Верхняя панель с кнопками */}
                <div style={{ marginTop: -35, height: '5dvh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <BasicGroup /> {/* Компонент с кнопками */}
                    {/* <AccountMenu /> */}
                </div>
                {/* Разделение контента на горизонтальные и вертикальные панели */}
                <Splitter direction={SplitDirection.Horizontal}>
                {/* Левый блок с описанием задачи */}
                    <div style={{ padding: '20px', height: '100%' }}>
                        <h3>Задача:</h3>
                        <p>Постановка задачи:</p>
                    </div>
                    {/* Правый блок с кодом и консолью */}
                    <div style={{ padding: '0px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Splitter direction={SplitDirection.Vertical}>
                            {/* Текстовое поле для написания кода */}
                            <div style={{ padding: '0px', height: '80%' }}>
                                <textarea placeholder="Ваш код..." style={{ width: '100%', height: '100%' }}></textarea>
                            </div>
                            {/* Консоль */}
                            <div style={{ padding: '20px', height: '20%' }}>
                                <h3>Консоль:</h3> {/* Место для вывода консольных сообщений */}
                            </div>
                        </Splitter>
                    </div>
                </Splitter>
            </div>
        </Box>
    );
};

export default Problems;