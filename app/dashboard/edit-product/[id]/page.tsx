import { authOptions } from "@/src/utils/authOptions";
import { getServerSession } from "next-auth";
import React from "react";
import FormEditProduct from "./components/form-edit-product";
import prisma from "@/prisma";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  const product = await prisma.product.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  return (
    <div className="w-[90%] mx-auto mt-8">
      <h1 className="font-bold text-xl">Edit Product </h1>
      <FormEditProduct product={product} />
    </div>
  );
}
