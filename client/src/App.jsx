import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import LoginModal from "./components/Modals/LoginModal";
import RegisterModal from "./components/Modals/RegisterModal";
import RoleSignUp from "./components/Modals/RoleSignUp";
import RoleLogin from "./components/Modals/RoleLogin";
import { Toaster } from "react-hot-toast";
import About from "./pages/about";
import Contact from "./pages/contact";
import Profile from "./pages/profile";
import Home from "./pages/home" // Assuming you create a Profile page
import UpdateProfile from "./components/Modals/UpdateProfile";

const App = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isRoleSignUpOpen, setIsRoleSignUpOpen] = useState(false);
  const [isRoleLoginOpen, setIsRoleLoginOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
    setIsRoleLoginOpen(false);
    setIsRoleSignUpOpen(false);
  };

  const openRegisterModal = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
    setIsRoleLoginOpen(false);
    setIsRoleSignUpOpen(false);  
  };

  const closeModals = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
    setIsRoleSignUpOpen(false);
    setIsRoleLoginOpen(false);
    setIsUpdateOpen(false);
  };

  const openRoleSignUpModal = () => {
    setIsRoleSignUpOpen(true);
    setIsRegisterOpen(false);
    setIsLoginOpen(false);  
    setIsRoleLoginOpen(false);
  }

  const openRoleLoginModal = () => {
    setIsRoleLoginOpen(true);
    setIsRegisterOpen(false);
    setIsLoginOpen(false);  
    setIsRoleSignUpOpen(false);
  }

  const openUpdateModal =() => {
    setIsUpdateOpen(true);
  }

  return (
    <Router>
      <Navbar
        onLoginClick={openRoleLoginModal}
        onSignUpClick={openRoleSignUpModal}
      />

      <Routes>
      <Route
          path="/"
          element={<Home />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile openUpdateModal={openUpdateModal}/>}/>
      </Routes>

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={closeModals} 
        onSignUp={openRegisterModal} // Switch to RegisterModal
      />
      <RegisterModal 
        isOpen={isRegisterOpen} 
        onClose={closeModals} 
        onLogin={openLoginModal} // Switch to LoginModal
      />
      <RoleSignUp
      isOpen={isRoleSignUpOpen}
      onClose={closeModals}
      onStudentSelect={openRegisterModal}/>
      
      <RoleLogin
      isOpen={isRoleLoginOpen}
      onClose={closeModals}
      onStudentSelect={openLoginModal}/>

      <UpdateProfile
      isOpen={isUpdateOpen}
      onClose={closeModals}
      />

      <Toaster/>
    </Router>
  );
};

export default App;
