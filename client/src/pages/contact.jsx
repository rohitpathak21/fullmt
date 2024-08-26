import React from 'react';
import { toast } from 'react-hot-toast';
import { IoCall } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Contact = () => {
  const validateEmail = (email) => {
    // Regular expression for basic email format validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget; // Corrected to use event.currentTarget
    const formData = new FormData(form);
    const email = formData.get("email");

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    formData.append("access_key", "41b9c1cc-0d0f-4e38-b352-c67e113212f3");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      }).then((res) => res.json());

      if (res.success) {
        toast.success("Message sent successfully!");
        form.reset(); // Optionally reset the form after successful submission
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className='text-white antialiased flex w-full h-[calc(100% - 196px)] mt-16 justify-between px-28'>
      <div className='flex-1'>
        <div className='flex flex-col h-full justify-around gap-10 py-8 pr-6'>
          <div className='flex flex-col gap-5'>
            <h1 className='text-5xl tracking-wide font-semibold'>Contact Us</h1>
            <p className='text-xl font-normal'>We're committed to excellence and value your input. Reach out to us with any questions, suggestions, or just to say hello! Whether you prefer email, phone, or our contact form, we're here to assist you promptly. Your satisfaction is our priority.</p>
          </div>

          <div className='flex flex-col gap-5 text-lg'>
            <div className='inline-flex space-x-3 items-center'>
              <IoCall className='text-2xl'/>
              <span>+123-456-789</span>
            </div>
            <div className='inline-flex space-x-2 items-center'>
              <IoMdMail className='text-2xl'/>
              <span>contactmytutor@gmail.com</span>
            </div>
            <div className='inline-flex space-x-2 items-center'>
              <FaLocationDot className='text-2xl'/>
              <span>11, Infinity Tower, Lucknow, Uttar Pradesh</span>
            </div>
          </div>

          <div className='icons flex space-x-4 pt-4'>
            <FaFacebook className='text-2xl'/>
            <FaTwitter className='text-2xl'/>
            <FaInstagram className='text-2xl'/>
            <FaLinkedin className='text-2xl'/>
          </div>
        </div>
      </div>

      <div className='flex-1'>
        <form className='flex flex-col h-full justify-between pt-8 pl-20 gap-2 font-semibold' onSubmit={onSubmit}>
          <input type="text" placeholder='Full Name' name='name' className='bg-[#2d2b42] p-4 border-none rounded-md'/>
          <input type="text" placeholder='Email' name='email' className='bg-[#2d2b42] p-4 border-none rounded-md'/>
          <textarea name="message" cols="20" rows="10" placeholder='Message' className='bg-[#2d2b42] p-4 border-none rounded-md'></textarea>
          <button type="submit" className='w-full p-5 cursor-pointer bg-blue-600 border-none rounded-lg hover:bg-blue-400'>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
