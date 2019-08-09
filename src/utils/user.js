import PropTypes from 'prop-types';
import React, {createContext, useContext} from 'react';
import decode from 'jwt-decode';
import {useLocalStorage} from 'react-use';

const UserContext = createContext();
export function useUser() {
  return useContext(UserContext);
}

export function UserProvider(props) {
  const [token, setToken] = useLocalStorage('token');

  let user;
  try {
    user = decode(token);
  } catch (error) {
    // let errors pass
  }

  return (
    <UserContext.Provider
      value={{
        user,
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
