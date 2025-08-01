// import { useState, useEffect } from "react";
// import Calendar from "../../components/calendar";
// import Archive from "../../components/Archive";
// import TaskForm from "../../components/TaskForm";
// import TaskList from "../../components/TaskList";
// import Stats from "../../components/Stats";

// function Home() {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [tasks, setTasks] = useState({});
//   const [showArchive, setShowArchive] = useState(false);
//   const [isLoaded, setIsLoaded] = useState(false); // Loading holati qo'shildi
//   const [deleteModal, setDeleteModal] = useState({ show: false, taskId: null });
//   const [debugModal, setDebugModal] = useState(false);

//   // 1. LocalStorage'dan ma'lumotlarni ishonchli o'qish
//   useEffect(() => {
//     try {
//       const savedTasks = localStorage.getItem("tasks");
//       console.log("LocalStorage'dan o'qildi:", savedTasks); // Debug uchun

//       if (savedTasks && savedTasks !== "undefined" && savedTasks !== "null") {
//         const parsedTasks = JSON.parse(savedTasks);
//         // Agar parsedTasks obyekt bo'lmasa, bo'sh obyekt qaytarish
//         if (
//           parsedTasks &&
//           typeof parsedTasks === "object" &&
//           !Array.isArray(parsedTasks)
//         ) {
//           setTasks(parsedTasks);
//           console.log("Tasks yuklandi:", parsedTasks); // Debug uchun
//         } else {
//           console.warn(
//             "LocalStorage'dagi ma'lumot noto'g'ri formatda. Bo'sh obyekt yaratildi."
//           );
//           setTasks({});
//           localStorage.removeItem("tasks");
//         }
//       } else {
//         setTasks({});
//       }
//     } catch (error) {
//       console.error("LocalStorage'dan o'qishda xato:", error);
//       setTasks({});
//       localStorage.removeItem("tasks");
//     } finally {
//       setIsLoaded(true); // Ma'lumotlar yuklangani belgilanadi
//     }
//   }, []);

//   // 2. Tasks o'zgarganda ishonchli saqlash (faqat yuklanganidan keyin)
//   useEffect(() => {
//     if (!isLoaded) return; // Agar hali yuklanmagan bo'lsa, saqlamaymiz

//     try {
//       const tasksToSave = JSON.stringify(tasks);
//       localStorage.setItem("tasks", tasksToSave);
//       console.log("LocalStorage'ga saqlandi:", tasksToSave); // Debug uchun
//     } catch (error) {
//       console.error("LocalStorage'ga yozishda xato:", error);
//       // Agar ma'lumot juda katta bo'lsa, eski ma'lumotlarni tozalash
//       if (error.name === "QuotaExceededError") {
//         alert("LocalStorage sig'imi tugadi. Eski ma'lumotlar tozalanadi.");
//         localStorage.clear();
//       }
//     }
//   }, [tasks, isLoaded]);

//   // 3. Vazifa qo'shish funksiyasi
//   const addTask = (taskText) => {
//     if (!taskText.trim()) return; // Bo'sh matn bo'lsa qaytarish

//     const dateKey = selectedDate.toISOString().split("T")[0];
//     const newTask = {
//       id: Date.now() + Math.random(), // Unique ID uchun
//       text: taskText.trim(),
//       completed: false,
//       createdAt: new Date().toISOString(),
//       date: dateKey,
//     };

//     setTasks((prev) => ({
//       ...prev,
//       [dateKey]: [...(prev[dateKey] || []), newTask],
//     }));
//   };

//   // 4. Vazifani bajarilgan deb belgilash
//   const toggleComplete = (taskId) => {
//     const dateKey = selectedDate.toISOString().split("T")[0];
//     setTasks((prev) => ({
//       ...prev,
//       [dateKey]: (prev[dateKey] || []).map((task) =>
//         task.id === taskId ? { ...task, completed: !task.completed } : task
//       ),
//     }));
//   };

//   // 5. Vazifani o'chirish
//   const deleteTask = (taskId) => {
//     setDeleteModal({ show: true, taskId });
//   };

//   const confirmDelete = () => {
//     const dateKey = selectedDate.toISOString().split("T")[0];
//     setTasks((prev) => ({
//       ...prev,
//       [dateKey]: (prev[dateKey] || []).filter(
//         (task) => task.id !== deleteModal.taskId
//       ),
//     }));
//     setDeleteModal({ show: false, taskId: null });
//   };

//   // 6. Vazifani tahrirlash
//   const editTask = (taskId, newText) => {
//     if (!newText.trim()) return; // Bo'sh matn bo'lsa qaytarish

//     const dateKey = selectedDate.toISOString().split("T")[0];
//     setTasks((prev) => ({
//       ...prev,
//       [dateKey]: (prev[dateKey] || []).map((task) =>
//         task.id === taskId ? { ...task, text: newText.trim() } : task
//       ),
//     }));
//   };

//   // 7. Debug funksiyalari
//   const clearAllData = () => {
//     setDebugModal(true);
//   };

//   const confirmClearAll = () => {
//     localStorage.removeItem("tasks");
//     setTasks({});
//     setDebugModal(false);
//   };

//   // Loading holatida
//   if (!isLoaded) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8 flex items-center justify-center">
//         <div className="text-lg">Yuklanmoqda...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-2 sm:p-4 md:p-8">
//       <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
//         {showArchive ? (
//           <Archive tasks={tasks} onBack={() => setShowArchive(false)} />
//         ) : (
//           <>
//             <div className="p-3 sm:p-4 md:p-6">
//               <Calendar
//                 selectedDate={selectedDate}
//                 onDateChange={setSelectedDate}
//                 onShowArchive={() => setShowArchive(true)}
//               />

//               <div className="mt-4 md:mt-6">
//                 <TaskForm onAddTask={addTask} />
//               </div>

//               <div className="mt-4 md:mt-6">
//                 <TaskList
//                   tasks={tasks[selectedDate.toISOString().split("T")[0]] || []}
//                   onToggleComplete={toggleComplete}
//                   onDelete={deleteTask}
//                   onEdit={editTask}
//                 />
//               </div>

//               <Stats
//                 tasks={tasks[selectedDate.toISOString().split("T")[0]] || []}
//               />

//               {/* Debug uchun tugma (production'da olib tashlash kerak) */}
//               <button
//                 onClick={clearAllData}
//                 className="mt-4 px-3 py-2 text-sm sm:px-4 sm:py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
//               >
//                 <span className="hidden sm:inline">
//                   Barcha ma'lumotlarni tozalash
//                 </span>
//                 <span className="sm:hidden">Debug tozalash</span>
//               </button>
//             </div>
//           </>
//         )}
//       </div>

//       {/* Delete Modal - To'liq responsive */}
//       {deleteModal.show && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-xs sm:max-w-sm mx-2 sm:mx-4 transform transition-all">
//             <div className="p-4 sm:p-6">
//               <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 bg-red-100 rounded-full">
//                 <svg
//                   className="w-5 h-5 sm:w-6 sm:h-6 text-red-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                   ></path>
//                 </svg>
//               </div>
//               <div className="text-center">
//                 <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
//                   Vazifani o'chirish
//                 </h3>
//                 <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 px-2">
//                   Bu vazifani o'chirishni xohlaysizmi? Bu amalni bekor qilib
//                   bo'lmaydi.
//                 </p>
//                 <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
//                   <button
//                     onClick={() =>
//                       setDeleteModal({ show: false, taskId: null })
//                     }
//                     className="flex-1 px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
//                   >
//                     Bekor qilish
//                   </button>
//                   <button
//                     onClick={confirmDelete}
//                     className="flex-1 px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
//                   >
//                     O'chirish
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Debug Modal - To'liq responsive */}
//       {debugModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-xs sm:max-w-sm mx-2 sm:mx-4 transform transition-all">
//             <div className="p-4 sm:p-6">
//               <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 bg-yellow-100 rounded-full">
//                 <svg
//                   className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
//                   ></path>
//                 </svg>
//               </div>
//               <div className="text-center">
//                 <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
//                   Barcha ma'lumotlarni tozalash
//                 </h3>
//                 <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 px-2">
//                   Bu barcha vazifalar va ma'lumotlarni o'chirib tashlaydi. Bu
//                   amalni bekor qilib bo'lmaydi.
//                 </p>
//                 <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
//                   <button
//                     onClick={() => setDebugModal(false)}
//                     className="flex-1 px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
//                   >
//                     Bekor qilish
//                   </button>
//                   <button
//                     onClick={confirmClearAll}
//                     className="flex-1 px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
//                   >
//                     Barchasini o'chirish
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Home;

import { useState, useEffect } from "react";
import Calendar from "../../components/calendar";
import Archive from "../../components/Archive";
import TaskForm from "../../components/TaskForm";
import TaskList from "../../components/TaskList";
import Stats from "../../components/Stats";

function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState({});
  const [showArchive, setShowArchive] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, taskId: null });
  const [debugModal, setDebugModal] = useState(false);

  // 1. LocalStorage'dan ma'lumotlarni yuklash
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem("tasks");
      console.log("LocalStorage'dan o'qildi:", savedTasks);

      if (savedTasks && savedTasks !== "undefined" && savedTasks !== "null") {
        const parsedTasks = JSON.parse(savedTasks);
        if (
          parsedTasks &&
          typeof parsedTasks === "object" &&
          !Array.isArray(parsedTasks)
        ) {
          setTasks(parsedTasks);
          console.log("Tasks yuklandi:", parsedTasks);
        } else {
          console.warn(
            "LocalStorage'dagi ma'lumot noto'g'ri formatda. Bo'sh obyekt yaratildi."
          );
          setTasks({});
          localStorage.removeItem("tasks");
        }
      } else {
        setTasks({});
      }
    } catch (error) {
      console.error("LocalStorage'dan o'qishda xato:", error);
      setTasks({});
      localStorage.removeItem("tasks");
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // 2. Tasks o'zgarganda saqlash
  useEffect(() => {
    if (!isLoaded) return;

    try {
      const tasksToSave = JSON.stringify(tasks);
      localStorage.setItem("tasks", tasksToSave);
      console.log("LocalStorage'ga saqlandi:", tasksToSave);
    } catch (error) {
      console.error("LocalStorage'ga yozishda xato:", error);
      if (error.name === "QuotaExceededError") {
        alert("LocalStorage sig'imi tugadi. Eski ma'lumotlar tozalanadi.");
        localStorage.clear();
      }
    }
  }, [tasks, isLoaded]);

  // 3. Vazifa qo'shish
  const addTask = (taskText) => {
    if (!taskText.trim()) return;

    const dateKey = selectedDate.toISOString().split("T")[0];
    const newTask = {
      id: Date.now() + Math.random(),
      text: taskText.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      date: dateKey,
    };

    setTasks((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newTask],
    }));
  };

  // 4. Vazifani bajarilgan deb belgilash
  const toggleComplete = (taskId) => {
    const dateKey = selectedDate.toISOString().split("T")[0];
    setTasks((prev) => ({
      ...prev,
      [dateKey]: (prev[dateKey] || []).map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    }));
  };

  // 5. Vazifani o'chirish
  const deleteTask = (taskId) => {
    setDeleteModal({ show: true, taskId });
  };

  const confirmDelete = () => {
    const dateKey = selectedDate.toISOString().split("T")[0];
    setTasks((prev) => ({
      ...prev,
      [dateKey]: (prev[dateKey] || []).filter(
        (task) => task.id !== deleteModal.taskId
      ),
    }));
    setDeleteModal({ show: false, taskId: null });
  };

  // 6. Vazifani tahrirlash
  const editTask = (taskId, newText) => {
    if (!newText.trim()) return;

    const dateKey = selectedDate.toISOString().split("T")[0];
    setTasks((prev) => ({
      ...prev,
      [dateKey]: (prev[dateKey] || []).map((task) =>
        task.id === taskId ? { ...task, text: newText.trim() } : task
      ),
    }));
  };

  // 7. Faqat tanlangan kundagi vazifalarni tozalash
  const clearCurrentDateData = () => {
    setDebugModal(true);
  };

  const confirmClearCurrentDate = () => {
    const dateKey = selectedDate.toISOString().split("T")[0];

    setTasks((prev) => {
      const newTasks = { ...prev };
      delete newTasks[dateKey];
      return newTasks;
    });

    setDebugModal(false);
  };

  // Loading holatida
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8 flex items-center justify-center">
        <div className="text-lg">Yuklanmoqda...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-2 sm:p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {showArchive ? (
          <Archive tasks={tasks} onBack={() => setShowArchive(false)} />
        ) : (
          <>
            <div className="p-3 sm:p-4 md:p-6">
              <Calendar
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                onShowArchive={() => setShowArchive(true)}
              />

              <div className="mt-4 md:mt-6">
                <TaskForm onAddTask={addTask} />
              </div>

              <div className="mt-4 md:mt-6">
                <TaskList
                  tasks={tasks[selectedDate.toISOString().split("T")[0]] || []}
                  onToggleComplete={toggleComplete}
                  onDelete={deleteTask}
                  onEdit={editTask}
                />
              </div>

              <Stats
                tasks={tasks[selectedDate.toISOString().split("T")[0]] || []}
              />

              {/* Debug uchun tugma - faqat tanlangan kundagi vazifalarni tozalash */}
              <button
                onClick={clearCurrentDateData}
                className="mt-4 px-3 py-2 text-sm sm:px-4 sm:py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                <span className="hidden sm:inline">
                  Joriy kundagi vazifalarni tozalash
                </span>
                <span className="sm:hidden">Kun tozalash</span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Delete Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xs sm:max-w-sm mx-2 sm:mx-4 transform transition-all">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 bg-red-100 rounded-full">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </div>
              <div className="text-center">
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                  Vazifani o'chirish
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 px-2">
                  Bu vazifani o'chirishni xohlaysizmi? Bu amalni bekor qilib
                  bo'lmaydi.
                </p>
                <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                  <button
                    onClick={() =>
                      setDeleteModal({ show: false, taskId: null })
                    }
                    className="flex-1 px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  >
                    Bekor qilish
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="flex-1 px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                  >
                    O'chirish
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Debug Modal - Faqat tanlangan kundagi vazifalarni tozalash */}
      {debugModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xs sm:max-w-sm mx-2 sm:mx-4 transform transition-all">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 bg-yellow-100 rounded-full">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  ></path>
                </svg>
              </div>
              <div className="text-center">
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                  Joriy kundagi vazifalarni tozalash
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 px-2">
                  Bu faqat {selectedDate.toLocaleDateString()} sanasidagi barcha
                  vazifalarni o'chirib tashlaydi. Boshqa kunlardagi vazifalar
                  saqlanib qoladi.
                </p>
                <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                  <button
                    onClick={() => setDebugModal(false)}
                    className="flex-1 px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  >
                    Bekor qilish
                  </button>
                  <button
                    onClick={confirmClearCurrentDate}
                    className="flex-1 px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                  >
                    Tozalash
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
