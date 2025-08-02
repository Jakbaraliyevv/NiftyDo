// import { Button, Input, message } from "antd";
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";

// function Register() {
//   const [formData, setFormData] = useState({
//     firstname: "",
//     lastname: "",
//     username: "",
//     email: "",
//     password: ""
//   });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData(prev => ({ ...prev, [id]: value }));
//   };

//   const handleRegister = (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // Simulate API call delay
//     setTimeout(() => {
//       // Get existing users from localStorage
//       const users = JSON.parse(localStorage.getItem("users")) || [];

//       // Check if username or email already exists
//       const userExists = users.some(
//         u => u.username === formData.username || u.email === formData.email
//       );

//       if (userExists) {
//         message.error("Bu foydalanuvchi nomi yoki email allaqachon mavjud!");
//         setLoading(false);
//         return;
//       }

//       // Create new user object
//       const newUser = {
//         ...formData,
//         name: `${formData.firstname} ${formData.lastname}`
//       };

//       // Save new user
//       localStorage.setItem("users", JSON.stringify([...users, newUser]));
//       message.success("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
//       navigate("/login");

//       setLoading(false);
//     }, 1000);
//   };

//   return (
// <section className="bg-gradient-to-r from-blue-600 to-blue-400 min-h-screen flex items-center">
//   <div className="w-full max-w-5xl mx-auto p-4">
//     <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
//       {/* Left Side - Welcome Section (unchanged) */}
//       <div className="hidden md:block md:w-2/5 bg-gradient-to-br from-blue-500 to-indigo-600 p-8 text-white">
//         <div className="h-full flex flex-col justify-between">
//           <div>
//             <h2 className="text-3xl font-bold mb-6">Xush kelibsiz!</h2>
//             <p className="mb-8">
//               Bizning platformamizga a'zo bo'ling va barcha imkoniyatlardan foydalaning.
//             </p>
//           </div>

//           <div className="space-y-4">
//             {[
//               "Tezkor va oson ro'yxatdan o'tish",
//               "Xavfsiz ma'lumotlar saqlash",
//               "24/7 mijozlar xizmati"
//             ].map((item, index) => (
//               <div key={index} className="flex items-center">
//                 <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center mr-3">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </div>
//                 <p>{item}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Right Side - Registration Form */}
//       <div className="w-full md:w-3/5 p-8">
//         <div className="mb-6 text-center">
//           <h1 className="text-2xl font-bold text-gray-800">Ro'yxatdan o'tish</h1>
//           <p className="text-gray-600 mt-2">
//             Barcha imkoniyatlardan foydalanish uchun hisob yarating
//           </p>
//         </div>

//         <form className="space-y-4" onSubmit={handleRegister}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {[
//               { id: "firstname", label: "Ismingiz", placeholder: "Ismingizni kiriting" },
//               { id: "lastname", label: "Familiyangiz", placeholder: "Familiyangizni kiriting" },
//               { id: "username", label: "Foydalanuvchi nomi", placeholder: "Foydalanuvchi nomini kiriting" },
//               { id: "email", label: "Email", type: "email", placeholder: "Email manzilingizni kiriting" },
//               { id: "password", label: "Parol", type: "password", placeholder: "Parolingizni kiriting", colSpan: "md:col-span-2" }
//             ].map((field) => (
//               <div
//                 key={field.id}
//                 className={`space-y-2 ${field.colSpan || ""}`}
//               >
//                 <label htmlFor={field.id} className="text-sm font-medium text-gray-700">
//                   {field.label}
//                 </label>
//                 {field.type === "password" ? (
//                   <Input.Password
//                     id={field.id}
//                     className="h-11 rounded-lg text-base"
//                     placeholder={field.placeholder}
//                     value={formData[field.id]}
//                     onChange={handleChange}
//                   />
//                 ) : (
//                   <Input
//                     id={field.id}
//                     type={field.type || "text"}
//                     className="h-11 rounded-lg text-base"
//                     placeholder={field.placeholder}
//                     value={formData[field.id]}
//                     onChange={handleChange}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="pt-4">
//             <Button
//               type="primary"
//               htmlType="submit"
//               className="w-full h-12 rounded-lg text-base font-medium bg-blue-600 hover:bg-blue-700 border-none shadow-md"
//               loading={loading}
//             >
//               Ro'yxatdan o'tish
//             </Button>
//           </div>

//           <div className="text-center text-gray-600 text-sm mt-4">
//             Allaqachon hisobingiz bormi?{" "}
//             <Link to="/login" className="text-blue-600 hover:underline">
//               Kirish
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   </div>
// </section>
//   );
// }

// export default Register;

import { Button, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validateForm = () => {
    if (!formData.firstname.trim()) {
      message.warning("Ismingizni kiriting!");
      return false;
    }
    if (!formData.lastname.trim()) {
      message.warning("Familiyangizni kiriting!");
      return false;
    }
    if (!formData.username.trim()) {
      message.warning("Foydalanuvchi nomini kiriting!");
      return false;
    }
    if (!formData.email.trim()) {
      message.warning("Email manzilingizni kiriting!");
      return false;
    }
    if (!formData.password.trim()) {
      message.warning("Parolni kiriting!");
      return false;
    }
    if (formData.password.length < 6) {
      message.warning("Parol kamida 6 belgidan iborat bo'lishi kerak!");
      return false;
    }
    return true;
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    setTimeout(() => {
      try {
        const users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.some((u) => u.username === formData.username)) {
          message.error("Bu foydalanuvchi nomi band!");
          return;
        }

        if (users.some((u) => u.email === formData.email)) {
          message.error("Bu email allaqachon ro'yxatdan o'tgan!");
          return;
        }

        const newUser = {
          ...formData,
          name: `${formData.firstname} ${formData.lastname}`,
          createdAt: new Date().toISOString(),
        };

        localStorage.setItem("users", JSON.stringify([...users, newUser]));
        message.success("Ro'yxatdan muvaffaqiyatli o'tdingiz!");
        navigate("/login");
      } catch (error) {
        message.error("Ro'yxatdan o'tishda xatolik yuz berdi");
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-400 min-h-screen flex items-center">
      <div className="w-full max-w-5xl mx-auto p-4">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          {/* Left Side - Welcome Section (unchanged) */}
          <div className="hidden md:block md:w-2/5 bg-gradient-to-br from-blue-500 to-indigo-600 p-8 text-white">
            <div className="h-full flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-6">Xush kelibsiz!</h2>
                <p className="mb-8">
                  Bizning platformamizga a'zo bo'ling va barcha imkoniyatlardan
                  foydalaning.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  "Tezkor va oson ro'yxatdan o'tish",
                  "Xavfsiz ma'lumotlar saqlash",
                  "24/7 mijozlar xizmati",
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="w-full md:w-3/5 p-8">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold text-gray-800">
                Ro'yxatdan o'tish
              </h1>
              <p className="text-gray-600 mt-2">
                Barcha imkoniyatlardan foydalanish uchun hisob yarating
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleRegister}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    id: "firstname",
                    label: "Ismingiz",
                    placeholder: "Ismingizni kiriting",
                  },
                  {
                    id: "lastname",
                    label: "Familiyangiz",
                    placeholder: "Familiyangizni kiriting",
                  },
                  {
                    id: "username",
                    label: "Foydalanuvchi nomi",
                    placeholder: "Foydalanuvchi nomini kiriting",
                  },
                  {
                    id: "email",
                    label: "Email",
                    type: "email",
                    placeholder: "Email manzilingizni kiriting",
                  },
                  {
                    id: "password",
                    label: "Parol",
                    type: "password",
                    placeholder: "Parolingizni kiriting",
                    colSpan: "md:col-span-2",
                  },
                ].map((field) => (
                  <div
                    key={field.id}
                    className={`space-y-2 ${field.colSpan || ""}`}
                  >
                    <label
                      htmlFor={field.id}
                      className="text-sm font-medium text-gray-700"
                    >
                      {field.label}
                    </label>
                    {field.type === "password" ? (
                      <Input.Password
                        id={field.id}
                        className="h-11 rounded-lg text-base"
                        placeholder={field.placeholder}
                        value={formData[field.id]}
                        onChange={handleChange}
                      />
                    ) : (
                      <Input
                        id={field.id}
                        type={field.type || "text"}
                        className="h-11 rounded-lg text-base"
                        placeholder={field.placeholder}
                        value={formData[field.id]}
                        onChange={handleChange}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full h-12 rounded-lg text-base font-medium bg-blue-600 hover:bg-blue-700 border-none shadow-md"
                  loading={loading}
                >
                  Ro'yxatdan o'tish
                </Button>
              </div>

              <div className="text-center text-gray-600 text-sm mt-4">
                Allaqachon hisobingiz bormi?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                  Kirish
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
