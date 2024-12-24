export const tasksData = [
    {
      label: 'Easy',
      value: 1, // Количество выполненных задач уровня Easy
      color: 'green',
    },
    {
      label: 'Medium',
      value: 2, // Количество выполненных задач уровня Medium
      color: 'yellow',
    },
    {
      label: 'Hard',
      value: 1, // Количество выполненных задач уровня Hard
      color: 'red',
    },
  ];
  
  export const completedTasksData = tasksData.map((task) => ({
    label: task.label,
    value: task.value,  // Количество выполненных задач
    color: task.color,
  }));
  
  export const valueFormatter = (item) => `${item.value}`;