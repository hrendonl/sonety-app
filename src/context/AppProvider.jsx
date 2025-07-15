import { createContext, useReducer } from "react";

const AppContext = createContext();
const { Provider, Consumer } = AppContext;

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  token: JSON.parse(localStorage.getItem("access_token")),
  group_selected: JSON.parse(localStorage.getItem("group_selected")),
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      localStorage.setItem("user", JSON.stringify(action.data));
      return { ...state, user: action.data };
    case "SET_TOKEN":
      localStorage.setItem("access_token", JSON.stringify(action.data));
      return { ...state, token: action.data };
    case "SET_GROUP_SELECTED":
      localStorage.setItem("group_selected", JSON.stringify(action.data));
      return { ...state, group_selected: action.data };
    default:
      return { ...state };
  }
};

const logout = () => {
  localStorage.clear();
}

const AppProvider = ({ children }) => {
  const [state, setReducer] = useReducer(reducer, initialState);

  const setApp = (type, data) => {
    setReducer({ type: type, data });
  };

 
  const value = {
    ...state,
    setApp,
    logout
  };

  return <Provider value={value}>{children}</Provider>;
};
export { Consumer as AppConsumer, AppContext, AppProvider };
