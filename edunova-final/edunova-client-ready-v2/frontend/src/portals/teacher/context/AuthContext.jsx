import { createContext, useContext, useState } from "react";
import * as otpAuth from "../../../lib/useOtpAuth";

const AuthContext = createContext(null);

const KEYS = {
  access: "edunova_teacher_access",
  refresh: "edunova_teacher_refresh",
  user: "edunova_teacher_user",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem(KEYS.user);
    return raw ? JSON.parse(raw) : null;
  });

  async function requestOtp(identifier, password) {
    const data = await otpAuth.requestOtp(identifier, password);
    if (data.user_type !== "Teacher") {
      throw { response: { data: { detail: "This portal is for teachers only." } } };
    }
    return data;
  }

  async function verifyOtp(userId, otp) {
    const data = await otpAuth.verifyOtp(userId, otp);
    if (data.user?.user_type !== "Teacher") {
      throw { response: { data: { detail: "This portal is for teachers only." } } };
    }
    localStorage.setItem(KEYS.access, data.access);
    localStorage.setItem(KEYS.refresh, data.refresh);
    localStorage.setItem(KEYS.user, JSON.stringify(data.user));
    setUser(data.user);
    return data;
  }

  async function resendOtp(userId) {
    return otpAuth.resendOtp(userId);
  }

  function logout() {
    Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, requestOtp, verifyOtp, resendOtp, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
