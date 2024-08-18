import { React, useContext } from "react";
import { AuthContext } from '../../context/AuthContext';
import { useForm } from "react-hook-form";
import axios from "axios";
import Modal from "./Modals";
import Heading from "../Heading";
import Input from "../Input";
import toast from "react-hot-toast";
import Button from "../Button";

const capitalizeWords = (str) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const capitalizeFirstLetter = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const UpdateProfile = ({ isOpen, onClose }) => {
  const { currentUser, updateUser } = useContext(AuthContext); // Get currentUser from context

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullname: currentUser?.fullname || "",
      email: currentUser?.email || "",
      gender: currentUser?.gender || "",
      age: currentUser?.age || "",
      phone: currentUser?.phone || "",
    },
  });

  const onSubmit = async (data) => {
    // Normalize email to lowercase and other data
    const normalizedData = {
      ...data,
      email: data.email.toLowerCase().trim(),
      gender: capitalizeFirstLetter(data.gender),
      fullname: capitalizeWords(data.fullname),
    };

    try {
      
      const response = await axios.put(`http://localhost:8800/api/user/${currentUser.id}`, normalizedData, {
        withCredentials: true // If using cookies for authentication
      });
      toast.success("Profile updated successfully!");

      // Update the context with the new user data
      updateUser(response.data); 

      onClose();
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
      <Heading center title="Update Your Profile" subtitle="Make changes to your account" />
      
      <div className="flex flex-col md:flex-row gap-4">
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
          error={errors.fullname?.message}
        />

        <Input
          id="email"
          label="Email"
          type="email"
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
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Input
          id="gender"
          label="Gender"
          type="text"
          disabled={isSubmitting}
          {...register("gender", {
            required: "Gender is required",
            validate: (value) => {
              const normalizedValue = value.toLowerCase();
              return (
                ["male", "female", "transgender"].includes(normalizedValue) ||
                "Invalid gender"
              );
            },
          })}
          error={errors.gender?.message}
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
      </div>
    </div>
  );

  const footerContent = (
    <div className="mt-3">
      <Button
        outline
        label="Cancel"
        onClick={onClose}
        disabled={isSubmitting}
      />
    </div>
  );

  return (
    <Modal
      disabled={isSubmitting}
      isOpen={isOpen}
      title="Update Profile"
      actionLabel="Save Changes"
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)} // Use handleSubmit from react-hook-form
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default UpdateProfile;
