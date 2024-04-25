import { z } from "zod";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone_number: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export let UserRegisterSchema = z
  .object({
    name: z.string().refine(
      (value) => {
        // Trim leading and trailing spaces
        const trimmedValue = value.trim();
        // Check if the trimmed value has at least 3 characters and doesn't exceed 255 characters
        return trimmedValue.length >= 3 && trimmedValue.length <= 255;
      },
      {
        message:
          "Name must be between 3 and 255 characters long after trimming",
      }
    ),
    email: z.string().email(),
    phone_number: z
      .string()
      .min(8)
      .max(15)
      .refine(
        (value) => {
          // Regular expression to check if the phone number starts with "08"
          const regex = /^08/;
          return regex.test(String(value));
        },
        {
          message: 'Phone number must start with "08"',
        }
      ),
    password: z.string().min(8),
    confirm_password: z.string().min(8),
    //   confirm password must same with password
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password and confirm password must be the same",
    path: ["confirm_password"],
  });

export let UserLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
