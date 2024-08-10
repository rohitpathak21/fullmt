import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Modal from "./Modals";
import Heading from "../Heading";
import Input from "../Input";
import toast from "react-hot-toast";
import Button from "../Button";

const VerificationModal = ({ isOpen, onClose, email }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:8800/api/auth/verify-otp", {
        email,
        otp: data.otp,
      });
      toast.success("Email verified successfully!");
      onClose(); // Close modal on success
    } catch (error) {
      if (
        error.response &&
        error.response.data.message === "Invalid OTP"
      ) {
        toast.error("The OTP is invalid. Please try again.");
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading center title="Verify Your Email" subtitle="Enter the OTP sent to your email" />
      <Input
        id="otp"
        label="OTP"
        type="text"
        disabled={isSubmitting}
        {...register("otp", {
          required: "OTP is required",
        })}
        error={errors.otp?.message}
      />
    </div>
  );

  return (
    <Modal
      disabled={isSubmitting}
      isOpen={isOpen}
      title="Verify OTP"
      actionLabel="Verify"
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default VerificationModal;
