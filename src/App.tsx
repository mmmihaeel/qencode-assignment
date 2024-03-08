import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/main';
import ForgotPasswordPage from './pages/forgot-password';
import LoginPage from './pages/login';
import NewPasswordPage from './pages/new-password';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/new-password" element={<NewPasswordPage />} />
    </Routes>
  )
}

export default App
