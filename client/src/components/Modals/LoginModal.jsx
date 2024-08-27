import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import Modal from "./Modals";
import Heading from "../Heading";
import Input from "../Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const LoginModal = ({ isOpen, onClose, onSignUp }) => {

  const navigate = useNavigate();

  const {updateUser} = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const sanitizedData = {
      ...data,
      email: data.email.toLowerCase(), // Ensure email is lowercase before submission
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/login`, sanitizedData, {
        withCredentials: true, // Include credentials to handle cookies
      });

      updateUser(response.data) // Save to local storage
      toast.success("Login successful!");
      onClose(); // Close the modal on successful login
      navigate("/"); // Navigate to home page
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Login failed. Please try again.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading center title="Welcome back" subtitle="Login to your account" />

      <div className="flex flex-col md:flex-row gap-4">
        <Input
          id="email"
          label="Email"
          type="text"
          disabled={isSubmitting}
          {...register("email", {
            required: "Email is required",
            validate: (value) => {
              const lowercaseEmail = value.toLowerCase();
              const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              return pattern.test(lowercaseEmail) || "Invalid email address";
            },
          })}
          error={errors.email?.message}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Input
          id="password"
          label="Password"
          type="password"
          disabled={isSubmitting}
          {...register("password", {
            required: "Password is required",
            validate: (value) => {
              const hasUpperCase = /[A-Z]/.test(value);
              const hasLowerCase = /[a-z]/.test(value);
              const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

              if (!hasUpperCase) {
                return "Password must contain at least one uppercase letter";
              }
              if (!hasLowerCase) {
                return "Password must contain at least one lowercase letter";
              }
              if (!hasSpecialChar) {
                return "Password must contain at least one special character";
              }
              return true;
            },
          })}
          error={errors.password?.message}
        />
      </div>
    </div>
  );

  const footerContent = (
    <div className="mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => toast.error("Google Sign-In not implemented yet!")}
      />

      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row justify-center items-center gap-2">
          <div>Don’t have an account?</div>
          <div
            className="text-black cursor-pointer hover:underline"
            onClick={onSignUp} // Switch to RegisterModal
          >
            Sign up
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isSubmitting}
      isOpen={isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
