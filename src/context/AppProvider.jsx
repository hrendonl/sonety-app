import { createContext, useReducer } from "react";

const AppContext = createContext();
const { Provider, Consumer } = AppContext;

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  token: JSON.parse(localStorage.getItem("access_token")),
  groupSelected:  {
      "created_at": "2025-07-31T07:38:31+00:00",
      "created_by": "hrvega14@hotmail.com",
      "description": "Grupo de Alabanza de la iglesia",
      "id": "1",
      "image": "string",
      "members": [
        {
          "role": {
            "name": "admin"
          },
          "user": {
            "created_at": "2025-07-31T06:51:42+00:00",
            "created_by": "hrvega14@hotmail.com",
            "email": "hrvega14@hotmail.com",
            "fullname": "Hugo Camilo Rendon Lozano",
            "id": "1",
            "image": "string",
            "updated_at": "2025-07-31T06:51:42+00:00",
            "updated_by": "hrvega14@hotmail.com"
          }
        },
        {
          "role": {
            "name": "admin"
          },
          "user": {
            "created_at": "2025-07-31T06:52:53+00:00",
            "created_by": "santiago@hotmail.com",
            "email": "santiago@hotmail.com",
            "fullname": "Santiago Boyano",
            "id": "2",
            "image": "string",
            "updated_at": "2025-07-31T06:52:53+00:00",
            "updated_by": "santiago@hotmail.com"
          }
        }
      ],
      "name": "Alabanza Pacto Cartagena",
      "updated_at": "2025-08-03T00:03:14+00:00",
      "updated_by": "santiago@hotmail.com"
    },
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
      return { ...state, groupSelected: action.data };
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
    setApp("SET_USER", null)
    setApp("SET_TOKEN", null)
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
    closePlayer,
  };

  return <Provider value={value}>{children}</Provider>;
};
export { Consumer as AppConsumer, AppContext, AppProvider };
