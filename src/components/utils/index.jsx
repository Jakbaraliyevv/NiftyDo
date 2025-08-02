// src/utils/auth.js

export const checkSession = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) return false;

  if (currentUser.expires < Date.now()) {
    localStorage.removeItem("currentUser");
    return false;
  }

  return true;
};

export const logout = () => {
  localStorage.removeItem("currentUser");
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("currentUser"));
};
