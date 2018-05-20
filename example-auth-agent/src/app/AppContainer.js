import { connect } from 'react-redux';

import App from './App';

export default connect(state => ({
  screen: state.app.screen,
  login: state.app.login,
  isLoginWindow: state.app.isLoginWindow,
}))(App);
