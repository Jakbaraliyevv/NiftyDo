import { Button, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Session tekshirish
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser && currentUser.expires > Date.now()) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    // Validatsiya
    if (!username.trim() || !password.trim()) {
      message.error("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      try {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(
          (u) =>
            (u.username === username || u.email === username) &&
            u.password === password
        );

        if (user) {
          // 1 soatlik session qo'shamiz
          const userWithSession = {
            ...user,
            expires: Date.now() + 3600000, // 1 soat
            // expires: new Date().getTime() + 60000, // 1 minut = 60000 ms
          };

          localStorage.setItem("currentUser", JSON.stringify(userWithSession));
          message.success("Muvaffaqiyatli kirdingiz!");
          navigate("/");
        } else {
          message.error("Foydalanuvchi topilmadi yoki parol noto'g'ri!");
        }
      } catch (error) {
        message.error(
          "Tizimda xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring"
        );
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <section className="bg-gradient-to-r bg-blue-600 min-h-screen">
      <div className="w-full max-w-md mx-auto px-4 py-16 min-h-screen flex items-center justify-center">
        <div className="w-full bg-white bg-opacity-90 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden">
          <div className="p-8">
            {/* Logo and welcome message (unchanged) */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                  />
                </svg>
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Xush kelibsiz!
              </h1>
              <p className="text-gray-600">
                Hisobingizga kirish uchun ma'lumotlarni kiriting
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <Input
                  prefix={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  }
                  className="h-14 rounded-xl text-base px-4 shadow-sm border-2 border-gray-100 hover:border-indigo-200 focus:border-indigo-300"
                  placeholder="Foydalanuvchi nomi yoki Email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div>
                <Input.Password
                  prefix={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  }
                  className="h-14 rounded-xl text-base px-4 shadow-sm border-2 border-gray-100 hover:border-indigo-200 focus:border-indigo-300"
                  placeholder="Parolingizni kiriting"
                  visibilityToggle={true}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full h-14 rounded-xl text-base font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border-none shadow-lg"
                  loading={loading}
                >
                  Kirish
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Hisobingiz yo'qmi?{" "}
                <Link
                  to="/register"
                  className="text-indigo-600 hover:text-indigo-500 font-medium"
                >
                  Ro'yxatdan o'tish
                </Link>
              </p>
            </div>

            {/* Social login buttons (unchanged) */}
            {/* ... */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
