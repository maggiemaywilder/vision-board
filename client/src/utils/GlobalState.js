import React, { createContext, useReducer, useContext } from "react";

const UserContext = createContext({
  user: {}
});
const { Provider } = UserContext;

function userReducer(state, action) {
  switch (action.type) {
  case "setCurrentUser":
    console.log(action);
    return [
      ...state,
      {
        user: action.payload
      }
    ];
  default:
    return state;
  }
}

function UserProvider({ value = {}, ...props }) {
  const [state, dispatch] = useReducer(userReducer, []);

  return <Provider value={[state, dispatch]} {...props} />;
}

function useUserContext() {
  return useContext(UserContext);
}

export { UserProvider, useUserContext };