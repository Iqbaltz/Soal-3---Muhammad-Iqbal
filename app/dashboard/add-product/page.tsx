import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import React from "react";
import FormAddProduct from "./form-add-product/form-add-product";

type Props = {};

export default async function AddProductPage({}: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  return (
    <div className="w-[90%] mx-auto mt-8">
      <h1>Add Product</h1>
      <FormAddProduct />
    </div>
  );
}
