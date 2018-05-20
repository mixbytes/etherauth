export const changeScreen = (screen) => ({
  type: 'CHANGE_SCREEN',
  screen
});

export const setLogin = (login) => ({
  type: 'LOGIN',
  login
});

export const setLoginWindow = (isLoginWindow) => ({
  type: 'SHOW_LOGIN',
  isLoginWindow
});
