import { connect } from 'react-redux';

import App from './App';

export default connect(state => ({
  screen: state.app.screen
}))(App);
