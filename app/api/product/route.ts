import { RequestCreateProduct } from "@/src/entities/product-entity";
import { z } from "zod";
import fs from "fs";
import prisma from "@/prisma";
import { generateRandomName } from "@/src/helpers/generator";
import { Product } from "@prisma/client";

export async function POST(req: Request) {
  const data: z.infer<typeof RequestCreateProduct> = await req.json();
  // Base64 string
  const base64String = data.image;

  // Remove the data:image/png;base64 part
  const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");

  // Convert base64 to a buffer
  const buffer = Buffer.from(base64Data, "base64");

  const regex = /^data:image\/(\w+);base64,/;
  const match = base64String.match(regex);
  const fileExtension = match ? match[1] : "png";

  // File path to save the file
  const filePath = `public/${generateRandomName()}.${fileExtension}`;

  // Write the buffer to the file
  await fs.writeFileSync(filePath, buffer);

  const product = await prisma.product.create({
    data: {
      image: filePath.replace("public/", ""),
      code: data.code,
      name: data.name,
      category: data.category,
      stock: data.stock,
      price: data.price,
    },
  });

  return Response.json(
    JSON.stringify(product, (_, v) =>
      typeof v === "bigint" ? v.toString() : v
    )
  );
}

export async function PUT(req: Request) {
  const data: Product = await req.json();

  // Object to hold the data for updating the product
  const updateData: any = {
    code: data.code,
    name: data.name,
    category: data.category,
    stock: data.stock,
    price: data.price,
  };

  // Check if there is an image and it's not null
  if (data.image && data.image.startsWith("data:image")) {
    // Remove the data:image/png;base64 part
    const base64Data = data.image.replace(/^data:image\/\w+;base64,/, "");

    // Convert base64 to a buffer
    const buffer = Buffer.from(base64Data, "base64");

    const regex = /^data:image\/(\w+);base64,/;
    const match = data.image.match(regex);
    const fileExtension = match ? match[1] : "png";

    // File path to save the file
    const filePath = `public/${generateRandomName()}.${fileExtension}`;

    // Write the buffer to the file
    await fs.writeFileSync(filePath, buffer);

    // Add image path to update data
    updateData.image = filePath.replace("public/", "");
  }

  // Update the product in the database
  await prisma.product.update({
    where: { id: data.id }, // Ensure to include logic to specify the product ID
    data: updateData,
  });

  return Response.json("ok");
}
