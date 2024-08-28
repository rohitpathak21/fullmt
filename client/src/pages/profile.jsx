import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

// Shared Profile Content Component
const PersonalInformation = ({ currentUser, openUpdateModal, openUpdateAddressModal }) => (
  <>
    <div className="w-full mt-20 md:px-20">
      <div className="m-6 p-6 bg-white flex flex-col gap-2 rounded-md md:px-16">
        <div className="h-20 w-20 rounded-full flex justify-center items-center mx-auto relative bottom-16">
          <img src="/placeholder.png" alt="" className="rounded-full" />
        </div>
        <h1 className="text-center text-xl relative bottom-14">Personal Information</h1>
        <div className="relative bottom-10 flex flex-col gap-2">
          <p><span className="font-semibold">Name :</span> {currentUser.fullname}</p>
          <p><span className="font-semibold">Email :</span> {currentUser.email}</p>
          <p><span className="font-semibold">Gender :</span> {currentUser.gender}</p>
          <p><span className="font-semibold">Age :</span> {currentUser.age}</p>
          <p><span className="font-semibold">Phone :</span> {currentUser.phone}</p>
          <button className="bg-rose-500 p-3 rounded-md text-white relative top-8" onClick={openUpdateModal}>
            Update Personal Information
          </button>
        </div>
      </div>
    </div>
    <div className="w-full mt-6 md:px-20">
      <div className="m-6 p-6 bg-white flex flex-col gap-2 rounded-md md:px-16">
        <h1 className="text-center text-xl">Address Information</h1>
        <div className="flex flex-col gap-2 mt-5">
          <p><span className="font-semibold">Street :</span> {currentUser.street || " Not Updated Yet"}</p>
          <p><span className="font-semibold">Area :</span> {currentUser.area || " Not Updated Yet"}</p>
          <p><span className="font-semibold">City :</span> {currentUser.city || " Not Updated Yet"}</p>
          <p><span className="font-semibold">PIN :</span> {currentUser.pin || " Not Updated Yet"}</p>
          <button className="bg-rose-500 p-3 rounded-md text-white mt-6" onClick={openUpdateAddressModal}>
            Update Address Information
          </button>
        </div>
      </div>
    </div>
  </>
);

// Student Profile Page
const StudentProfilePage = ({ currentUser, openUpdateModal, openUpdateAddressModal, handleLogout, openUpdateAcadInfo }) => (
  <div>
    <PersonalInformation currentUser={currentUser} openUpdateModal={openUpdateModal} openUpdateAddressModal={openUpdateAddressModal} />

    <div className="w-full mt-6 md:px-20">
      <div className="m-6 p-6 bg-white flex flex-col gap-2 rounded-md md:px-16">
        <h1 className="text-center text-xl">Academic Information</h1>
        <div className="flex flex-col gap-2 mt-5">
          <p><span className="font-semibold">Class :</span> {currentUser.class || " Not Updated Yet"}</p>
          <p><span className="font-semibold">School :</span> {currentUser.school || " Not Updated Yet"}</p>
          <p><span className="font-semibold">Subject/Skill you want to learn :</span> {currentUser.subject || " Not Updated Yet"}</p>
          <p><span className="font-semibold">Preference :</span> {currentUser.preference || " Not Updated Yet"}</p>
          <button className="bg-rose-500 p-3 rounded-md text-white mt-6" onClick={openUpdateAcadInfo}>
            Update Academic Information
          </button>
        </div>
      </div>
    </div>

    <div className="flex justify-center items-center mb-10">
      <button className="w-1/2 rounded-md bg-red-700 text-white p-4" onClick={handleLogout}>Logout</button>
    </div>
  </div>
);

// Teacher Profile Page
const TeacherProfilePage = ({ currentUser, openUpdateModal, openUpdateAddressModal, handleLogout, openUpdateTeachingLocation, openUpdateTeachingInfo }) => (
  <div className="teacher-profile-page">
    <PersonalInformation currentUser={currentUser} openUpdateModal={openUpdateModal} openUpdateAddressModal={openUpdateAddressModal} />
    <div className="w-full mt-6 md:px-20">
      <div className="m-6 p-6 bg-white flex flex-col gap-2 rounded-md md:px-16">
        <h1 className="text-center text-xl">Teaching Information</h1>
        <div className="flex flex-col gap-2 mt-5">
          <p><span className="font-semibold">Highest Qualification :</span> {currentUser.qualification || " Not Updated Yet"}</p>
          <p><span className="font-semibold">Subject/Skill you want to teach :</span> {currentUser.subject || " Not Updated Yet"}</p>
          <button className="bg-rose-500 p-3 rounded-md text-white mt-6" onClick={openUpdateTeachingInfo}>
            Update Teaching Information
          </button>
        </div>
      </div>
    </div>
    <div className="w-full mt-6 md:px-20">
      <div className="m-6 p-6 bg-white flex flex-col gap-2 rounded-md md:px-16">
        <h1 className="text-center text-xl">Teaching Location</h1>
        <div className="flex flex-col gap-2 mt-5">
          <p><span className="font-semibold">Preferred Area :</span> {currentUser.preferredarea || " Not Updated Yet"}</p>
          <p><span className="font-semibold">City :</span> {currentUser.preferredcity || " Not Updated Yet"}</p>
          <button className="bg-rose-500 p-3 rounded-md text-white mt-6" onClick={openUpdateTeachingLocation}>
            Update Teaching Location
          </button>
        </div>
      </div>
    </div>

    <div className="flex justify-center items-center mb-10">
      <button className="w-1/2 rounded-md bg-red-700 text-white p-4" onClick={handleLogout}>Logout</button>
    </div>
  </div>
);

// Main Profile Component
const Profile = ({ openUpdateModal, openUpdateAddressModal, openUpdateAcadInfo, openUpdateTeachingLocation, openUpdateTeachingInfo }) => {
  const navigate = useNavigate();
  const { currentUser, getRole, updateUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    try {
      const res = await (`${import.meta.env.VITE_BASE_URL}/api/auth/logout`, null, {
  withCredentials: true,
});

      if (res.status === 200) {
        updateUser(null); // Remove user info from context and local storage
        toast.success("Logout successful!");
        navigate('/'); // Redirect to home page
      }
    } catch (error) {
      toast.error("Failed to logout. Please try again.");
      console.error("Logout error:", error);
    }
  };

  if (!currentUser) {
    return null; // Render nothing if the user is not logged in
  }

  // Render different components based on the user's role
  if (getRole() === "Teacher") {
    return (
      <TeacherProfilePage
        currentUser={currentUser}
        openUpdateModal={openUpdateModal}
        handleLogout={handleLogout}
        openUpdateAddressModal={openUpdateAddressModal}
        openUpdateTeachingLocation={openUpdateTeachingLocation}
        openUpdateTeachingInfo={openUpdateTeachingInfo} // Ensure this prop is passed here
      />
    );
  } else if (getRole() === "student") { // Correct role to "Student"
    return (
      <StudentProfilePage
        currentUser={currentUser}
        openUpdateModal={openUpdateModal}
        handleLogout={handleLogout}
        openUpdateAddressModal={openUpdateAddressModal}
        openUpdateAcadInfo={openUpdateAcadInfo} // Ensure this prop is passed here
      />
    );
  } else {
    return <div>Unknown role</div>; // Handle unexpected roles if necessary
  }
};

export default Profile;
