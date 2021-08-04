import React from 'react';
import Dex from './Dex';
import { Route, Switch } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Pokemon from './Pokemon';

const App = () => {
  return (
    <ChakraProvider>
      <Switch>
        <Route exact path='/' render={(props) => <Dex {...props} />} />
        <Route
          exact
          path='/:pokemonId'
          render={(props) => <Pokemon {...props} />}
        />
      </Switch>
    </ChakraProvider>
  );
};

export default App;
