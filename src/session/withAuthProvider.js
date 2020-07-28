import React, { useState, useEffect } from "react";

import { authObserver } from "../firebase";

export const AuthContext = React.createContext(null);

const withAuthProvider = (Component) => (props) => {
  const [authState, setAuthState] = useState();

  useEffect(() => {
    let listener = authObserver(
      (authUser) => {
        setAuthState(authUser);
      },
      () => {
        setAuthState(null);
      }
    );
    return () => listener();
  }, [props]);

  return (
    <AuthContext.Provider value={authState}>
      <Component {...props} />
    </AuthContext.Provider>
  );
};

export default withAuthProvider;
