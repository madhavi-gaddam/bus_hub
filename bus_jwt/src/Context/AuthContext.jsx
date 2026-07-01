import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContextObject";
import { createDemoJwt, getUserFromToken } from "../Utils/jwtUtils";

const TOKEN_KEY = "busTravelJwt";
const USERS_KEY = "busTravelUsers";

function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));

  const user = useMemo(() => {
    try {
      const tokenUser = getUserFromToken(token);

      if (!tokenUser && token) {
        localStorage.removeItem(TOKEN_KEY);
      }

      return tokenUser;
    } catch {
      localStorage.removeItem(TOKEN_KEY);
      return null;
    }
  }, [token]);
  const isAuthenticated = Boolean(user);

  useEffect(() => {
    if (!token) {
      localStorage.removeItem(TOKEN_KEY);
    }
  }, [token]);

  const getRegisteredUsers = useCallback(() => {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch {
      return [];
    }
  }, []);

  const signup = useCallback((name, email, password) => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      return { success: false, message: "Enter name, email and password." };
    }

    const users = getRegisteredUsers();
    const alreadyRegistered = users.some(
      (registeredUser) => registeredUser.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (alreadyRegistered) {
      return { success: false, message: "This email is already registered." };
    }

    const nextUser = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      password,
    };

    localStorage.setItem(USERS_KEY, JSON.stringify([...users, nextUser]));

    return { success: true };
  }, [getRegisteredUsers]);

  const login = useCallback((email, password) => {
    if (!email.trim() || !password.trim()) {
      return { success: false, message: "Enter email and password." };
    }

    const registeredUser = getRegisteredUsers().find(
      (savedUser) =>
        savedUser.email.toLowerCase() === email.trim().toLowerCase() &&
        savedUser.password === password
    );

    if (!registeredUser) {
      return { success: false, message: "Please signup before login." };
    }

    const jwt = createDemoJwt(registeredUser);
    localStorage.setItem(TOKEN_KEY, jwt);
    setToken(jwt);

    return { success: true };
  }, [getRegisteredUsers]);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated,
      signup,
      login,
      logout,
    }),
    [isAuthenticated, login, logout, signup, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
