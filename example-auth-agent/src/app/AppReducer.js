const initState = {
  app: '',
  screen: 'main-screen',
  login: '',
  isLoginWindow: false,
};

const app = (state = initState, action) => {
  switch (action.type) {
    case 'CHANGE_SCREEN':
      return { ...state, screen: action.screen };
    case 'LOGIN':
      return { ...state, login: action.login };
    case 'SHOW_LOGIN':
      return { ...state, isLoginWindow: action.isLoginWindow };

    default:
      return state;
  }
}

export default app;
