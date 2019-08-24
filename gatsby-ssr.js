import React from 'react';
import {StarsProvider} from './src/utils/stars';
import {UserProvider} from './src/utils/user';

// eslint-disable-next-line react/prop-types
export const wrapRootElement = ({element}) => (
  <StarsProvider>
    <UserProvider>{element}</UserProvider>
  </StarsProvider>
);
