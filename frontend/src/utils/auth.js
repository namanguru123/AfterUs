export const saveAuth = (token, user) => {
  localStorage.setItem("afterus_token", token);
  localStorage.setItem("afterus_user", JSON.stringify(user));
};

export const getToken = () => {
  return localStorage.getItem("afterus_token");
};

export const logout = () => {
  localStorage.removeItem("afterus_token");
  localStorage.removeItem("afterus_user");
};
