//import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Splitter, { SplitDirection } from '@devbookhq/splitter';
import './styles.css';
import BasicGroup from './Button.jsx';

const Problems = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const taskId = state ? state.taskId : null;

    // Здесь можно получить информацию о задаче по taskId (например, из базы данных или массива задач)
    const taskDetails = taskId ? `Задача с ID: ${taskId}` : 'Выберите задачу из списка.';

    const handleBackToList = () => {
        navigate('/ListTasks');
    };

    return (
        <div style={{ width: '100dvw', height: '100dvh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '5dvh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <BasicGroup />
                <button onClick={handleBackToList} style={{ marginLeft: '20px' }}>
                    Вернуться к списку задач
                </button>
            </div>
            <Splitter direction={SplitDirection.Horizontal}>
                <div style={{ padding: '20px', height: '100%' }}>
                    <h3>Задача:</h3>
                    <p>{taskDetails}</p>
                </div>
                <div style={{ padding: '0px', height: '100%' }}>
                    <Splitter direction={SplitDirection.Vertical}>
                        <textarea placeholder="Ваш код..." style={{ width: '100%', height: '80%' }}></textarea>
                        <h3>Консоль:</h3>
                    </Splitter>
                </div>
            </Splitter>
        </div>
    );
};

export default Problems;
