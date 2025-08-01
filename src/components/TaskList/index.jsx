import { useState } from "react";
import TaskItem from "../TaskItem";

function TaskList({ tasks, onToggleComplete, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400 text-lg">📝 Reja mavjud emas</p>
        <p className="text-gray-500 text-sm mt-2">
          Yuqoridagi maydonga reja yozing
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export default TaskList;
