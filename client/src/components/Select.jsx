import React, { forwardRef } from 'react';

const Select = forwardRef(({
  id,
  label,
  disabled,
  required,
  error,
  value, // Added value prop
  onChange, // Added onChange prop
  options = [],
  ...props
}, ref) => {
  return (
    <div className='w-full relative'>
      <select
        id={id}
        disabled={disabled}
        required={required}
        ref={ref} // Forward the ref here
        value={value} // Use value prop to control selected option
        onChange={onChange} // Handle change event
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
          appearance-none
        `}
        {...props} // Spread remaining props
      >
        <option value="" disabled>{label}</option> {/* Placeholder option */}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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

export default Select;
