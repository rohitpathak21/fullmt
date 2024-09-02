import React, { forwardRef } from 'react';

const Input = forwardRef(({
  id,
  label,
  type = "text",
  textarea = false, // New prop to determine if it should render a textarea
  disabled,
  required,
  error,
  ...props
}, ref) => {
  const commonClasses = `
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
  `;

  return (
    <div className='w-full relative'>
      {textarea ? (
        <textarea
          id={id}
          disabled={disabled}
          required={required}
          placeholder=' '
          ref={ref}
          className={`${commonClasses} resize-none`} // Add resize-none for textarea
          {...props}
        />
      ) : (
        <input
          id={id}
          type={type}
          disabled={disabled}
          required={required}
          placeholder=' '
          ref={ref}
          className={commonClasses}
          {...props}
        />
      )}
      <label
        htmlFor={id} // Add this line to associate the label with the input
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
      {error && <p className="text-rose-500 text-sm">{error}</p>}
    </div>
  );
});

export default Input;
