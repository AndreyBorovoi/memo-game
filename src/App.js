import React from 'react';
import Container from '@material-ui/core/Container';

import Header from './components/Header';
import Field from './components/Field';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import MemoApp from './reducers';

const store = createStore(MemoApp);


function App() {
  return (
    <Provider store={store}>
      <Container
        style={{height:'100%', display:'flex', flexDirection:'column'}}
        fixed
      >

        <Header/>
        <Field/>

      </Container>
    </Provider>
  );
}

export default App;
