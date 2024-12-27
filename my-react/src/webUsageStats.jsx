export const tasksData = [
  {
    label: "Easy",
    value: 1, // Количество выполненных задач уровня Easy
    color: "#00cc66",
  },
  {
    label: "Medium",
    value: 2, // Количество выполненных задач уровня Medium
    color: "#ffab00",
  },
  {
    label: "Hard",
    value: 1, // Количество выполненных задач уровня Hard
    color: "#FF375F",
  },
  {
    label: "Unsolved",
    value: 5, // Количество выполненных задач
    color: "#424242",
  },
];

export const completedTasksData = tasksData.map((task) => ({
  label: task.label,
  value: task.value,
  color: task.color,
}));

export const valueFormatter = (item) => `${item.value}`;
