import {React} from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import Modal from "./Modals";
import Heading from "../Heading";
import Input from "../Input";
import toast from "react-hot-toast";
import Select from "../Select"
import Button from "../Button";

const capitalizeWords = (str) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const RegisterModal = ({ isOpen, onClose, onLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    // Normalize email to lowercase 
    const normalizedData = {
      ...data,
      email: data.email.toLowerCase().trim(),
      fullname: capitalizeWords(data.fullname), // Capitalize each word in the name
    };

    try {
      console.log(normalizedData);
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/register`, normalizedData);
      toast.success("Registration successful!.");
      onLogin();
    } catch (error) {
      console.error("Error response:", error.response);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message === "Email is already in use"
      ) {
        toast.error("The email is already in use. Please choose another one.");
      } else {
        toast.error("Something went wrong!");
      }
    }
  
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading center title="Welcome to myTutor" subtitle="Create an account" />
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          id="email"
          label="Email"
          type="text"
          disabled={isSubmitting}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\s*[^\s@]+@[^\s@]+\.[^\s@]+\s*$/,
              message: "Invalid email address",
            },
          })}
          error={errors.email?.message}
        />
        
        <Input
          id="fullname"
          label="Name"
          type="text"
          disabled={isSubmitting}
          {...register("fullname", {
            required: "Name is required",
            maxLength: {
              value: 20,
              message: "Name must be less than 20 characters",
            },
          })}
          error={errors.name?.message}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
      <Select
          id="gender"
          label="Gender"
          disabled={isSubmitting}
          {...register("gender", {
            required: "Gender is required",
          })}
          options={[
            { value: "Male", label: "Male" },
            { value: "Female", label: "Female" },
            { value: "Transgender", label: "Transgender" },
          ]}
        />
        <Input
          id="age"
          label="Age"
          type="number"
          disabled={isSubmitting}
          {...register("age", {
            required: "Age is required",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Age must be a positive number",
            },
            max: {
              value: 120,
              message: "Age must be less than 120",
            },
          })}
          error={errors.age?.message}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Input
          id="phone"
          label="Phone"
          type="text"
          disabled={isSubmitting}
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^\+?[1-9]\d{1,14}$/, // E.164 format
              message: "Invalid phone number",
            },
          })}
          error={errors.phone?.message}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          disabled={isSubmitting}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/, // At least one uppercase, one lowercase, one number, and one special character
              message:
                "Password must include uppercase, lowercase letters, a number, and a special character",
            },
          })}
          error={errors.password?.message}
        />
      </div>
      <p className="text-gray-400 text-base mt-4 text-center">The email will be permanent and can't be changed later.</p>
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
          <div>Already have an account?</div>
          <div
            className="text-black cursor-pointer hover:underline"
            onClick={onLogin} // Switch to LoginModal
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isSubmitting}
      isOpen={isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)} // Use handleSubmit from react-hook-form
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
