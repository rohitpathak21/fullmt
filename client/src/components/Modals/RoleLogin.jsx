import React from "react";
import Modal from "./Modals";
import Heading from "../Heading";
import Button from "../Button";

const RoleLogin = ({ isOpen, onClose, onStudentSelect, onTeacherSelect }) => {
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading center title="Choose your role" subtitle="Please select one" />
      <div className="flex flex-col md:flex-row gap-4">
        <Button label="Student" onClick={onStudentSelect} />
        <Button label="Teacher" onClick={onTeacherSelect} />
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Select Role"
      actionLabel="Cancel"
      onSubmit={onClose}
      body={bodyContent}
    />
  );
};

export default RoleLogin;
