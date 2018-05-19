const initState = {
  app: '',
  screen: ''
};

const app = (state = initState, action) => {
  const nextState = { ...state };

  switch (action.type) {
    case 'SET_USER_PROFILE':
      nextState.profile = action.profile;
      return nextState;

    default:
      return state;
  }
}

export default app;
