import { z } from "zod";

export let RequestCreateProduct = z.object({
  image: z.any().refine(
    (file: File) => {
      return file;
    },
    {
      message: "Image is required",
    }
  ),
  code: z.string(),
  name: z.string().refine(
    (value) => {
      // Trim leading and trailing spaces
      const trimmedValue = value.trim();
      // Check if the trimmed value has at least 3 characters and doesn't exceed 255 characters
      return trimmedValue.length >= 3 && trimmedValue.length <= 255;
    },
    {
      message: "Name must be between 3 and 255 characters long after trimming",
    }
  ),
  category: z.string(),
  stock: z.number(),
  price: z.number(),
});
