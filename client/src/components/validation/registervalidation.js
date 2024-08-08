import { z } from 'zod';

const registervalidation = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required")
    .max(20, "Name must be less than 20 characters")
    .regex(/^[a-zA-Z\s]*$/, "Name must not contain numbers"),
  age: z.number().int().gt(0, "Age must be greater than 0").lt(100, "Age must be less than 100"),
  gender: z.enum(["Male", "Female"], { errorMap: () => ({ message: "Gender must be Male or Female" }) }),
  phone: z.string().length(10, "Phone number must be exactly 10 digits").regex(/^\d{10}$/, "Phone number must contain only digits"),
  password: z.string().min(8, "Password must be at least 8 characters long")
    .max(15, "Password must be less than 15 characters long")
    .regex(/[a-zA-Z]/, "Password must contain at least one letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
});

export default registervalidation;
