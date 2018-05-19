const initState = {
  app: '',
  screen: 'main-screen'
  // screen: 'register-screen'
};

const app = (state = initState, action) => {
  switch (action.type) {
    case 'CHANGE_SCREEN':
      return { ...state, screen: action.screen };

    default:
      return state;
  }
}

export default app;
