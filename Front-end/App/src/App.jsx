import { Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/homepage";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import ProfilePage from "./pages/profilePage";
import SettingPage from "./pages/settingPage";
import userAuthStore from "./store/userAuthStore";
import Navbar from "./components/navbar";
import { useThemeStore } from "./store/useThemeStore";

function App() {
  const { authUser } = userAuthStore();
  const { theme } = useThemeStore();
  console.log(authUser, "why is this null");
  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <LoginPage />} />
        <Route
          path="/login"
          element={authUser ? <HomePage /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <HomePage />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <LoginPage />}
        />
        <Route path="/settings" element={<SettingPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App
