import React from 'react';
import client from './src/utils/client';
import {ApolloProvider} from '@apollo/react-hooks';
import {StarsProvider} from './src/utils/stars';
import {UserProvider} from './src/utils/user';

// eslint-disable-next-line react/prop-types
export const wrapRootElement = ({element}) => {
  // welcome to provider hell 😈
  return (
    <ApolloProvider client={client}>
      <StarsProvider>
        <UserProvider>{element}</UserProvider>
      </StarsProvider>
    </ApolloProvider>
  );
};
