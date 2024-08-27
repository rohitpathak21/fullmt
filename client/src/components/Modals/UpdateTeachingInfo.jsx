import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContext } from '../../context/AuthContext';
import Modal from "./Modals";
import Heading from "../Heading";
import Input from "../Input";
import toast from "react-hot-toast";
import Button from "../Button";

const UpdateTeachingDetails = ({ isOpen, onClose }) => {
  const { currentUser, updateUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      qualification: currentUser?.qualification || "",
      subject: currentUser?.subject || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/teacher/teachingdetails/${currentUser.id}`,
        data,
        { withCredentials: true }
      );
      
      updateUser(response.data);
      toast.success("Teaching details updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error response:", error.response);
      toast.error("Failed to update teaching details!");
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading center title="Update Teaching Details" subtitle="Make changes to your teaching details" />

      <div className="flex flex-col gap-4">
        <Input
          id="qualification"
          label="Highest Qualification"
          type="text"
          disabled={isSubmitting}
          {...register("qualification", {
            required: "This field is required",
          })}
          error={errors.qualification?.message}
        />

        <Input
          id="subject"
          label="Subject/Skill"
          textarea // Use textarea prop here
          disabled={isSubmitting}
          {...register("subject", {
            required: "This field is required",
          })}
          error={errors.subject?.message}
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
      title="Update Teaching Details"
      actionLabel="Save Changes"
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default UpdateTeachingDetails;
