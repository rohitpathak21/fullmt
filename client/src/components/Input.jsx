import React, { forwardRef } from 'react';

const Input = forwardRef(({
  id,
  label,
  type = "text",
  disabled,
  required,
  error, // Expect an error message or boolean
  ...props
}, ref) => {
  return (
    <div className='w-full relative'>
      <input 
        id={id} 
        disabled={disabled} 
        required={required} 
        placeholder=' '
        type={type}
        ref={ref} // Forward the ref here
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
          ${error ? 'border-rose-500' : 'border-neutral-300'}
          ${error ? 'focus:border-rose-500' : 'focus:border-black'}
        `}
        {...props} // Spread remaining props
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
          ${error ? 'text-rose-500' : 'text-zinc-400'}
        `}
      >
        {label}
      </label>
      {error && <p className="text-rose-500 text-sm">{error}</p>} {/* Display error message if exists */}
    </div>
  );
});

export default Input;
