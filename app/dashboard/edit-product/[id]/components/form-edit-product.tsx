"use client";
import { RequestCreateProduct } from "@/src/entities/product-entity";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { BiEdit } from "react-icons/bi";
import { z } from "zod";

const categories = [
  { value: "Kategori 1", label: "Kategori 1" },
  { value: "Kategori 2", label: "Kategori 2" },
  { value: "Kategori 3", label: "Kategori 3" },
];

type Props = {
  product: Product | null;
};

export default function FormEditProduct({ product }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof RequestCreateProduct>>({
    resolver: zodResolver(RequestCreateProduct),
    defaultValues: {
      code: product?.code,
      name: product?.name,
      category: product?.category,
      stock: product?.stock,
      price: Number(product?.price),
      image: { name: product?.image },
    },
  });

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof RequestCreateProduct>) => {
    // Check if data.image is an instance of File
    if (data.image instanceof File) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target?.result;
        const payload = JSON.stringify({
          ...data,
          image: base64,
          id: product?.id,
        });
        const response = await fetch("/api/product", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: payload,
        });

        if (response.ok) {
          router.push("/dashboard");
        }
      };
      reader.readAsDataURL(data.image);
    } else {
      const payload = JSON.stringify({ ...data, image: null, id: product?.id }); // Not including the image in the payload
      const response = await fetch("/api/product", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload,
      });

      if (response.ok) {
        router.push("/dashboard");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 mt-6">
        <div>
          <input
            onChange={(e) => {
              setValue("image", e.target.files?.[0]);
            }}
            type="file"
            id="file"
            className="hidden"
          />
          <label
            className="flex gap-2 items-center cursor-pointer"
            htmlFor="file"
          >
            {watch("image").name}
            <BiEdit />
          </label>
          {errors.image && (
            <p className="mt-1 text-danger text-xs">
              {String(errors?.image?.message)}
            </p>
          )}
        </div>

        <Input
          {...register("code")}
          label="Kode Barang"
          labelPlacement="outside"
          placeholder=" "
          isRequired
          isInvalid={!!errors.code}
          errorMessage={errors.code?.message}
        />

        <Input
          {...register("name")}
          label="Nama"
          labelPlacement="outside"
          placeholder=" "
          isRequired
          isInvalid={!!errors.name}
          errorMessage={errors.name?.message}
        />

        <Select
          {...register("category")}
          items={categories}
          label="Kategori"
          labelPlacement="outside"
          placeholder=" "
          isRequired
          isInvalid={!!errors.category}
          errorMessage={errors.category?.message}
        >
          {(category) => (
            <SelectItem key={category.value}>{category.label}</SelectItem>
          )}
        </Select>

        <Input
          {...register("stock", { setValueAs: (value) => Number(value) })}
          label="Stok"
          labelPlacement="outside"
          placeholder=" "
          isRequired
          type="number"
          isInvalid={!!errors.stock}
          errorMessage={errors.stock?.message}
        />

        <Input
          {...register("price", { setValueAs: (value) => Number(value) })}
          label="Harga"
          labelPlacement="outside"
          placeholder=" "
          isRequired
          type="number"
          isInvalid={!!errors.price}
          errorMessage={errors.price?.message}
        />

        <Button color="primary" type="submit" className="mt-3">
          Edit
        </Button>
      </form>
    </div>
  );
}
