import React, { useState } from "react";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import Modal from "./Modals";
import Heading from "../Heading";
import Input from "../Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { z } from "zod";

// Define the Zod schema
const schema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(1).max(20).regex(/^[A-Za-z\s]+$/, "Name should not contain numbers"),
  gender: z.string().regex(/^(Male|Female)$/, "Gender should be either Male or Female"),
  age: z.number().int().min(1).max(99, "Age should be between 1 and 99"),
  phone: z.string().length(10).regex(/^[0-9]+$/, "Phone number should be 10 digits long"),
  password: z.string().min(8).max(15).regex(/(?=.*[0-9])(?=.*[^a-zA-Z0-9])/, "Password must contain at least one number and one special character"),
});

const RegisterModal = ({ isOpen, onClose, onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    gender: "",
    age: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrors({}); // Clear previous errors

    try {
      schema.parse(formData);

      // If validation is successful, make API request
      try {
        const response = await axios.post("http://localhost:8800/auth/register", formData);
        toast.success("Registration successful!");
        onClose(); // Close modal on success
      } catch (error) {
        toast.error("Something went wrong!");
      }

    } catch (error) {
      if (error instanceof z.ZodError) {
        // Set errors if validation fails
        const formattedErrors = error.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        setErrors(formattedErrors);
      } else {
        toast.error("An unexpected error occurred!");
      }
    } finally {
      setIsLoading(false);
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
          disabled={isLoading}
          required
          value={formData.email}
          onChange={handleChange}
          error={errors.email} // Pass error message
        />
        <Input
          id="name"
          label="Name"
          type="text"
          disabled={isLoading}
          required
          value={formData.name}
          onChange={handleChange}
          error={errors.name} // Pass error message
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Input
          id="gender"
          label="Gender"
          type="text"
          disabled={isLoading}
          required
          value={formData.gender}
          onChange={handleChange}
          error={errors.gender} // Pass error message
        />
        <Input
          id="age"
          label="Age"
          type="number"
          disabled={isLoading}
          required
          value={formData.age}
          onChange={handleChange}
          error={errors.age} // Pass error message
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Input
          id="phone"
          label="Phone"
          type="text"
          disabled={isLoading}
          required
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone} // Pass error message
        />
        <Input
          id="password"
          label="Password"
          type="password"
          disabled={isLoading}
          required
          value={formData.password}
          onChange={handleChange}
          error={errors.password} // Pass error message
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
        onClick={() => toast.info("Google Sign-In not implemented yet!")}
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
      disabled={isLoading}
      isOpen={isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={onClose}
      onSubmit={handleSubmit} // Pass handleSubmit as onSubmit
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
