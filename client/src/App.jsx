import React, { useState, useContext } from "react";
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
import Home from "./pages/home"; // Assuming you create a Profile page
import Feed from "./pages/feed"; // Import Feed page
import UpdateProfile from "./components/Modals/UpdateProfile";
import TeacherRegisterModal from "./components/Modals/TeacherRegisterModal";
import TeacherLoginModal from "./components/Modals/TeacherLoginModal";
import UpdateAddressModal from "./components/Modals/UpdateAddress";
import UpdateAcadInfo from "./components/Modals/UpdateAcadInfo";
import UpdateTeachingLocation from "./components/Modals/UpdateTeachingLocation";
import UpdateTeachingInfo from "./components/Modals/UpdateTeachingInfo";
import { AuthContext } from "./context/AuthContext"; // Import AuthContext

const App = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isRoleSignUpOpen, setIsRoleSignUpOpen] = useState(false);
  const [isRoleLoginOpen, setIsRoleLoginOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isTeacherRegisterOpen, setIsTeacherRegisterOpen] = useState(false);
  const [isTeacherLoginOpen, setIsTeacherLoginOpen] = useState(false);
  const [isUpdateAddressOpen, setIsUpdateAddressOpen] = useState(false);
  const [isUpdateAcadInfoOpen, setIsUpdateAcadInfoOpen] = useState(false);
  const [isUpdateTeachingLocationOpen, setIsUpdateTeachingLocationOpen] = useState(false);
  const [isUpdateTeachingInfoOpen, setIsUpdateTeachingInfoOpen] = useState(false);

  const { currentUser } = useContext(AuthContext); // Get current user role

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
    setIsTeacherRegisterOpen(false);
    setIsTeacherLoginOpen(false);
    setIsUpdateAddressOpen(false);
    setIsUpdateAcadInfoOpen(false);
    setIsUpdateTeachingLocationOpen(false);
    setIsUpdateTeachingInfoOpen(false);
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

  const openUpdateModal = () => {
    setIsUpdateOpen(true);
  }

  const openTeacherRegisterModal = () => {
    setIsTeacherRegisterOpen(true);
    setIsTeacherLoginOpen(false);
  }

  const openTeacherLoginModal = () => {
    setIsTeacherLoginOpen(true);
    setIsTeacherRegisterOpen(false);
  }

  const openUpdateAddressModal = () => {
    setIsUpdateAddressOpen(true);
  }

  const openUpdateAcadInfo = () => {
    setIsUpdateAcadInfoOpen(true);
  }

  const openUpdateTeachingLocation = () => {
    setIsUpdateTeachingLocationOpen(true);
  }

  const openUpdateTeachingInfo = () => {
    setIsUpdateTeachingInfoOpen(true);
  }

  const feedButtonText = currentUser?.role === 'Teacher' ? 'Find Students' : 'Find Teachers';

  return (
    <Router>
      <Navbar
        onLoginClick={openRoleLoginModal}
        onSignUpClick={openRoleSignUpModal}
        feedButtonText={feedButtonText} // Pass button text to Navbar
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile openUpdateModal={openUpdateModal} openUpdateAddressModal={openUpdateAddressModal} openUpdateAcadInfo={openUpdateAcadInfo} openUpdateTeachingLocation={openUpdateTeachingLocation} openUpdateTeachingInfo={openUpdateTeachingInfo} />} />
        <Route path="/feed" element={<Feed />} /> {/* Add Feed route */}
      </Routes>

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={closeModals} 
        onSignUp={openRegisterModal} 
      />
      <RegisterModal 
        isOpen={isRegisterOpen} 
        onClose={closeModals} 
        onLogin={openLoginModal} 
      />
      <RoleSignUp
        isOpen={isRoleSignUpOpen}
        onClose={closeModals}
        onStudentSelect={openRegisterModal}
        onTeacherSelect={openTeacherRegisterModal}
      />
      
      <RoleLogin
        isOpen={isRoleLoginOpen}
        onClose={closeModals}
        onStudentSelect={openLoginModal}
        onTeacherSelect={openTeacherLoginModal}
      />

      <UpdateProfile
        isOpen={isUpdateOpen}
        onClose={closeModals}
      />

      <UpdateAddressModal
        isOpen={isUpdateAddressOpen}
        onClose={closeModals}
      />

      <TeacherRegisterModal
        isOpen={isTeacherRegisterOpen}
        onClose={closeModals}
        onLogin={openTeacherLoginModal}
      />

      <TeacherLoginModal
        isOpen={isTeacherLoginOpen}
        onClose={closeModals}
        onSignUp={openTeacherRegisterModal}
      />

      <UpdateAcadInfo
        isOpen={isUpdateAcadInfoOpen}
        onClose={closeModals}
      />

      <UpdateTeachingLocation
        isOpen={isUpdateTeachingLocationOpen}
        onClose={closeModals}
      />

      <UpdateTeachingInfo
        isOpen={isUpdateTeachingInfoOpen}
        onClose={closeModals} // Fixed typo here
      />

      <Toaster />
    </Router>
  );
};

export default App;
