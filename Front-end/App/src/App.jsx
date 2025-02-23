import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/homepage"
import LoginPage from "./pages/loginPage"
import SignupPage from "./pages/signupPage"
import ProfilePage from "./pages/profilePage"
import SettingPage from "./pages/settingPage"
import userAuthStore from "./store/userAuthStore"

function App() {
  const {authUser}=userAuthStore()
  console.log("App")
  return (
 <div className="text-white">
 <Routes>
  <Route path="/" element={authUser?<HomePage/>:<LoginPage/>}/>
  <Route path="/login" element={<LoginPage/>}/>
  <Route path="/signup" element={!authUser?<SignupPage/>:<HomePage/>}/>
  <Route path="/profile" element={authUser?<ProfilePage/>:<LoginPage/>}/>
  <Route path="/settings" element={<SettingPage/>}/>
 </Routes>
 </div>
  )
}

export default App
