import './App.css'
import { Routes, Route } from "react-router-dom";
import LoginPage from './features/auth/pages/LoginPage'
import SongsPage from './features/songs/pages/SongsPage';
import DashboardLayout from './components/layout/DashboardLayout';

function App() {
  return (
    <Routes>
     
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<LoginPage />} />

     
      {/* <Route element={<ProtectedRoute />}> */}
        <Route element={<DashboardLayout />}>
          {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
          <Route path="/groups/:group_name/songs" element={<SongsPage />} />
        </Route>
      {/* </Route> */}

      
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  )
}

export default App
