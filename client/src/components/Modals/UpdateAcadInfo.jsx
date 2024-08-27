import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContext } from '../../context/AuthContext';
import Modal from "./Modals";
import Heading from "../Heading";
import Input from "../Input";
import Select from "../Select";
import toast from "react-hot-toast";
import Button from "../Button";

const UpdateAcadInfo = ({ isOpen, onClose }) => {
  const { currentUser, updateUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      class: currentUser?.class || "",
      school: currentUser?.school || "",
      subject: currentUser?.subject || "",
      preference: currentUser?.preference || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/user/academicinfo/${currentUser.id}`,
        data,
        { withCredentials: true }
      );
      
      // Update user context and show success toast
      updateUser(response.data);
      toast.success("Academic information updated successfully!");
      onClose();
    } catch (error) {
      // Log the error and show error toast
      console.error("Error response:", error.response);
      toast.error("Failed to update academic information!");
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading center title="Update Academic Information" subtitle="Make changes to your academic details" />

      <div className="flex flex-col md:flex-row gap-4">
        <Input
          id="class"
          label="Class"
          type="text"
          disabled={isSubmitting}
          {...register("class")}
          error={errors.class?.message}
        />

        <Input
          id="school"
          label="School"
          type="text"
          disabled={isSubmitting}
          {...register("school")}
          error={errors.school?.message}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Input
          id="subject"
          label="Subject/Skill You Want to Learn"
          type="text"
          disabled={isSubmitting}
          {...register("subject", {
            required: "This field is required",
          })}
          error={errors.subject?.message}
        />

        <Select
          id="preference"
          label="Preference"
          disabled={isSubmitting}
          {...register("preference", {
            required: "Please select a preference",
          })}
          error={errors.preference?.message}
          options={[
            { value: "", label: "Select Preference" },
            { value: "Male", label: "Male" },
            { value: "Female", label: "Female" },
            { value: "Any", label: "Any" },
          ]}
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
      title="Update Academic Information"
      actionLabel="Save Changes"
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default UpdateAcadInfo;
