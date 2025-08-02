import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // localStorage'dan foydalanuvchi ma'lumotlarini olish
  const user = JSON.parse(localStorage.getItem("currentUser"));

  // Agar foydalanuvchi mavjud bo'lsa va session muddati tugamagan bo'lsa
  if (user && new Date(user.expires) > new Date()) {
    return children;
  }

  // Aks holda login sahifasiga yo'naltirish
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
