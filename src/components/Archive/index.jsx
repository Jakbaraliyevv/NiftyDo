import { useEffect } from "react";

function Archive({ tasks, onBack }) {
  const archivedDates = Object.keys(tasks)
    .filter((date) => date !== new Date().toISOString().split("T")[0])
    .sort((a, b) => new Date(b) - new Date(a));

  // Komponentga qo'shing
  useEffect(() => {
    console.log("Joriy ekran kengligi:", window.innerWidth);
    const handleResize = () => console.log("Yangi kenglik:", window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="p-4 sm:p-6">
      <div className="flex  sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">Arxiv</h2>
        <button
          onClick={onBack}
          className="px-3 py-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg text-sm transition-colors w-[40%] sm:w-auto text-center"
        >
          Orqaga
        </button>
      </div>

      {archivedDates.length === 0 ? (
        <div className="text-center py-6 sm:py-8 text-gray-500 text-sm sm:text-base">
          Arxivda hech qanday rejalar topilmadi
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {archivedDates.map((date) => (
            <div key={date} className="border-b border-gray-200 pb-3 sm:pb-4">
              <h3 className="font-semibold text-gray-700 text-sm sm:text-base mb-1 sm:mb-2">
                {new Date(date).toLocaleDateString("uz-UZ", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h3>
              <ul className="space-y-1 sm:space-y-2">
                {tasks[date].map((task) => (
                  <li
                    key={task.id}
                    className={`px-2 py-1 text-xs sm:text-sm ${
                      task.completed
                        ? "line-through text-gray-400"
                        : "text-gray-600"
                    }`}
                  >
                    {task.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Archive;
