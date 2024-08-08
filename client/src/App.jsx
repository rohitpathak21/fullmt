import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import LoginModal from "./components/Modals/LoginModal";
import RegisterModal from "./components/Modals/RegisterModal";
import RoleSignUp from "./components/Modals/RoleSignUp";
import RoleLogin from "./components/Modals/RoleLogin";

const App = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isRoleSignUpOpen, setIsRoleSignUpOpen] = useState(false);
  const [isRoleLoginOpen, setIsRoleLoginOpen] = useState(false);


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

  return (
    <>
      <Navbar
        onLoginClick={openRoleLoginModal}
        onSignUpClick={openRoleSignUpModal}
      />
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

    </>
  );
};

export default App;
