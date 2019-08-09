import PropTypes from 'prop-types';
import React, {createContext, useContext} from 'react';
import {useLocalStorage} from 'react-use';

const UserContext = createContext();
export function useUser() {
  return useContext(UserContext);
}

export function UserProvider(props) {
  const [token, setToken] = useLocalStorage('token');
  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        logOut() {
          setToken(null);
        }
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired
};
