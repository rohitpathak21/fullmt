import React from 'react';

const Input = ({
    id,
    label,
    type = "text",
    disabled,
    required,
    errors,
}) => {
  return (
    <div className='w-full relative'>
        <input 
          id={id} 
          disabled={disabled} 
          required={required} 
          placeholder=' '
          type={type}  
          className={`
            peer
            w-full
            p-4
            pt-7 
            font-light 
            bg-white 
            border-2
            rounded-md
            outline-none
            transition
            text-black
            disabled:opacity-70
            disabled:cursor-not-allowed
            ${errors && errors[id] ? 'border-rose-500' : 'border-neutral-300'}
            ${errors && errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
          `}
        />
        <label 
          className={`
            absolute 
            text-md
            duration-150 
            transform 
            -translate-y-3 
            top-5 
            z-10 
            origin-[0] 
            left-[18px]
            peer-placeholder-shown:scale-100 
            peer-placeholder-shown:translate-y-0 
            peer-focus:scale-75
            peer-focus:-translate-y-3
            ${errors && errors[id] ? 'text-rose-500' : 'text-zinc-400'}
          `}
        >
          {label}
        </label>
    </div>
  );
}

export default Input;
