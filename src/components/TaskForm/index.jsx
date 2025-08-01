// import { useState } from "react";

// function TaskForm({ onAddTask }) {
//   const [input, setInput] = useState("");

//   const handleSubmit = () => {
//     if (input.trim() === "") return;
//     onAddTask(input.trim());
//     setInput("");
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") handleSubmit();
//   };

//   return (
//     <div className="flex gap-2 mb-6">
//       <input
//         type="text"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         onKeyPress={handleKeyPress}
//         placeholder="Bugungi rejani yozing..."
//         className="flex-1 p-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition"
//       />
//       <button
//         onClick={handleSubmit}
//         className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg text-white font-medium transition-colors shadow-md"
//       >
//         ➕ Qo'shish
//       </button>
//     </div>
//   );
// }

// export default TaskForm;
import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (input.trim() === "") return;
    onAddTask(input.trim());
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mb-4 sm:mb-6">
      <div className="flex flex-row gap-2 w-full items-stretch">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Reja yozing..."
          className="flex-1 min-w-0 p-2 sm:p-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition text-sm sm:text-base"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 px-3 sm:px-4 py-2 rounded-lg text-white font-medium transition-colors shadow-md text-sm sm:text-base whitespace-nowrap flex items-center justify-center"
        >
          
          <span className="hidden xs:inline">Qo'shish</span>
          <span className="xs:hidden">➕</span>
        </button>
      </div>
    </form>
  );
}

export default TaskForm;

