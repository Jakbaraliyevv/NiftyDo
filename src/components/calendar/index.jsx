// import { useState } from "react";
// import { format, addDays, isSameDay } from "date-fns";
// import { uz } from "date-fns/locale";

// function Calendar({ selectedDate, onDateChange, onShowArchive }) {
//   const [currentMonth, setCurrentMonth] = useState(new Date());

//   const days = [];
//   for (let i = 0; i < 7; i++) {
//     const day = addDays(currentMonth, i);
//     days.push(day);
//   }

//   return (
//     <div className="mb-6">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold text-gray-800">
//           {format(selectedDate, "d MMMM yyyy", { locale: uz })}
//         </h2>
//         <button
//           onClick={onShowArchive}
//           className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-sm"
//         >
//           Arxiv
//         </button>
//       </div>

//       <div className="grid grid-cols-7 gap-2 mb-2">
//         {days.map((day, i) => (
//           <button
//             key={i}
//             onClick={() => onDateChange(day)}
//             className={`py-2 rounded-lg text-center ${
//               isSameDay(day, selectedDate)
//                 ? "bg-indigo-600 text-white"
//                 : "bg-gray-100 hover:bg-gray-200"
//             }`}
//           >
//             <div className="text-xs">{format(day, "EEE", { locale: uz })}</div>
//             <div className="font-medium">{format(day, "d")}</div>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Calendar;

import { useState } from "react";
import { format, addDays, isSameDay } from "date-fns";
import { uz } from "date-fns/locale";

function Calendar({ selectedDate, onDateChange, onShowArchive }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const days = [];
  for (let i = 0; i < 7; i++) {
    const day = addDays(currentMonth, i);
    days.push(day);
  }

  return (
    <div className="mb-4 sm:mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">
          {format(selectedDate, "d MMMM yyyy", { locale: uz })}
        </h2>
        <button
          onClick={onShowArchive}
          className="px-3 py-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg text-xs sm:text-sm transition-colors"
        >
          Arxiv
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {days.map((day, i) => (
          <button
            key={i}
            onClick={() => onDateChange(day)}
            className={`py-1 sm:py-2 rounded-lg text-center transition-colors ${
              isSameDay(day, selectedDate)
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <div className="text-[10px] xs:text-xs">
              {format(day, "EEE", { locale: uz })}
            </div>
            <div className="text-sm sm:text-base font-medium">
              {format(day, "d")}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
