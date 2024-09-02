import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContext } from '../../context/AuthContext';
import Modal from "./Modals";
import Heading from "../Heading";
import Input from "../Input";
import toast from "react-hot-toast";
import Button from "../Button";

const capitalizeFirstLetter = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const UpdateAddressModal = ({ isOpen, onClose }) => {
  const { currentUser, getRole, updateUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      street: currentUser?.street || "",
      area: currentUser?.area || "",
      city: currentUser?.city || "",
      pin: currentUser?.pin || "",
    },
  });

  // Set default values when currentUser changes
  React.useEffect(() => {
    if (currentUser) {
      setValue("street", currentUser.street || "");
      setValue("area", currentUser.area || "");
      setValue("city", currentUser.city || "");
      setValue("pin", currentUser.pin || "");
    }
  }, [currentUser, setValue]);

  const onSubmit = async (data) => {
    // Normalize data
    const normalizedData = {
      ...data,
      city: capitalizeFirstLetter(data.city),  // Capitalize the first letter of the city
      pin: data.pin.trim(),
    };
  
    // Determine endpoint based on role
    const role = getRole();
    const endpoint = role === "Teacher"
      ? `${import.meta.env.VITE_BASE_URL}/api/teacher/address/${currentUser.id}`
      : `${import.meta.env.VITE_BASE_URL}/api/user/address/${currentUser.id}`;
  
    try {
      const response = await axios.put(endpoint, normalizedData, {
        withCredentials: true,
      });
      
      // Update user context and show success toast
      updateUser(response.data);
      toast.success("Address updated successfully!");
      onClose();
    } catch (error) {
      // Log the error and show error toast
      console.error("Error response:", error.response);
      toast.error("Failed to update address!");
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading center title="Update Your Address" subtitle="Make changes to your address details" />

      <div className="flex flex-col md:flex-row gap-4">
        <Input
          id="street"
          label="Street"
          type="text"
          disabled={isSubmitting}
          {...register("street", {
            required: "Street is required",
          })}
          error={errors.street?.message}
        />

        <Input
          id="area"
          label="Area"
          type="text"
          disabled={isSubmitting}
          {...register("area", {
            required: "Area is required",
          })}
          error={errors.area?.message}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Input
          id="city"
          label="City"
          type="text"
          disabled={isSubmitting}
          {...register("city", {
            required: "City is required",
          })}
          error={errors.city?.message}
        />

        <Input
          id="pin"
          label="Pin"
          type="text"
          disabled={isSubmitting}
          {...register("pin", {
            required: "Pin is required",
            pattern: {
              value: /^[0-9]{6}$/, // Example pattern for a 6-digit pin
              message: "Invalid pin code",
            },
          })}
          error={errors.pin?.message}
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
      title="Update Address"
      actionLabel="Save Changes"
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default UpdateAddressModal;
