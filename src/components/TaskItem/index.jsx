// import { useState } from "react";

// function TaskItem({ task, onToggleComplete, onDelete, onEdit }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editText, setEditText] = useState(task.text);

//   const handleEditSubmit = () => {
//     if (editText.trim() === "") return;
//     onEdit(task.id, editText.trim());
//     setIsEditing(false);
//   };

//   return (
//     <li className="group flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
//       <div className="flex items-center flex-1">
//         <input
//           type="checkbox"
//           checked={task.completed}
//           onChange={() => onToggleComplete(task.id)}
//           className="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 mr-3"
//         />

//         {isEditing ? (
//           <input
//             type="text"
//             value={editText}
//             onChange={(e) => setEditText(e.target.value)}
//             onBlur={handleEditSubmit}
//             onKeyPress={(e) => e.key === "Enter" && handleEditSubmit()}
//             autoFocus
//             className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
//           />
//         ) : (
//           <span
//             className={`flex-1 ${
//               task.completed ? "line-through text-gray-400" : "text-gray-700"
//             }`}
//             onDoubleClick={() => setIsEditing(true)}
//           >
//             {task.text}
//           </span>
//         )}
//       </div>

//       <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition">
//         <button
//           onClick={() => setIsEditing(!isEditing)}
//           className="p-1 text-gray-500 hover:text-indigo-600"
//         >
//           ✏️
//         </button>
//         <button
//           onClick={() => onDelete(task.id)}
//           className="p-1 text-gray-500 hover:text-red-600"
//         >
//           🗑️
//         </button>
//       </div>
//     </li>
//   );
// }

// export default TaskItem;


import { useState } from "react";

function TaskItem({ task, onToggleComplete, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEditSubmit = () => {
    if (editText.trim() === "") return;
    onEdit(task.id, editText.trim());
    setIsEditing(false);
  };

  return (
    <li className="group flex flex-col sm:flex-row items-start gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
      {/* Checkbox - har doim tepada */}
      <div className="flex items-center w-full sm:w-auto">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          className="h-5 w-5 min-w-5 text-indigo-600 rounded focus:ring-indigo-500 mr-3"
        />
      </div>

      {/* Asosiy kontent */}
      <div className="flex-1 w-full flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyPress={(e) => e.key === 'Enter' && handleEditSubmit()}
            autoFocus
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        ) : (
          <span
            className={`flex-1 break-words ${
              task.completed ? 'line-through text-gray-400' : 'text-gray-700'
            }`}
            onDoubleClick={() => setIsEditing(true)}
          >
            {task.text}
          </span>
        )}

        {/* Tahrirlash/O'chirish tugmalari - har doim ko'rinib turishi */}
        <div className="flex self-end sm:self-auto gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-sm hover:bg-indigo-200 transition-colors"
            aria-label="Tahrirlash"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-colors"
            aria-label="O'chirish"
          >
            🗑️
          </button>
        </div>
      </div>
    </li>
  );
}

export default TaskItem;