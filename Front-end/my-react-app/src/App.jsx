import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/homepage"
import LoginPage from "./pages/loginPage"
import SignupPage from "./pages/signupPage"
import ProfilePage from "./pages/profilePage"
import SettingPage from "./pages/settingPage"

function App() {
  return 
  (
 <div>
 <Routes>
  <Route path="/" element={<HomePage/>}/>
  <Route path="/login" element={<LoginPage/>}/>
  <Route path="/signup" element={<SignupPage/>}/>
  <Route path="/profile" element={<ProfilePage/>}/>
  <Route path="/settings" element={<SettingPage/>}/>
 </Routes>
 </div>
  )
}

export default App
