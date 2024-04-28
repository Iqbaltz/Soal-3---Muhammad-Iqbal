import { getServerSession } from "next-auth";
import React from "react";
import FormAddProduct from "./components/form-add-product";
import { authOptions } from "@/src/utils/authOptions";

type Props = {};

export default async function AddProductPage({}: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  return (
    <div className="w-[90%] mx-auto mt-8">
      <h1 className="font-bold text-xl">Add Product</h1>
      <FormAddProduct />
    </div>
  );
}
