
// خدمة للتحقق من حالة تسجيل الدخول

export const isAuthenticated = (): boolean => {
  return localStorage.getItem("watan_admin_auth") === "true";
};

export const logout = (): void => {
  localStorage.removeItem("watan_admin_auth");
};
