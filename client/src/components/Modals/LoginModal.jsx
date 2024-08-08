import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Modal from "./Modals";
import Heading from "../Heading";
import Input from "../Input";
import toast from "react-hot-toast";
import Button from "../Button";

const LoginModal = ({ isOpen, onClose, onSignUp }) => {
  const [isLoading, setIsLoading] = useState(false);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading center title="Welcome back" subtitle="Login to your account" />
      
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          id="email"
          label="Email"
          type="text"
          disabled={isLoading}
          required
          errors={{}} 
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Input
          id="password"
          label="Password"
          type="password"
          disabled={isLoading}
          required
          errors={{}}
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
      disabled={isLoading}
      isOpen={isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={onClose}
      onSubmit={() => {}}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
