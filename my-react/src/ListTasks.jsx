import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles.css";

const tasksData = [
    { id: 1, title: 'Two Sum', difficulty: 'Easy' },
    { id: 2, title: 'Add Two Numbers', difficulty: 'Medium' },
    { id: 3, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium' },
    { id: 4, title: 'Median of Two Sorted Arrays', difficulty: 'Hard' },
];

const ListTasks = () => {
    const [sortOrder, setSortOrder] = useState('all'); // По умолчанию "все задачи"
    const navigate = useNavigate();

    const filterTasks = () => {
        if (sortOrder === 'all') {
            return tasksData; // Возвращаем все задачи
        }
        return tasksData.filter(task => task.difficulty.toLowerCase() === sortOrder);
    };

    const handleSortChange = (event) => {
        setSortOrder(event.target.value); // Обновляем состояние выбранного уровня сложности
    };

    const handleTaskClick = (taskId) => {
        navigate('/problems', { state: { taskId } });
    };

    const filteredTasks = filterTasks(); // Получаем отфильтрованный список задач

    return (
        <div className="container_2">
            <h1 className="header">Список задач</h1>
            <div className="radio-group">
                <label>
                    <input
                        type="radio"
                        value="all"
                        checked={sortOrder === 'all'}
                        onChange={handleSortChange}
                    />
                    Все задачи
                </label>
                <label style={{ color: "#00B8A3" }}>
                    <input
                        type="radio"
                        value="easy"
                        checked={sortOrder === 'easy'}
                        onChange={handleSortChange}
                    />
                    Easy
                </label>
                <label style={{ color: "#FFC01E" }}>
                    <input
                        type="radio"
                        value="medium"
                        checked={sortOrder === 'medium'}
                        onChange={handleSortChange}
                    />
                    Medium
                </label>
                <label style={{ color: "#FF375F" }}>
                    <input
                        type="radio"
                        value="hard"
                        checked={sortOrder === 'hard'}
                        onChange={handleSortChange}
                    />
                    Hard
                </label>
            </div>
            <ul className="list">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                        <li key={task.id} onClick={() => handleTaskClick(task.id)} className="list-item">
                            {task.title} - {task.difficulty}
                        </li>
                    ))
                ) : (
                    <li className="list-item">Нет задач для выбранного уровня сложности.</li>
                )}
            </ul>
        </div>
    );
};

export default ListTasks;
