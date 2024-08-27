import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContext } from '../../context/AuthContext';
import Modal from "./Modals";
import Heading from "../Heading";
import Input from "../Input";
import toast from "react-hot-toast";
import Button from "../Button";

const UpdateTeachingLocation = ({ isOpen, onClose }) => {
  const { currentUser, updateUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      area: currentUser?.preferredarea || "",
      city: currentUser?.preferredcity|| "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/teacher/teachinglocation/${currentUser.id}`,
        data,
        { withCredentials: true }
      );
      
      // Update user context and show success toast
      updateUser(response.data);
      toast.success("Teaching location updated successfully!");
      onClose();
    } catch (error) {
      // Log the error and show error toast
      console.error("Error response:", error.response);
      toast.error("Failed to update teaching location!");
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading center title="Update Teaching Location" subtitle="Make changes to your teaching location details" />

      <div className="flex flex-col md:flex-row gap-4">
        <Input
          id="area"
          label="Area"
          type="text"
          disabled={isSubmitting}
          {...register("area", {
            required: "This field is required",
          })}
          error={errors.area?.message}
        />

        <Input
          id="city"
          label="City"
          type="text"
          disabled={isSubmitting}
          {...register("city", {
            required: "This field is required",
          })}
          error={errors.city?.message}
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
      title="Update Teaching Location"
      actionLabel="Save Changes"
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default UpdateTeachingLocation;
