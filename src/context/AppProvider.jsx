import { createContext, useReducer } from "react";

const AppContext = createContext();
const { Provider, Consumer } = AppContext;

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  token: JSON.parse(localStorage.getItem("access_token")),
  group_selected: JSON.parse(localStorage.getItem("group_selected")),
  isPlaying: false,
  currentSong: null,
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
    case "SET_IS_PLAYING":
      return { ...state, isPlaying: action.data };
    case "SET_CURRENT_SONG":
      return { ...state, currentSong: action.data };
    default:
      return { ...state };
  }
};


const AppProvider = ({ children }) => {
  const [state, setReducer] = useReducer(reducer, initialState);

  const setApp = (type, data) => {
    setReducer({ type: type, data });
  };

  const logout = () => {
  localStorage.clear();
};

// Función para empezar a reproducir una canción
const playSong = (song) => {
  setApp("SET_CURRENT_SONG", song);
  setApp("SET_IS_PLAYING", true);
};

// Función para pausar o reanudar
const togglePlay = () => {
  if (state.currentSong) {
    setApp("SET_IS_PLAYING", !state.isPlaying);
  }
};

// Función para cerrar el reproductor
const closePlayer = () => {
  setApp("SET_CURRENT_SONG", null);
  setApp("SET_IS_PLAYING", false);
};

  const value = {
    ...state,
    setApp,
    logout,
    playSong,
    togglePlay,
    closePlayer
  };

  return <Provider value={value}>{children}</Provider>;
};
export { Consumer as AppConsumer, AppContext, AppProvider };
